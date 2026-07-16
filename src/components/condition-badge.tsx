import { useI18n } from "@/lib/i18n";

export function ConditionBadge({ grade }: { grade: "cream" | "grade_a" | "grade_b" }) {
  const { t } = useI18n();
  const styles: Record<string, string> = {
    cream: "bg-accent text-accent-foreground",
    grade_a: "bg-foreground text-background",
    grade_b: "bg-muted-foreground text-background",
  };
  const label = grade === "cream" ? t("grade.cream") : grade === "grade_a" ? t("grade.grade_a") : t("grade.grade_b");
  return (
    <span
      className={`px-2 py-1 text-[9px] font-mono uppercase tracking-wider ${styles[grade]}`}
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {label}
    </span>
  );
}
