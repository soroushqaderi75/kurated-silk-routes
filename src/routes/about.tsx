import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — Archive Bukan" },
      {
        name: "description",
        content:
          "Archive Bukan curates authenticated pre-loved and outlet fashion from a warehouse in Bukan, Iran.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

function About() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-24">
      <p
        className="text-[10px] uppercase tracking-widest text-accent mb-6"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        Provenance
      </p>
      <h1 className="text-5xl italic mb-8" style={{ fontFamily: "var(--font-display)" }}>
        A curator's house, not a thrift shop.
      </h1>
      <div className="space-y-6 text-base leading-relaxed text-foreground/80">
        <p>
          Archive Bukan is a specialised marketplace for authenticated second-hand and outlet fashion,
          operated from a warehouse in Bukan, Iran. Every garment is examined, graded, photographed
          and given a unique product code before it enters the archive.
        </p>
        <p>
          We source globally — from European stockists, Japanese vintage vendors, Korean sorters — and
          hold only pieces that meet an editorial standard. If a jacket, denim, or knit doesn't earn
          its place in the room, it does not enter the room.
        </p>
        <p>
          Every listing on this site is one-of-one. There is a single physical unit at the warehouse
          with the code printed on the tag.
        </p>
      </div>
    </article>
  );
}
