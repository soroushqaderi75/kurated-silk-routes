import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatToman } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const { data } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [prod, sold, orders, brands] = await Promise.all([
        supabase.from("products").select("id, selling_price, purchase_price, is_available, sold_at, brand_id"),
        supabase.from("orders").select("id, total, status"),
        supabase.from("orders").select("id, order_number, total, status, created_at").order("created_at", { ascending: false }).limit(5),
        supabase.from("brands").select("id, name"),
      ]);
      const products = prod.data ?? [];
      const brandMap = new Map((brands.data ?? []).map((b) => [b.id, b.name]));
      const revenue = (orders.data ?? []).filter((o) => o.status !== "cancelled").reduce((s, o) => s + Number(o.total), 0);
      const profit = products
        .filter((p) => !p.is_available)
        .reduce((s, p) => s + (Number(p.selling_price) - Number(p.purchase_price ?? 0)), 0);
      const bestBrands = new Map<string, number>();
      products.filter((p) => !p.is_available && p.brand_id).forEach((p) => {
        const name = brandMap.get(p.brand_id!) ?? "—";
        bestBrands.set(name, (bestBrands.get(name) ?? 0) + 1);
      });
      const bestBrandList = [...bestBrands.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
      return {
        total: products.length,
        available: products.filter((p) => p.is_available).length,
        sold: products.filter((p) => !p.is_available).length,
        revenue,
        profit,
        recentOrders: orders.data ?? [],
        bestBrandList,
      };
    },
  });

  if (!data) return <p className="text-sm text-muted-foreground">Loading…</p>;

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl italic mb-8" style={{ fontFamily: "var(--font-display)" }}>
          Overview
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat label="Total products" value={String(data.total)} />
          <Stat label="Available" value={String(data.available)} />
          <Stat label="Sold" value={String(data.sold)} />
          <Stat label="Revenue" value={`${formatToman(data.revenue)} T`} />
          <Stat label="Est. profit" value={`${formatToman(data.profit)} T`} />
        </div>
      </div>

      <div>
        <h2 className="text-2xl italic mb-4" style={{ fontFamily: "var(--font-display)" }}>
          Best-selling brands
        </h2>
        {data.bestBrandList.length === 0 ? (
          <p className="text-sm text-muted-foreground">No sales yet.</p>
        ) : (
          <ul className="divide-y divide-border border-y border-border">
            {data.bestBrandList.map(([name, count]) => (
              <li key={name} className="py-3 flex justify-between text-sm">
                <span>{name}</span>
                <span style={{ fontFamily: "var(--font-mono)" }}>{count} sold</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border p-4">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>
        {label}
      </p>
      <p className="text-2xl mt-2" style={{ fontFamily: "var(--font-display)" }}>
        {value}
      </p>
    </div>
  );
}
