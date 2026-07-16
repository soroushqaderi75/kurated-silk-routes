import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/brands")({
  component: Brands,
  head: () => ({
    meta: [
      { title: "Brands — Archive Bukan" },
      { name: "description", content: "Every brand curated by Archive Bukan, from Ralph Lauren to Stone Island." },
      { property: "og:url", content: "/brands" },
    ],
    links: [{ rel: "canonical", href: "/brands" }],
  }),
});

function Brands() {
  const { data: brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => (await supabase.from("brands").select("*").order("name")).data ?? [],
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <header className="mb-16">
        <p
          className="text-[10px] uppercase tracking-widest text-accent mb-3"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          The Roster
        </p>
        <h1 className="text-4xl md:text-5xl italic" style={{ fontFamily: "var(--font-display)" }}>
          Brands in the archive
        </h1>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
        {brands.map((b) => (
          <Link
            key={b.id}
            to="/brand/$slug"
            params={{ slug: b.slug }}
            className="group border-t border-border pt-6 hover:text-accent transition-colors"
          >
            <p
              className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {b.featured ? "Featured" : "House"}
            </p>
            <h2 className="text-xl italic" style={{ fontFamily: "var(--font-display)" }}>
              {b.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
