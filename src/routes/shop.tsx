import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard, type ProductCardData } from "@/components/product-card";
import { z } from "zod";

const searchSchema = z.object({
  gender: z.enum(["men", "women", "accessories", "unisex"]).optional(),
  brand: z.string().optional(),
  condition: z.enum(["cream", "grade_a", "grade_b"]).optional(),
  category: z.string().optional(),
  available: z.enum(["all", "yes"]).optional(),
});

export const Route = createFileRoute("/shop")({
  component: Shop,
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Shop the Archive — Archive Bukan" },
      {
        name: "description",
        content:
          "Browse one-of-one pre-loved garments filtered by brand, category, size, and condition. Shipped from Bukan across Iran.",
      },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
});

function Shop() {
  const search = Route.useSearch();
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const { data: brands = [] } = useQuery({
    queryKey: ["brands-list"],
    queryFn: async () => (await supabase.from("brands").select("id, name, slug").order("name")).data ?? [],
  });
  const { data: categories = [] } = useQuery({
    queryKey: ["cat-list", search.gender],
    queryFn: async () => {
      let q = supabase.from("categories").select("id, name, slug, gender").order("sort_order");
      if (search.gender) q = q.eq("gender", search.gender);
      return (await q).data ?? [];
    },
  });

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["shop-products", search, minPrice, maxPrice],
    queryFn: async () => {
      let q = supabase
        .from("products")
        .select(
          "id, product_code, title, size, hero_image, selling_price, condition, is_available, chest_cm, length_cm, sleeve_cm, brand_id, category_id, gender, brands(name, slug), categories(slug)",
        )
        .order("created_at", { ascending: false })
        .limit(60);
      if (search.gender) q = q.eq("gender", search.gender);
      if (search.brand) {
        const b = brands.find((x) => x.slug === search.brand);
        if (b) q = q.eq("brand_id", b.id);
      }
      if (search.category) {
        const c = categories.find((x) => x.slug === search.category);
        if (c) q = q.eq("category_id", c.id);
      }
      if (search.condition) q = q.eq("condition", search.condition);
      if (search.available !== "all") q = q.eq("is_available", true);
      if (minPrice) q = q.gte("selling_price", Number(minPrice));
      if (maxPrice) q = q.lte("selling_price", Number(maxPrice));
      const { data, error } = await q;
      if (error) throw error;
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
          The Archive
        </p>
        <h1 className="text-4xl md:text-5xl italic" style={{ fontFamily: "var(--font-display)" }}>
          {search.gender ? search.gender : "All arrivals"}
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12">
        {/* Filters */}
        <aside
          className="space-y-8 text-xs uppercase tracking-widest"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <FilterGroup title="Gender">
            <FilterLink to="/shop" search={{}} active={!search.gender}>
              All
            </FilterLink>
            {["men", "women", "accessories"].map((g) => (
              <FilterLink
                key={g}
                to="/shop"
                search={{ gender: g as any }}
                active={search.gender === g}
              >
                {g}
              </FilterLink>
            ))}
          </FilterGroup>

          <FilterGroup title="Brand">
            <FilterLink to="/shop" search={{ ...search, brand: undefined }} active={!search.brand}>
              All
            </FilterLink>
            {brands.map((b) => (
              <FilterLink
                key={b.id}
                to="/shop"
                search={{ ...search, brand: b.slug }}
                active={search.brand === b.slug}
              >
                {b.name}
              </FilterLink>
            ))}
          </FilterGroup>

          {categories.length > 0 && (
            <FilterGroup title="Category">
              <FilterLink
                to="/shop"
                search={{ ...search, category: undefined }}
                active={!search.category}
              >
                All
              </FilterLink>
              {categories.map((c) => (
                <FilterLink
                  key={c.id}
                  to="/shop"
                  search={{ ...search, category: c.slug }}
                  active={search.category === c.slug}
                >
                  {c.name}
                </FilterLink>
              ))}
            </FilterGroup>
          )}

          <FilterGroup title="Condition">
            <FilterLink
              to="/shop"
              search={{ ...search, condition: undefined }}
              active={!search.condition}
            >
              All
            </FilterLink>
            {[
              { v: "cream", l: "Cream" },
              { v: "grade_a", l: "Grade A" },
              { v: "grade_b", l: "Grade B" },
            ].map((c) => (
              <FilterLink
                key={c.v}
                to="/shop"
                search={{ ...search, condition: c.v as any }}
                active={search.condition === c.v}
              >
                {c.l}
              </FilterLink>
            ))}
          </FilterGroup>

          <FilterGroup title="Price (T)">
            <div className="flex gap-2">
              <input
                inputMode="numeric"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full bg-transparent border-b border-border py-1 text-xs outline-none focus:border-accent"
              />
              <input
                inputMode="numeric"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full bg-transparent border-b border-border py-1 text-xs outline-none focus:border-accent"
              />
            </div>
          </FilterGroup>

          <FilterGroup title="Availability">
            <FilterLink to="/shop" search={{ ...search, available: undefined }} active={search.available !== "all"}>
              Available only
            </FilterLink>
            <FilterLink to="/shop" search={{ ...search, available: "all" }} active={search.available === "all"}>
              Include sold
            </FilterLink>
          </FilterGroup>
        </aside>

        {/* Products */}
        <div>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : products.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nothing matches those filters.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {products.map((p, i) => (
                <ProductCard key={p.id} p={p} delay={i * 50} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] text-muted-foreground mb-3">{title}</p>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function FilterLink({
  active,
  children,
  to,
  search,
}: {
  active?: boolean;
  children: React.ReactNode;
  to: string;
  search: Record<string, unknown>;
}) {
  const L = Link as unknown as React.ComponentType<any>;
  return (
    <L
      to={to}
      search={search}
      className={`text-left hover:text-accent transition-colors ${active ? "text-accent" : "text-foreground/70"}`}
    >
      {children}
    </L>
  );
}
