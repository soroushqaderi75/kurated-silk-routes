import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { formatToman } from "@/lib/format";
import { ConditionBadge } from "@/components/condition-badge";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$code")({
  component: ProductDetail,
  loader: async ({ params }) => {
    const { data } = await supabase
      .from("products")
      .select("product_code, title, brands(name)")
      .eq("product_code", params.code)
      .maybeSingle();
    if (!data) throw notFound();
    return { code: data.product_code, title: data.title, brand: data.brands?.name ?? "" };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Item not found" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.brand ? loaderData.brand + " · " : ""}${loaderData.title} — Archive Bukan`;
    return {
      meta: [
        { title },
        { name: "description", content: `${loaderData.title} — one-of-one from Archive Bukan.` },
        { property: "og:title", content: title },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/product/${loaderData.code}` },
      ],
      links: [{ rel: "canonical", href: `/product/${loaderData.code}` }],
    };
  },
});

function ProductDetail() {
  const { code } = Route.useParams();
  const { t, lang } = useI18n();
  const cart = useCart();

  const { data: product } = useQuery({
    queryKey: ["product", code],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(
          "*, brands(name, slug), categories(name, slug, gender), product_images(image_url, sort_order)",
        )
        .eq("product_code", code)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  if (!product) return <div className="max-w-7xl mx-auto px-6 py-24">Loading…</div>;

  const images = [
    product.hero_image,
    ...(product.product_images ?? []).sort((a: any, b: any) => a.sort_order - b.sort_order).map((i: any) => i.image_url),
  ].filter(Boolean) as string[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    sku: product.product_code,
    brand: product.brands?.name,
    offers: {
      "@type": "Offer",
      priceCurrency: "IRR",
      price: product.selling_price,
      availability: product.is_available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  const handleAdd = () => {
    cart.add({
      product_id: product.id,
      product_code: product.product_code,
      title: product.title,
      brand_name: product.brands?.name ?? null,
      image_url: product.hero_image,
      unit_price: product.selling_price,
    });
    toast.success("Added to bag");
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-4">
          {images.length > 0 ? (
            images.map((src, i) => (
              <div
                key={i}
                className="aspect-[4/5] bg-cream overflow-hidden border border-border"
                style={{ backgroundColor: "var(--cream)" }}
              >
                <img src={src} alt={product.title} className="w-full h-full object-cover" />
              </div>
            ))
          ) : (
            <div
              className="aspect-[4/5] bg-cream grid place-items-center border border-border"
              style={{ backgroundColor: "var(--cream)" }}
            >
              <span
                className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {product.brands?.name}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-8 lg:sticky lg:top-32 lg:self-start">
          <div className="flex items-center gap-3">
            <span
              className="text-[10px] font-mono uppercase tracking-widest text-accent"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("product.oneOfOne")}
            </span>
            <ConditionBadge grade={product.condition} />
          </div>

          {product.brands && (
            <Link
              to="/brand/$slug"
              params={{ slug: product.brands.slug }}
              className="text-xs uppercase tracking-widest text-muted-foreground hover:text-accent"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {product.brands.name}
            </Link>
          )}

          <h1 className="text-3xl md:text-4xl italic" style={{ fontFamily: "var(--font-display)" }}>
            {product.title}
          </h1>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-medium">{formatToman(product.selling_price, lang)}</span>
            <span
              className="text-xs uppercase text-muted-foreground"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("toman")}
            </span>
          </div>

          {product.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
          )}

          <dl className="grid grid-cols-2 gap-y-3 text-sm border-t border-border pt-6">
            <Detail label={t("product.code")} value={product.product_code} mono />
            <Detail label={t("product.size")} value={product.size} />
            <Detail label={t("product.color")} value={product.color} />
            <Detail label={t("product.material")} value={product.material} />
            <Detail label={t("product.season")} value={product.season} />
            <Detail label={t("product.origin")} value={product.country_of_origin} />
          </dl>

          {(product.chest_cm || product.length_cm || product.sleeve_cm || product.waist_cm) && (
            <div className="border-t border-border pt-6">
              <p
                className="text-[10px] uppercase tracking-widest text-accent mb-3"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t("product.measurements")}
              </p>
              <dl className="grid grid-cols-2 gap-y-2 text-sm">
                {product.chest_cm && <Detail label="Chest" value={`${product.chest_cm} cm`} />}
                {product.length_cm && <Detail label="Length" value={`${product.length_cm} cm`} />}
                {product.sleeve_cm && <Detail label="Sleeve" value={`${product.sleeve_cm} cm`} />}
                {product.waist_cm && <Detail label="Waist" value={`${product.waist_cm} cm`} />}
              </dl>
            </div>
          )}

          <button
            onClick={handleAdd}
            disabled={!product.is_available}
            className="w-full bg-foreground text-background px-8 py-4 text-xs uppercase tracking-widest hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {product.is_available ? t("product.addToCart") : t("product.unavailable")}
          </button>
        </div>
      </div>
    </>
  );
}

function Detail({ label, value, mono }: { label: string; value?: string | null; mono?: boolean }) {
  if (!value) return null;
  return (
    <>
      <dt
        className="text-xs uppercase tracking-widest text-muted-foreground"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </dt>
      <dd className={mono ? "text-sm" : "text-sm"} style={mono ? { fontFamily: "var(--font-mono)" } : {}}>
        {value}
      </dd>
    </>
  );
}
