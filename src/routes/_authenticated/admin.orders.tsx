import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatToman } from "@/lib/format";
import { toast } from "sonner";
import { useState } from "react";

const STATUSES = ["pending", "paid", "processing", "shipped", "delivered", "cancelled"] as const;

export const Route = createFileRoute("/_authenticated/admin/orders")({
  component: AdminOrders,
});

function AdminOrders() {
  const { data: orders = [], refetch } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () =>
      (await supabase
        .from("orders")
        .select("id, order_number, status, full_name, city, total, tracking_code, created_at")
        .order("created_at", { ascending: false })).data ?? [],
  });

  async function update(id: string, patch: Record<string, unknown>) {
    const { error } = await supabase.from("orders").update(patch).eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Updated");
      refetch();
    }
  }

  return (
    <div>
      <h1 className="text-4xl italic mb-8" style={{ fontFamily: "var(--font-display)" }}>
        Orders
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-y border-border">
          <thead>
            <tr className="text-xs uppercase tracking-widest text-muted-foreground text-left" style={{ fontFamily: "var(--font-mono)" }}>
              <th className="py-3">Order</th>
              <th>Customer</th>
              <th>City</th>
              <th>Total</th>
              <th>Status</th>
              <th>Tracking</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((o) => (
              <OrderRow key={o.id} o={o} update={update} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OrderRow({ o, update }: { o: any; update: (id: string, patch: Record<string, unknown>) => void }) {
  const [tracking, setTracking] = useState(o.tracking_code ?? "");
  return (
    <tr>
      <td className="py-3" style={{ fontFamily: "var(--font-mono)" }}>{o.order_number}</td>
      <td>{o.full_name}</td>
      <td>{o.city}</td>
      <td>{formatToman(o.total)} T</td>
      <td>
        <select
          value={o.status}
          onChange={(e) => update(o.id, { status: e.target.value })}
          className="bg-transparent border border-border py-1 px-2 text-xs uppercase"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </td>
      <td>
        <div className="flex gap-2">
          <input
            value={tracking}
            onChange={(e) => setTracking(e.target.value)}
            className="bg-transparent border-b border-border py-1 text-xs w-32 outline-none focus:border-accent"
            placeholder="Add code"
          />
          <button
            onClick={() => update(o.id, { tracking_code: tracking })}
            className="text-xs uppercase tracking-widest hover:text-accent"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Save
          </button>
        </div>
      </td>
    </tr>
  );
}
