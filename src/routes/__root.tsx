import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { I18nProvider } from "@/lib/i18n";
import { CartProvider } from "@/lib/cart";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { supabase } from "@/integrations/supabase/client";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-medium text-foreground" style={{ fontFamily: "var(--font-display)" }}>
          404
        </h1>
        <h2 className="mt-4 text-xl font-medium text-foreground">This page has been sold.</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for isn't in the archive.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-foreground text-background px-6 py-3 text-xs uppercase tracking-widest hover:bg-accent transition-colors"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-medium tracking-tight text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. You can try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center bg-foreground text-background px-5 py-2 text-xs uppercase tracking-widest hover:bg-accent transition-colors"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center border border-border px-5 py-2 text-xs uppercase tracking-widest hover:bg-muted"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Archive Bukan — Curated Second-Hand Luxury Fashion in Iran" },
      {
        name: "description",
        content:
          "One-of-one authenticated pre-loved and outlet clothing from Ralph Lauren, Stone Island, Nike, Carhartt and more. Graded and shipped from Bukan, Iran.",
      },
      { property: "og:title", content: "Archive Bukan — Curated Second-Hand Luxury" },
      {
        property: "og:description",
        content:
          "One-of-one authenticated pre-loved fashion, graded in our Bukan studio and shipped across Iran.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Archive Bukan" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,500;0,700;1,500;1,700&family=JetBrains+Mono:wght@400;500&family=Vazirmatn:wght@300;400;500;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => sub.subscription.unsubscribe();
  }, [router, queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <SiteHeader />
            <main className="flex-1">
              <Outlet />
            </main>
            <SiteFooter />
          </div>
          <Toaster position="top-center" richColors />
        </CartProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}
