import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Lang = "en" | "fa";

const DICT = {
  en: {
    "nav.men": "Men",
    "nav.women": "Women",
    "nav.accessories": "Accessories",
    "nav.brands": "Brands",
    "nav.provenance": "Provenance",
    "nav.shop": "Shop All",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.cart": "Cart",
    "nav.account": "Account",
    "nav.signin": "Sign in",
    "nav.signout": "Sign out",
    "nav.admin": "Admin",
    "hero.eyebrow": "One-of-One Curations",
    "hero.title.a": "The luxury of the second",
    "hero.title.b": "encounter.",
    "hero.body": "Each piece is hand-selected, graded in our Bukan studio, and preserved for its next chapter.",
    "hero.cta": "Shop the archive",
    "section.justLanded": "Just Landed",
    "section.justLanded.sub": "Newly processed / Bukan Warehouse",
    "section.viewAll": "View all arrivals",
    "section.provenance": "The journey from bale to Bukan warehouse",
    "prov.1.title": "Source selection",
    "prov.1.body": "We procure curated bales from premium stockists worldwide, focusing on archival quality and timeless silhouettes.",
    "prov.2.title": "Grading & restoration",
    "prov.2.body": "Every item is inspected in our Bukan studio, graded (Cream, A, or B), and expertly cleaned or repaired if needed.",
    "prov.3.title": "Direct to you",
    "prov.3.body": "Stored in climate-controlled units, your piece is dispatched within 24 hours of selection, direct from Bukan.",
    "grade.cream": "Cream",
    "grade.grade_a": "Grade A",
    "grade.grade_b": "Grade B",
    "product.size": "Size",
    "product.oneOfOne": "1 / 1",
    "product.addToCart": "Add to cart",
    "product.measurements": "Measurements",
    "product.material": "Material",
    "product.origin": "Country of origin",
    "product.season": "Season",
    "product.color": "Color",
    "product.code": "Code",
    "product.unavailable": "Sold",
    "cart.empty": "Your bag is empty.",
    "cart.subtotal": "Subtotal",
    "cart.shipping": "Shipping",
    "cart.total": "Total",
    "cart.checkout": "Proceed to checkout",
    "cart.continueShopping": "Continue shopping",
    "checkout.title": "Checkout",
    "checkout.contact": "Contact",
    "checkout.shipping": "Shipping address",
    "checkout.placeOrder": "Place order",
    "toman": "Toman",
    "toman.short": "T",
  },
  fa: {
    "nav.men": "مردانه",
    "nav.women": "زنانه",
    "nav.accessories": "اکسسوری",
    "nav.brands": "برندها",
    "nav.provenance": "درباره ما",
    "nav.shop": "همه محصولات",
    "nav.about": "درباره",
    "nav.contact": "تماس",
    "nav.cart": "سبد",
    "nav.account": "حساب",
    "nav.signin": "ورود",
    "nav.signout": "خروج",
    "nav.admin": "مدیریت",
    "hero.eyebrow": "قطعات تک و منحصر به فرد",
    "hero.title.a": "شکوهِ ",
    "hero.title.b": "دیدارِ دوباره.",
    "hero.body": "هر قطعه با دقت انتخاب، در استودیوی بوکان درجه‌بندی و برای فصل تازه‌اش آماده می‌شود.",
    "hero.cta": "ورود به آرشیو",
    "section.justLanded": "تازه‌رسیده‌ها",
    "section.justLanded.sub": "پردازش‌شده در انبار بوکان",
    "section.viewAll": "مشاهده همه",
    "section.provenance": "از عدل تا انبار بوکان",
    "prov.1.title": "انتخاب منبع",
    "prov.1.body": "ما عدل‌های منتخب را از تأمین‌کنندگان معتبر جهانی تهیه می‌کنیم؛ با تمرکز بر کیفیت آرشیوی و طراحی ماندگار.",
    "prov.2.title": "درجه‌بندی و بازسازی",
    "prov.2.body": "هر قطعه در استودیوی بوکان بررسی، درجه‌بندی (کرم، A یا B) و در صورت نیاز شسته یا ترمیم می‌شود.",
    "prov.3.title": "ارسال مستقیم",
    "prov.3.body": "کالای شما در کمتر از ۲۴ ساعت پس از سفارش، مستقیماً از بوکان ارسال می‌شود.",
    "grade.cream": "کرم",
    "grade.grade_a": "درجه A",
    "grade.grade_b": "درجه B",
    "product.size": "سایز",
    "product.oneOfOne": "۱ / ۱",
    "product.addToCart": "افزودن به سبد",
    "product.measurements": "اندازه‌ها",
    "product.material": "جنس",
    "product.origin": "کشور سازنده",
    "product.season": "فصل",
    "product.color": "رنگ",
    "product.code": "کد",
    "product.unavailable": "فروخته شد",
    "cart.empty": "سبد شما خالی است.",
    "cart.subtotal": "جمع",
    "cart.shipping": "هزینه ارسال",
    "cart.total": "مبلغ نهایی",
    "cart.checkout": "ادامه خرید",
    "cart.continueShopping": "بازگشت به فروشگاه",
    "checkout.title": "تسویه حساب",
    "checkout.contact": "اطلاعات تماس",
    "checkout.shipping": "نشانی ارسال",
    "checkout.placeOrder": "ثبت سفارش",
    "toman": "تومان",
    "toman.short": "ت",
  },
} as const;

type Key = keyof (typeof DICT)["en"];

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: Key) => string;
  dir: "ltr" | "rtl";
}

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (saved === "en" || saved === "fa") setLangState(saved);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const t = (k: Key) => DICT[lang][k] ?? DICT.en[k] ?? k;

  return (
    <Ctx.Provider value={{ lang, setLang, t, dir: lang === "fa" ? "rtl" : "ltr" }}>{children}</Ctx.Provider>
  );
}

export function useI18n() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useI18n must be inside I18nProvider");
  return c;
}
