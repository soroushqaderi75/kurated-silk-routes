import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatToman } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/products")({
  component: AdminProducts,
});

function AdminProducts() {
  const { data: products = [], refetch } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data } = await supabase
        .from("products")
        .select("id, product_code, title, selling_price, is_available, condition, shelf, box, brands(name)")
        .order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  async function toggleAvail(id: string, current: boolean) {
    const { error } = await supabase
      .from("products")
      .update({ is_available: !current, sold_at: current ? new Date().toISOString() : null })
      .eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Updated");
      refetch();
    }
  }

  async function del(id: string) {
    if (!confirm("Delete this product permanently?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Deleted");
      refetch();
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl italic" style={{ fontFamily: "var(--font-display)" }}>
          Products
        </h1>
        <Link
          to="/admin/products/new"
          className="bg-foreground text-background px-4 py-2 text-xs uppercase tracking-widest hover:bg-accent"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          + New product
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-y border-border">
          <thead>
            <tr className="text-xs uppercase tracking-widest text-muted-foreground text-left" style={{ fontFamily: "var(--font-mono)" }}>
              <th className="py-3">Code</th>
              <th>Brand</th>
              <th>Title</th>
              <th>Grade</th>
              <th>Location</th>
              <th>Price</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((p) => (
              <tr key={p.id}>
                <td className="py-3" style={{ fontFamily: "var(--font-mono)" }}>{p.product_code}</td>
                <td className="text-muted-foreground">{p.brands?.name ?? "—"}</td>
                <td>{p.title}</td>
                <td className="uppercase text-xs" style={{ fontFamily: "var(--font-mono)" }}>{p.condition}</td>
                <td className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>
                  {p.shelf ? `S${p.shelf}` : "—"} {p.box ? `B${p.box}` : ""}
                </td>
                <td>{formatToman(p.selling_price)} T</td>
                <td>
                  <button
                    onClick={() => toggleAvail(p.id, p.is_available)}
                    className={`text-[10px] uppercase tracking-widest px-2 py-1 border ${
                      p.is_available ? "border-accent text-accent" : "border-border text-muted-foreground"
                    }`}
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {p.is_available ? "Available" : "Sold"}
                  </button>
                </td>
                <td className="text-right space-x-3 whitespace-nowrap">
                  <Link
                    to="/admin/products/$id/edit"
                    params={{ id: p.id }}
                    className="text-xs uppercase tracking-widest hover:text-accent"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => del(p.id)}
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
