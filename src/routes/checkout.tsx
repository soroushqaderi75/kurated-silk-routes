import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";
import { useSession } from "@/lib/session";
import { formatToman } from "@/lib/format";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
  head: () => ({ meta: [{ title: "Checkout — Archive Bukan" }, { name: "robots", content: "noindex" }] }),
});

const schema = z.object({
  full_name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(6).max(20),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  address: z.string().trim().min(6).max(300),
  city: z.string().trim().min(2).max(80),
  postal_code: z.string().trim().max(20).optional().or(z.literal("")),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
});

function Checkout() {
  const cart = useCart();
  const { t, lang } = useI18n();
  const { user } = useSession();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: user?.email ?? "",
    address: "",
    city: "",
    postal_code: "",
    notes: "",
  });

  const shipping = cart.items.length > 0 ? 150000 : 0;
  const total = cart.subtotal + shipping;

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center">
        <p className="text-muted-foreground mb-6">Sign in to place your order.</p>
        <Link
          to="/auth"
          className="inline-block bg-foreground text-background px-6 py-3 text-xs uppercase tracking-widest hover:bg-accent"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Sign in
        </Link>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center">
        <p className="text-muted-foreground mb-6">{t("cart.empty")}</p>
        <Link
          to="/shop"
          className="inline-block bg-foreground text-background px-6 py-3 text-xs uppercase tracking-widest hover:bg-accent"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {t("cart.continueShopping")}
        </Link>
      </div>
    );
  }

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setBusy(true);
    try {
      const { data: order, error } = await supabase
        .from("orders")
        .insert({
          user_id: user!.id,
          status: "pending",
          full_name: parsed.data.full_name,
          phone: parsed.data.phone,
          email: parsed.data.email || null,
          address: parsed.data.address,
          city: parsed.data.city,
          postal_code: parsed.data.postal_code || null,
          notes: parsed.data.notes || null,
          subtotal: cart.subtotal,
          shipping,
          total,
        })
        .select()
        .single();
      if (error || !order) throw error ?? new Error("Order failed");

      const items = cart.items.map((i) => ({
        order_id: order.id,
        product_id: i.product_id,
        product_code: i.product_code,
        title: i.title,
        brand_name: i.brand_name,
        image_url: i.image_url,
        unit_price: i.unit_price,
        quantity: 1,
      }));
      const { error: iErr } = await supabase.from("order_items").insert(items);
      if (iErr) throw iErr;

      cart.clear();
      toast.success("Order placed");
      navigate({ to: "/orders/$id", params: { id: order.id } });
    } catch (err: any) {
      toast.error(err?.message ?? "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl italic mb-12" style={{ fontFamily: "var(--font-display)" }}>
        {t("checkout.title")}
      </h1>
      <form onSubmit={placeOrder} className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
        <div className="space-y-8">
          <fieldset className="space-y-4">
            <legend
              className="text-[10px] uppercase tracking-widest text-accent mb-3"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("checkout.contact")}
            </legend>
            <Field label="Full name" value={form.full_name} onChange={(v) => setForm({ ...form, full_name: v })} required />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
              <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend
              className="text-[10px] uppercase tracking-widest text-accent mb-3"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("checkout.shipping")}
            </legend>
            <Field label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} required />
            <div className="grid grid-cols-2 gap-4">
              <Field label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} required />
              <Field
                label="Postal code"
                value={form.postal_code}
                onChange={(v) => setForm({ ...form, postal_code: v })}
              />
            </div>
            <Field
              label="Order notes"
              value={form.notes}
              onChange={(v) => setForm({ ...form, notes: v })}
            />
          </fieldset>

          <div
            className="border border-dashed border-border p-4 text-xs text-muted-foreground uppercase tracking-widest"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Payment placeholder — cash on delivery or bank transfer will be confirmed by our team.
          </div>
        </div>

        <aside className="border border-border p-6 h-fit space-y-4 text-sm lg:sticky lg:top-32">
          <p
            className="text-[10px] uppercase tracking-widest text-muted-foreground"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {cart.items.length} item(s)
          </p>
          <ul className="divide-y divide-border border-y border-border">
            {cart.items.map((i) => (
              <li key={i.product_id} className="py-3 flex justify-between text-xs gap-3">
                <span className="truncate">{i.title}</span>
                <span className="shrink-0">{formatToman(i.unit_price, lang)}</span>
              </li>
            ))}
          </ul>
          <div className="pt-2 flex justify-between text-sm">
            <span>{t("cart.subtotal")}</span>
            <span>{formatToman(cart.subtotal, lang)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>{t("cart.shipping")}</span>
            <span>{formatToman(shipping, lang)}</span>
          </div>
          <div className="flex justify-between font-medium border-t border-border pt-4">
            <span>{t("cart.total")}</span>
            <span>
              {formatToman(total, lang)} {t("toman.short")}
            </span>
          </div>
          <button
            type="submit"
            disabled={busy}
            className="w-full bg-foreground text-background px-6 py-3 text-xs uppercase tracking-widest hover:bg-accent disabled:opacity-50"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {busy ? "Placing…" : t("checkout.placeOrder")}
          </button>
        </aside>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span
        className="text-[10px] uppercase tracking-widest text-muted-foreground"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label} {required && <span className="text-accent">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full bg-transparent border-b border-border py-2 text-sm outline-none focus:border-accent"
      />
    </label>
  );
}
