import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatToman } from "@/lib/format";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/orders/$id")({
  component: OrderDetail,
  head: () => ({ meta: [{ title: "Order — Archive Bukan" }, { name: "robots", content: "noindex" }] }),
});

function OrderDetail() {
  const { id } = Route.useParams();
  const { lang } = useI18n();
  const { data } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const { data: order } = await supabase.from("orders").select("*").eq("id", id).maybeSingle();
      const { data: items } = await supabase.from("order_items").select("*").eq("order_id", id);
      return { order, items: items ?? [] };
    },
  });

  if (!data?.order) return <div className="max-w-3xl mx-auto px-6 py-24">Loading…</div>;
  const { order, items } = data;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <p
        className="text-[10px] uppercase tracking-widest text-accent mb-2"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        Order {order.order_number}
      </p>
      <h1 className="text-4xl italic mb-8" style={{ fontFamily: "var(--font-display)" }}>
        Thank you.
      </h1>

      <div className="grid grid-cols-2 gap-6 mb-10 text-sm">
        <Row label="Status" value={order.status.toUpperCase()} mono />
        <Row label="Total" value={`${formatToman(order.total, lang)} T`} />
        <Row label="Ship to" value={`${order.full_name}, ${order.address}, ${order.city}`} />
        {order.tracking_code && <Row label="Tracking" value={order.tracking_code} mono />}
      </div>

      <ul className="divide-y divide-border border-y border-border">
        {items.map((i) => (
          <li key={i.id} className="flex gap-4 py-4 items-center">
            <div className="w-16 aspect-[4/5] bg-cream overflow-hidden shrink-0" style={{ backgroundColor: "var(--cream)" }}>
              {i.image_url && <img src={i.image_url} alt="" className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>
                {i.brand_name}
              </p>
              <p className="text-sm">{i.title}</p>
              <p className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>
                {i.product_code}
              </p>
            </div>
            <p className="text-sm">{formatToman(i.unit_price, lang)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>
        {label}
      </p>
      <p className="text-sm mt-1" style={mono ? { fontFamily: "var(--font-mono)" } : {}}>
        {value}
      </p>
    </div>
  );
}
