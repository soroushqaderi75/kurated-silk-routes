import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/session";
import { toast } from "sonner";
import { formatToman } from "@/lib/format";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/account")({
  component: Account,
  head: () => ({ meta: [{ title: "Account — Archive Bukan" }, { name: "robots", content: "noindex" }] }),
});

function Account() {
  const { user } = useSession();
  const { lang } = useI18n();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    address: "",
    city: "",
    postal_code: "",
  });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("full_name, phone, address, city, postal_code")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data)
          setProfile({
            full_name: data.full_name ?? "",
            phone: data.phone ?? "",
            address: data.address ?? "",
            city: data.city ?? "",
            postal_code: data.postal_code ?? "",
          });
      });
  }, [user]);

  const { data: orders = [] } = useQuery({
    queryKey: ["my-orders", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("orders")
        .select("id, order_number, status, total, created_at")
        .order("created_at", { ascending: false })
        .limit(20);
      return data ?? [];
    },
  });

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    const { error } = await supabase.from("profiles").upsert({ id: user.id, ...profile });
    setBusy(false);
    if (error) toast.error(error.message);
    else toast.success("Profile saved");
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16">
      <section>
        <h1 className="text-4xl italic mb-8" style={{ fontFamily: "var(--font-display)" }}>
          Account
        </h1>
        <p className="text-sm text-muted-foreground mb-6">{user?.email}</p>
        <form onSubmit={save} className="space-y-4">
          <F label="Full name" value={profile.full_name} onChange={(v) => setProfile({ ...profile, full_name: v })} />
          <F label="Phone" value={profile.phone} onChange={(v) => setProfile({ ...profile, phone: v })} />
          <F label="Address" value={profile.address} onChange={(v) => setProfile({ ...profile, address: v })} />
          <div className="grid grid-cols-2 gap-4">
            <F label="City" value={profile.city} onChange={(v) => setProfile({ ...profile, city: v })} />
            <F label="Postal code" value={profile.postal_code} onChange={(v) => setProfile({ ...profile, postal_code: v })} />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={busy}
              className="bg-foreground text-background px-6 py-3 text-xs uppercase tracking-widest hover:bg-accent disabled:opacity-50"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Save
            </button>
            <button
              type="button"
              onClick={signOut}
              className="border border-border px-6 py-3 text-xs uppercase tracking-widest hover:bg-muted"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Sign out
            </button>
          </div>
        </form>
      </section>

      <section>
        <h2 className="text-2xl italic mb-6" style={{ fontFamily: "var(--font-display)" }}>
          Recent orders
        </h2>
        {orders.length === 0 ? (
          <p className="text-sm text-muted-foreground">No orders yet.</p>
        ) : (
          <ul className="divide-y divide-border border-y border-border">
            {orders.map((o) => (
              <li key={o.id}>
                <Link
                  to="/orders/$id"
                  params={{ id: o.id }}
                  className="flex justify-between items-center py-4 hover:text-accent"
                >
                  <div>
                    <p className="text-sm font-medium" style={{ fontFamily: "var(--font-mono)" }}>
                      {o.order_number}
                    </p>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
                      {o.status}
                    </p>
                  </div>
                  <p className="text-sm">{formatToman(o.total, lang)} T</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function F({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-border py-2 text-sm outline-none focus:border-accent"
      />
    </label>
  );
}
