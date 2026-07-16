import { createFileRoute, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard, type ProductCardData } from "@/components/product-card";

export const Route = createFileRoute("/brand/$slug")({
  component: BrandPage,
  loader: async ({ params }) => {
    const { data } = await supabase
      .from("brands")
      .select("id, name, description")
      .eq("slug", params.slug)
      .maybeSingle();
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} — Archive Bukan` : "Brand not found" },
      {
        name: "description",
        content: loaderData?.description ?? `Shop pre-loved ${loaderData?.name ?? ""} at Archive Bukan.`,
      },
    ],
  }),
});

function BrandPage() {
  const { slug } = Route.useParams();
  const brand = Route.useLoaderData();

  const { data: products = [] } = useQuery({
    queryKey: ["brand-products", slug],
    queryFn: async () => {
      const { data } = await supabase
        .from("products")
        .select(
          "id, product_code, title, size, hero_image, selling_price, condition, is_available, chest_cm, length_cm, sleeve_cm, brands(name, slug)",
        )
        .eq("brand_id", brand.id)
        .order("created_at", { ascending: false });
      return (data ?? []) as unknown as ProductCardData[];
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <header className="mb-12">
        <p
          className="text-[10px] uppercase tracking-widest text-accent mb-3"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Brand
        </p>
        <h1 className="text-4xl md:text-5xl italic" style={{ fontFamily: "var(--font-display)" }}>
          {brand.name}
        </h1>
        {brand.description && (
          <p className="text-muted-foreground mt-4 max-w-2xl">{brand.description}</p>
        )}
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {products.map((p, i) => (
          <ProductCard key={p.id} p={p} delay={i * 50} />
        ))}
      </div>
    </div>
  );
}
