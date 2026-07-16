import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/session";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
  head: () => ({ meta: [{ title: "Admin — Archive Bukan" }, { name: "robots", content: "noindex" }] }),
});

function AdminLayout() {
  const { user, loading } = useSession();
  const [status, setStatus] = useState<"checking" | "ok" | "denied">("checking");
  const navigate = useNavigate();

  useEffect(() => {
    if (loading || !user) return;
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle()
      .then(({ data }) => setStatus(data ? "ok" : "denied"));
  }, [user, loading]);

  if (loading || status === "checking") {
    return <div className="max-w-7xl mx-auto px-6 py-24 text-sm text-muted-foreground">Checking access…</div>;
  }

  if (status === "denied") {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl italic mb-4" style={{ fontFamily: "var(--font-display)" }}>
          Restricted
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Your account isn't an admin. Ask an existing admin to grant you the role, or use the seed
          command below (via Cloud) to promote yourself.
        </p>
        <pre
          className="text-left text-xs bg-muted p-4 overflow-x-auto"
          style={{ fontFamily: "var(--font-mono)" }}
        >
{`INSERT INTO public.user_roles (user_id, role)
VALUES ('${user?.id}', 'admin');`}
        </pre>
        <button
          onClick={() => navigate({ to: "/" })}
          className="mt-6 inline-block border border-border px-6 py-3 text-xs uppercase tracking-widest hover:bg-muted"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Go home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12">
      <aside className="text-xs uppercase tracking-widest space-y-4" style={{ fontFamily: "var(--font-mono)" }}>
        <p className="text-accent mb-6">Admin</p>
        <Link to="/admin" className="block hover:text-accent" activeOptions={{ exact: true }} activeProps={{ className: "text-accent" }}>
          Dashboard
        </Link>
        <Link to="/admin/products" className="block hover:text-accent" activeProps={{ className: "text-accent" }}>
          Products
        </Link>
        <Link to="/admin/bales" className="block hover:text-accent" activeProps={{ className: "text-accent" }}>
          Bales
        </Link>
        <Link to="/admin/orders" className="block hover:text-accent" activeProps={{ className: "text-accent" }}>
          Orders
        </Link>
      </aside>
      <section>
        <Outlet />
      </section>
    </div>
  );
}
