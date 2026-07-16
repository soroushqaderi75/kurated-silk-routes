import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";
import { formatToman } from "@/lib/format";

export const Route = createFileRoute("/cart")({
  component: Cart,
  head: () => ({
    meta: [{ title: "Bag — Archive Bukan" }, { name: "robots", content: "noindex" }],
  }),
});

function Cart() {
  const cart = useCart();
  const { t, lang } = useI18n();
  const shipping = cart.items.length > 0 ? 150000 : 0;
  const total = cart.subtotal + shipping;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl md:text-5xl italic mb-12" style={{ fontFamily: "var(--font-display)" }}>
        Your bag
      </h1>

      {cart.items.length === 0 ? (
        <div className="border border-border p-16 text-center">
          <p className="text-muted-foreground mb-6">{t("cart.empty")}</p>
          <Link
            to="/shop"
            className="inline-block bg-foreground text-background px-6 py-3 text-xs uppercase tracking-widest hover:bg-accent"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {t("cart.continueShopping")}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          <ul className="divide-y divide-border border-y border-border">
            {cart.items.map((i) => (
              <li key={i.product_id} className="flex gap-6 py-6">
                <div
                  className="w-24 aspect-[4/5] bg-cream shrink-0 overflow-hidden"
                  style={{ backgroundColor: "var(--cream)" }}
                >
                  {i.image_url && <img src={i.image_url} alt="" className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 flex flex-col">
                  <p
                    className="text-[10px] uppercase tracking-widest text-muted-foreground"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {i.brand_name}
                  </p>
                  <Link
                    to="/product/$code"
                    params={{ code: i.product_code }}
                    className="text-sm mt-1 hover:text-accent"
                  >
                    {i.title}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-1" style={{ fontFamily: "var(--font-mono)" }}>
                    {i.product_code}
                  </p>
                  <button
                    onClick={() => cart.remove(i.product_id)}
                    className="text-xs text-muted-foreground hover:text-destructive mt-auto self-start uppercase tracking-widest"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Remove
                  </button>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{formatToman(i.unit_price, lang)}</p>
                  <p
                    className="text-[10px] uppercase text-muted-foreground"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {t("toman")}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <aside className="border border-border p-6 h-fit space-y-4 text-sm">
            <Row label={t("cart.subtotal")} value={`${formatToman(cart.subtotal, lang)} ${t("toman.short")}`} />
            <Row label={t("cart.shipping")} value={`${formatToman(shipping, lang)} ${t("toman.short")}`} />
            <div className="border-t border-border pt-4">
              <Row label={t("cart.total")} value={`${formatToman(total, lang)} ${t("toman.short")}`} bold />
            </div>
            <Link
              to="/checkout"
              className="block text-center bg-foreground text-background px-6 py-3 text-xs uppercase tracking-widest hover:bg-accent mt-4"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("cart.checkout")}
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "font-medium" : ""}`}>
      <span className="uppercase tracking-widest text-xs" style={{ fontFamily: "var(--font-mono)" }}>
        {label}
      </span>
      <span>{value}</span>
    </div>
  );
}
