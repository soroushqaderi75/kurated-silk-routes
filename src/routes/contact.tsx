import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — Archive Bukan" },
      { name: "description", content: "Reach the Archive Bukan curators in Bukan, Iran." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24">
      <p
        className="text-[10px] uppercase tracking-widest text-accent mb-6"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        Contact
      </p>
      <h1 className="text-5xl italic mb-12" style={{ fontFamily: "var(--font-display)" }}>
        Speak with the archive
      </h1>
      <dl className="space-y-6 text-sm">
        <Row label="Warehouse" value="Archive Bukan · Bukan · West Azerbaijan · Iran" />
        <Row label="Telegram" value="@archivebukan" />
        <Row label="Instagram" value="@archive.bukan" />
        <Row label="Email" value="hello@archivebukan.ir" />
        <Row label="Support hours" value="Sat–Thu · 10:00–19:00 IRST" />
      </dl>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-4 border-b border-border pb-4">
      <dt className="text-xs uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>
        {label}
      </dt>
      <dd>{value}</dd>
    </div>
  );
}
