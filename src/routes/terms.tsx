import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  component: Terms,
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Archive Bukan" },
      { name: "description", content: "Terms and conditions for shopping at Archive Bukan." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
});

function Terms() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-24 space-y-6">
      <h1 className="text-5xl italic" style={{ fontFamily: "var(--font-display)" }}>
        Terms & conditions
      </h1>
      <p className="text-sm text-foreground/80 leading-relaxed">
        By placing an order with Archive Bukan you confirm that the item description, images,
        measurements, and condition grade shown on the listing at the time of purchase are the
        agreed condition. Every item is one-of-one; a placed order reserves the single unit until
        payment is confirmed.
      </p>
      <p className="text-sm text-foreground/80 leading-relaxed">
        Prices are shown in Toman. Shipping is calculated at checkout. Delivery times across Iran are
        typically 2–5 business days from Bukan.
      </p>
    </article>
  );
}
