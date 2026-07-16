import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  product_code: z.string().trim().min(3).max(50),
  title: z.string().trim().min(2).max(200),
  brand_id: z.string().uuid().nullable().optional(),
  category_id: z.string().uuid().nullable().optional(),
  bale_id: z.string().uuid().nullable().optional(),
  gender: z.string().nullable().optional(),
  size: z.string().max(20).nullable().optional(),
  color: z.string().max(50).nullable().optional(),
  material: z.string().max(100).nullable().optional(),
  season: z.string().max(50).nullable().optional(),
  country_of_origin: z.string().max(80).nullable().optional(),
  condition: z.enum(["cream", "grade_a", "grade_b"]),
  chest_cm: z.number().nullable().optional(),
  length_cm: z.number().nullable().optional(),
  sleeve_cm: z.number().nullable().optional(),
  waist_cm: z.number().nullable().optional(),
  warehouse: z.string().max(50).nullable().optional(),
  shelf: z.string().max(20).nullable().optional(),
  box: z.string().max(20).nullable().optional(),
  purchase_price: z.number().nullable().optional(),
  selling_price: z.number(),
  description: z.string().max(2000).nullable().optional(),
  hero_image: z.string().max(500).nullable().optional(),
  video_url: z.string().max(500).nullable().optional(),
  is_available: z.boolean(),
  is_featured: z.boolean(),
});

