import { ProductForm } from "@/components/admin/product-form";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/products/$id/edit")({
  component: EditProduct,
});

function EditProduct() {
  const { id } = Route.useParams();
  const { data } = useQuery({
    queryKey: ["admin-prod", id],
    queryFn: async () => (await supabase.from("products").select("*").eq("id", id).maybeSingle()).data,
  });
  if (!data) return <p className="text-sm text-muted-foreground">Loading…</p>;
  return (
    <div>
      <h1 className="text-3xl italic mb-8" style={{ fontFamily: "var(--font-display)" }}>
        Edit {data.product_code}
      </h1>
      <ProductForm initial={data} />
    </div>
  );
}
