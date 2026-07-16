import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/bales")({
  component: AdminBales,
});

function AdminBales() {
  const { data: bales = [], refetch } = useQuery({
    queryKey: ["admin-bales"],
    queryFn: async () => (await supabase.from("bales").select("*").order("arrival_date", { ascending: false })).data ?? [],
  });
  const [showForm, setShowForm] = useState(false);
  const [f, setF] = useState({
    bale_code: "",
    supplier: "",
    country: "",
    arrival_date: "",
    weight_kg: "",
    purchase_cost_usd: "",
    products_extracted: "0",
    products_remaining: "0",
    notes: "",
  });

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      bale_code: f.bale_code,
      supplier: f.supplier || null,
      country: f.country || null,
      arrival_date: f.arrival_date || null,
      weight_kg: f.weight_kg ? Number(f.weight_kg) : null,
      purchase_cost_usd: f.purchase_cost_usd ? Number(f.purchase_cost_usd) : null,
      products_extracted: Number(f.products_extracted) || 0,
      products_remaining: Number(f.products_remaining) || 0,
      notes: f.notes || null,
    };
    const { error } = await supabase.from("bales").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Bale added");
    setShowForm(false);
    setF({ bale_code: "", supplier: "", country: "", arrival_date: "", weight_kg: "", purchase_cost_usd: "", products_extracted: "0", products_remaining: "0", notes: "" });
    refetch();
  }

  async function del(id: string) {
    if (!confirm("Delete this bale?")) return;
    const { error } = await supabase.from("bales").delete().eq("id", id);
    if (error) return toast.error(error.message);
    refetch();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl italic" style={{ fontFamily: "var(--font-display)" }}>
          Bales
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-foreground text-background px-4 py-2 text-xs uppercase tracking-widest hover:bg-accent"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {showForm ? "Cancel" : "+ New bale"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={save} className="border border-border p-6 mb-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <BF label="Bale code" v={f.bale_code} on={(v) => setF({ ...f, bale_code: v })} required />
            <BF label="Supplier" v={f.supplier} on={(v) => setF({ ...f, supplier: v })} />
            <BF label="Country" v={f.country} on={(v) => setF({ ...f, country: v })} />
            <BF label="Arrival date" v={f.arrival_date} on={(v) => setF({ ...f, arrival_date: v })} type="date" />
            <BF label="Weight (kg)" v={f.weight_kg} on={(v) => setF({ ...f, weight_kg: v })} type="number" />
            <BF label="Purchase cost (USD)" v={f.purchase_cost_usd} on={(v) => setF({ ...f, purchase_cost_usd: v })} type="number" />
            <BF label="Products extracted" v={f.products_extracted} on={(v) => setF({ ...f, products_extracted: v })} type="number" />
            <BF label="Products remaining" v={f.products_remaining} on={(v) => setF({ ...f, products_remaining: v })} type="number" />
          </div>
          <label className="block">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>
              Notes
            </span>
            <textarea
              value={f.notes}
              onChange={(e) => setF({ ...f, notes: e.target.value })}
              rows={2}
              className="w-full bg-transparent border border-border p-2 text-sm outline-none focus:border-accent"
            />
          </label>
          <button
            type="submit"
            className="bg-foreground text-background px-6 py-3 text-xs uppercase tracking-widest hover:bg-accent"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Save bale
          </button>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-y border-border">
          <thead>
            <tr className="text-xs uppercase tracking-widest text-muted-foreground text-left" style={{ fontFamily: "var(--font-mono)" }}>
              <th className="py-3">Code</th>
              <th>Supplier</th>
              <th>Country</th>
              <th>Arrival</th>
              <th>Weight</th>
              <th>Cost USD</th>
              <th>Extracted / Remaining</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {bales.map((b) => (
              <tr key={b.id}>
                <td className="py-3" style={{ fontFamily: "var(--font-mono)" }}>{b.bale_code}</td>
                <td>{b.supplier ?? "—"}</td>
                <td>{b.country ?? "—"}</td>
                <td className="text-xs text-muted-foreground">{b.arrival_date ?? "—"}</td>
                <td>{b.weight_kg ? `${b.weight_kg} kg` : "—"}</td>
                <td>{b.purchase_cost_usd ? `$${b.purchase_cost_usd}` : "—"}</td>
                <td className="text-xs" style={{ fontFamily: "var(--font-mono)" }}>{b.products_extracted} / {b.products_remaining}</td>
                <td className="text-right">
                  <button
                    onClick={() => del(b.id)}
                    className="text-xs uppercase tracking-widest text-destructive hover:opacity-70"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BF({ label, v, on, type = "text", required }: { label: string; v: string; on: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>
        {label}
      </span>
      <input
        type={type}
        value={v}
        onChange={(e) => on(e.target.value)}
        required={required}
        className="w-full bg-transparent border-b border-border py-2 text-sm outline-none focus:border-accent"
      />
    </label>
  );
}
