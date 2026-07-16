export function formatToman(amount: number, lang: "en" | "fa" = "en"): string {
  const locale = lang === "fa" ? "fa-IR" : "en-US";
  return new Intl.NumberFormat(locale).format(Math.max(0, Math.round(amount)));
}
