import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
  head: () => ({
    meta: [
      { title: "Privacy Policy — Archive Bukan" },
      { name: "description", content: "How Archive Bukan handles your data." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
});

function Privacy() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-24 space-y-6">
      <h1 className="text-5xl italic" style={{ fontFamily: "var(--font-display)" }}>
        Privacy
      </h1>
      <p className="text-sm text-foreground/80 leading-relaxed">
        This page is maintained by Archive Bukan to describe how we handle customer information
        collected through this website. We store account details, shipping address, and order history
        to process and deliver your orders. We do not sell personal data to third parties.
      </p>
      <p className="text-sm text-foreground/80 leading-relaxed">
        Contact hello@archivebukan.ir to review or delete your data.
      </p>
    </article>
  );
}
