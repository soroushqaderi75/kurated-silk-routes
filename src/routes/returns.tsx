import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/returns")({
  component: Returns,
  head: () => ({
    meta: [
      { title: "Returns & Grading — Archive Bukan" },
      { name: "description", content: "How returns work at Archive Bukan and what our condition grades mean." },
      { property: "og:url", content: "/returns" },
    ],
    links: [{ rel: "canonical", href: "/returns" }],
  }),
});

function Returns() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-24 space-y-8">
      <h1 className="text-5xl italic" style={{ fontFamily: "var(--font-display)" }}>
        Returns & grading
      </h1>
      <section>
        <h2 className="text-xl mb-4">Condition grades</h2>
        <ul className="space-y-3 text-sm text-foreground/80">
          <li><strong>Cream</strong> — like new, no signs of wear.</li>
          <li><strong>Grade A</strong> — pre-loved, minimal signs of handling.</li>
          <li><strong>Grade B</strong> — carries character with light visible wear.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl mb-4">Return policy</h2>
        <p className="text-sm text-foreground/80 leading-relaxed">
          Because every item is one-of-one, we accept returns only if the garment differs materially
          from the listing description, images, or measurements. Contact us within 48 hours of
          delivery to arrange a return. Return shipping to Bukan is arranged by our team when the
          issue is on our side.
        </p>
      </section>
    </article>
  );
}
