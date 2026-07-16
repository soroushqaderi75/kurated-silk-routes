import { createFileRoute, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard, type ProductCardData } from "@/components/product-card";

export const Route = createFileRoute("/category/$slug")({
  component: CategoryPage,
  loader: async ({ params }) => {
    const { data } = await supabase
      .from("categories")
      .select("id, name, gender")
      .eq("slug", params.slug)
      .maybeSingle();
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} — Archive Bukan` : "Category not found" },
      { name: "description", content: `Pre-loved ${loaderData?.name ?? ""} from Archive Bukan.` },
    ],
  }),
});

function CategoryPage() {
  const cat = Route.useLoaderData();
  const { data: products = [] } = useQuery({
    queryKey: ["cat-products", cat.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("products")
        .select(
          "id, product_code, title, size, hero_image, selling_price, condition, is_available, chest_cm, length_cm, sleeve_cm, brands(name, slug)",
        )
        .eq("category_id", cat.id)
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
          {cat.gender}
        </p>
        <h1 className="text-4xl md:text-5xl italic" style={{ fontFamily: "var(--font-display)" }}>
          {cat.name}
        </h1>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {products.map((p, i) => (
          <ProductCard key={p.id} p={p} delay={i * 50} />
        ))}
      </div>
    </div>
  );
}
