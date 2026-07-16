import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { useSession, useIsAdmin } from "@/lib/session";

export function SiteHeader() {
  const { t, lang, setLang } = useI18n();
  const { count } = useCart();
  const { user } = useSession();
  const isAdmin = useIsAdmin();

  return (
    <nav className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
      <div
        className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between text-[11px] tracking-widest uppercase"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setLang("en")}
            className={`hover:text-accent transition-colors ${lang === "en" ? "font-medium" : "opacity-60"}`}
          >
            English
          </button>
          <span className="text-border">/</span>
          <button
            onClick={() => setLang("fa")}
            className={`hover:text-accent transition-colors ${lang === "fa" ? "font-medium" : "opacity-60"}`}
          >
            فارسی
          </button>
        </div>
        <Link
          to="/"
          className="text-xl lowercase tracking-tighter normal-case hidden md:block"
          style={{ fontFamily: "var(--font-display)" }}
        >
          archive bukan
        </Link>
        <div className="flex gap-4 md:gap-6 items-center">
          <span className="hidden md:inline opacity-70">Toman (تومان)</span>
          {user ? (
            <Link to="/account" className="hover:text-accent">
              {t("nav.account")}
            </Link>
          ) : (
            <Link to="/auth" className="hover:text-accent">
              {t("nav.signin")}
            </Link>
          )}
          {isAdmin && (
            <Link to="/admin" className="text-accent hover:opacity-80">
              {t("nav.admin")}
            </Link>
          )}
          <Link to="/cart" className="hover:text-accent">
            {t("nav.cart")} ({count})
          </Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-center gap-6 md:gap-8 text-[12px] font-medium tracking-tight border-t border-border">
        <Link to="/shop" search={{ gender: "men" }} className="hover:text-accent">
          {t("nav.men")}
        </Link>
        <Link to="/shop" search={{ gender: "women" }} className="hover:text-accent">
          {t("nav.women")}
        </Link>
        <Link to="/shop" search={{ gender: "accessories" }} className="hover:text-accent">
          {t("nav.accessories")}
        </Link>
        <Link to="/brands" className="hover:text-accent">
          {t("nav.brands")}
        </Link>
        <Link to="/about" className="hover:text-accent">
          {t("nav.provenance")}
        </Link>
      </div>
    </nav>
  );
}
