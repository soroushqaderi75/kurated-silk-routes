import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { formatToman } from "@/lib/format";
import { ConditionBadge } from "./condition-badge";

export interface ProductCardData {
  id: string;
  product_code: string;
  title: string;
  size: string | null;
  hero_image: string | null;
  selling_price: number;
  condition: "cream" | "grade_a" | "grade_b";
  is_available: boolean;
  chest_cm?: number | null;
  length_cm?: number | null;
  sleeve_cm?: number | null;
  brands?: { name: string; slug: string } | null;
}

export function ProductCard({ p, delay = 0 }: { p: ProductCardData; delay?: number }) {
  const { t, lang } = useI18n();
  return (
    <Link
      to="/product/$code"
      params={{ code: p.product_code }}
      className="group block animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className="relative aspect-[4/5] bg-cream mb-4 overflow-hidden border border-border"
        style={{ backgroundColor: "var(--cream)" }}
      >
        {p.hero_image ? (
          <img
            src={p.hero_image}
            alt={p.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full grid place-items-center">
            <span
              className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {p.brands?.name ?? "Archive"}
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 flex gap-2">
          <span
            className="bg-background/90 backdrop-blur px-2 py-1 text-[9px] font-mono border border-border"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {t("product.oneOfOne")}
          </span>
          <ConditionBadge grade={p.condition} />
        </div>
        {!p.is_available && (
          <div className="absolute inset-0 bg-background/70 grid place-items-center">
            <span
              className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 border border-foreground"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("product.unavailable")}
            </span>
          </div>
        )}
        {(p.chest_cm || p.length_cm) && (
          <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-6 text-center">
            <p
              className="text-[10px] font-mono mb-2 uppercase tracking-widest text-accent"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("product.measurements")}
            </p>
            <p className="text-xs leading-relaxed">
              {p.chest_cm && <>Chest: {p.chest_cm}cm<br /></>}
              {p.length_cm && <>Length: {p.length_cm}cm<br /></>}
              {p.sleeve_cm && <>Sleeve: {p.sleeve_cm}cm</>}
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-between items-start gap-3">
        <div className="min-w-0">
          <p
            className="text-[10px] uppercase tracking-wider text-muted-foreground"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {p.brands?.name ?? "—"}
          </p>
          <h3 className="text-sm font-medium mt-1 truncate">{p.title}</h3>
          {p.size && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {t("product.size")}: {p.size}
            </p>
          )}
        </div>
        <div className="text-right rtl:text-left shrink-0">
          <p className="text-sm font-medium">{formatToman(p.selling_price, lang)}</p>
          <p
            className="text-[9px] uppercase tracking-tighter text-muted-foreground"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {t("toman")}
          </p>
        </div>
      </div>
    </Link>
  );
}