export function ProductForm({ initial }: { initial?: any }) {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [f, setF] = useState<any>({
    product_code: "",
    title: "",
    brand_id: null,
    category_id: null,
    bale_id: null,
    gender: "men",
    size: "",
    color: "",
    material: "",
    season: "",
    country_of_origin: "",
    condition: "grade_a",
    chest_cm: null,
    length_cm: null,
    sleeve_cm: null,
    waist_cm: null,
    warehouse: "Warehouse A",
    shelf: "",
    box: "",
    purchase_price: null,
    selling_price: 0,
    description: "",
    hero_image: "",
    video_url: "",
    is_available: true,
    is_featured: false,
    ...(initial ?? {}),
  });

  const { data: brands = [] } = useQuery({
    queryKey: ["brands-all"],
    queryFn: async () => (await supabase.from("brands").select("id, name").order("name")).data ?? [],
  });
  const { data: categories = [] } = useQuery({
    queryKey: ["cats-all"],
    queryFn: async () => (await supabase.from("categories").select("id, name, gender").order("sort_order")).data ?? [],
  });
  const { data: bales = [] } = useQuery({
    queryKey: ["bales-all"],
    queryFn: async () => (await supabase.from("bales").select("id, bale_code").order("created_at", { ascending: false })).data ?? [],
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      ...f,
      chest_cm: f.chest_cm ? Number(f.chest_cm) : null,
      length_cm: f.length_cm ? Number(f.length_cm) : null,
      sleeve_cm: f.sleeve_cm ? Number(f.sleeve_cm) : null,
      waist_cm: f.waist_cm ? Number(f.waist_cm) : null,
      purchase_price: f.purchase_price ? Number(f.purchase_price) : null,
      selling_price: Number(f.selling_price),
    };
    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid form");
      return;
    }
    setBusy(true);
    const { error } = initial
      ? await supabase.from("products").update(parsed.data as any).eq("id", initial.id)
      : await supabase.from("products").insert(parsed.data as any);
    setBusy(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Saved");
      navigate({ to: "/admin/products" });
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6 max-w-3xl">
      <Row>
        <F label="Product code" v={f.product_code} on={(v) => setF({ ...f, product_code: v })} required />
        <F label="Title" v={f.title} on={(v) => setF({ ...f, title: v })} required />
      </Row>
      <Row>
        <Sel label="Brand" v={f.brand_id ?? ""} on={(v) => setF({ ...f, brand_id: v || null })} opts={brands.map((b) => ({ v: b.id, l: b.name }))} />
        <Sel label="Category" v={f.category_id ?? ""} on={(v) => setF({ ...f, category_id: v || null })} opts={categories.map((c) => ({ v: c.id, l: `${c.name} (${c.gender})` }))} />
      </Row>
      <Row>
        <Sel label="Bale" v={f.bale_id ?? ""} on={(v) => setF({ ...f, bale_id: v || null })} opts={bales.map((b) => ({ v: b.id, l: b.bale_code }))} />
        <Sel
          label="Gender"
          v={f.gender ?? ""}
          on={(v) => setF({ ...f, gender: v })}
          opts={[{ v: "men", l: "Men" }, { v: "women", l: "Women" }, { v: "accessories", l: "Accessories" }, { v: "unisex", l: "Unisex" }]}
        />
      </Row>
      <Row>
        <F label="Size" v={f.size ?? ""} on={(v) => setF({ ...f, size: v })} />
        <F label="Color" v={f.color ?? ""} on={(v) => setF({ ...f, color: v })} />
        <F label="Material" v={f.material ?? ""} on={(v) => setF({ ...f, material: v })} />
      </Row>
      <Row>
        <F label="Season" v={f.season ?? ""} on={(v) => setF({ ...f, season: v })} />
        <F label="Country of origin" v={f.country_of_origin ?? ""} on={(v) => setF({ ...f, country_of_origin: v })} />
        <Sel
          label="Condition"
          v={f.condition}
          on={(v) => setF({ ...f, condition: v })}
          opts={[{ v: "cream", l: "Cream" }, { v: "grade_a", l: "Grade A" }, { v: "grade_b", l: "Grade B" }]}
        />
      </Row>
      <p className="text-[10px] uppercase tracking-widest text-accent" style={{ fontFamily: "var(--font-mono)" }}>
        Measurements (cm)
      </p>
      <Row>
        <F label="Chest" v={f.chest_cm ?? ""} on={(v) => setF({ ...f, chest_cm: v })} type="number" />
        <F label="Length" v={f.length_cm ?? ""} on={(v) => setF({ ...f, length_cm: v })} type="number" />
        <F label="Sleeve" v={f.sleeve_cm ?? ""} on={(v) => setF({ ...f, sleeve_cm: v })} type="number" />
        <F label="Waist" v={f.waist_cm ?? ""} on={(v) => setF({ ...f, waist_cm: v })} type="number" />
      </Row>
      <p className="text-[10px] uppercase tracking-widest text-accent" style={{ fontFamily: "var(--font-mono)" }}>
        Warehouse
      </p>
      <Row>
        <F label="Warehouse" v={f.warehouse ?? ""} on={(v) => setF({ ...f, warehouse: v })} />
        <F label="Shelf" v={f.shelf ?? ""} on={(v) => setF({ ...f, shelf: v })} />
        <F label="Box" v={f.box ?? ""} on={(v) => setF({ ...f, box: v })} />
      </Row>
      <p className="text-[10px] uppercase tracking-widest text-accent" style={{ fontFamily: "var(--font-mono)" }}>
        Pricing (Toman)
      </p>
      <Row>
        <F label="Purchase price" v={f.purchase_price ?? ""} on={(v) => setF({ ...f, purchase_price: v })} type="number" />
        <F label="Selling price" v={f.selling_price ?? 0} on={(v) => setF({ ...f, selling_price: v })} type="number" required />
      </Row>
      <F label="Hero image URL" v={f.hero_image ?? ""} on={(v) => setF({ ...f, hero_image: v })} />
      <F label="Video URL" v={f.video_url ?? ""} on={(v) => setF({ ...f, video_url: v })} />
      <label className="block">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>
          Description
        </span>
        <textarea
          value={f.description ?? ""}
          onChange={(e) => setF({ ...f, description: e.target.value })}
          rows={4}
          className="w-full bg-transparent border border-border p-2 text-sm outline-none focus:border-accent"
        />
      </label>
      <div className="flex gap-6 text-sm">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={f.is_available}
            onChange={(e) => setF({ ...f, is_available: e.target.checked })}
          />
          Available
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={f.is_featured}
            onChange={(e) => setF({ ...f, is_featured: e.target.checked })}
          />
          Featured
        </label>
      </div>
      <button
        type="submit"
        disabled={busy}
        className="bg-foreground text-background px-6 py-3 text-xs uppercase tracking-widest hover:bg-accent disabled:opacity-50"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {busy ? "Saving…" : "Save product"}
      </button>
    </form>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{children}</div>;
}

function F({
  label,
  v,
  on,
  type = "text",
  required,
}: {
  label: string;
  v: any;
  on: (v: any) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>
        {label}
      </span>
      <input
        type={type}
        value={v ?? ""}
        onChange={(e) => on(e.target.value)}
        required={required}
        className="w-full bg-transparent border-b border-border py-2 text-sm outline-none focus:border-accent"
      />
    </label>
  );
}

function Sel({
  label,
  v,
  on,
  opts,
}: {
  label: string;
  v: string;
  on: (v: string) => void;
  opts: { v: string; l: string }[];
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>
        {label}
      </span>
      <select
        value={v}
        onChange={(e) => on(e.target.value)}
        className="w-full bg-transparent border-b border-border py-2 text-sm outline-none focus:border-accent"
      >
        <option value="">—</option>
        {opts.map((o) => (
          <option key={o.v} value={o.v}>
            {o.l}
          </option>
        ))}
      </select>
    </label>
  );
}
