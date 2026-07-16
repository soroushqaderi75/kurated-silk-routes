import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard, type ProductCardData } from "@/components/product-card";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Archive Bukan — Curated Second-Hand Luxury Fashion in Iran" },
      {
        name: "description",
        content:
          "One-of-one authenticated pre-loved fashion from Ralph Lauren, Stone Island, Nike, Carhartt, Uniqlo and more. Graded in Bukan, shipped across Iran.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Home() {
  const { t } = useI18n();
  const { data: products = [] } = useQuery({
    queryKey: ["home-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(
          "id, product_code, title, size, hero_image, selling_price, condition, is_available, chest_cm, length_cm, sleeve_cm, brands(name, slug)",
        )
        .eq("is_available", true)
        .order("created_at", { ascending: false })
        .limit(8);
      if (error) throw error;
      return (data ?? []) as unknown as ProductCardData[];
    },
  });

  const brands = [
    "Stone Island",
    "Ralph Lauren",
    "Nike Archive",
    "Carhartt WIP",
    "Uniqlo U",
    "C.P. Company",
    "Barbour",
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden border-b border-border">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.03) 100%)",
          }}
        />
        <div className="relative z-10 text-center px-6 animate-fade-up max-w-4xl">
          <span
            className="text-[10px] uppercase tracking-[0.3em] mb-6 block text-accent"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {t("hero.eyebrow")}
          </span>
          <h1
            className="text-5xl md:text-7xl italic text-balance leading-[1.1]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("hero.title.a")} <br />
            <span
              className="not-italic font-normal text-3xl md:text-5xl tracking-tight opacity-80"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t("hero.title.b")}
            </span>
          </h1>
          <div className="mt-10 flex flex-col items-center gap-6">
            <p className="max-w-md text-muted-foreground text-sm leading-relaxed">{t("hero.body")}</p>
            <Link
              to="/shop"
              className="px-8 py-3 bg-foreground text-background text-xs uppercase tracking-widest hover:bg-accent transition-colors"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("hero.cta")}
            </Link>
          </div>
        </div>
      </section>

      {/* Brand strip */}
      <div className="border-b border-border overflow-hidden bg-foreground text-background py-4">
        <div
          className="flex justify-around items-center px-6 text-[10px] tracking-[0.2em] uppercase whitespace-nowrap opacity-80 gap-6"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {brands.map((b, i) => (
            <span key={b} className={i > 4 ? "hidden md:block" : ""}>
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Just landed */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl italic" style={{ fontFamily: "var(--font-display)" }}>
              {t("section.justLanded")}
            </h2>
            <p
              className="text-xs uppercase text-muted-foreground mt-2"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("section.justLanded.sub")}
            </p>
          </div>
          <Link
            to="/shop"
            className="text-xs underline underline-offset-4 decoration-accent/30 hover:decoration-accent"
          >
            {t("section.viewAll")}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((p, i) => (
            <ProductCard key={p.id} p={p} delay={i * 80} />
          ))}
        </div>
      </section>

      {/* Provenance */}
      <section className="bg-foreground text-background py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2
              className="text-4xl italic mb-8 leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("section.provenance")}
            </h2>
            <div className="space-y-10">
              {[1, 2, 3].map((n) => (
                <div key={n} className="flex gap-6">
                  <span
                    className="text-accent text-sm"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    0{n}.
                  </span>
                  <div>
                    <p className="text-sm uppercase tracking-widest mb-2">
                      {t(`prov.${n}.title` as any)}
                    </p>
                    <p className="text-sm text-background/60 leading-relaxed">
                      {t(`prov.${n}.body` as any)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-background/5 border border-background/10 grid place-items-center">
              <span
                className="text-[10px] uppercase tracking-[0.3em] text-background/40"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Bukan Studio
              </span>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-accent p-8 hidden md:block">
              <p
                className="text-2xl italic text-accent-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Bukan <br /> Certified
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
