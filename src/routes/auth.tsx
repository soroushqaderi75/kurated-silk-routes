import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { toast } from "sonner";

const searchSchema = z.object({ mode: z.enum(["signin", "signup"]).optional() });

export const Route = createFileRoute("/auth")({
  component: Auth,
  validateSearch: searchSchema,
  head: () => ({
    meta: [{ title: "Sign in — Archive Bukan" }, { name: "robots", content: "noindex" }],
  }),
});

function Auth() {
  const { mode = "signin" } = useSearch({ from: "/auth" });
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: name },
          },
        });
        if (error) throw error;
        toast.success("Account created. You're signed in.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back.");
      }
      navigate({ to: "/account" });
    } catch (err: any) {
      toast.error(err?.message ?? "Auth failed");
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    setBusy(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) throw result.error;
      if (result.redirected) return;
      navigate({ to: "/account" });
    } catch (err: any) {
      toast.error(err?.message ?? "Google sign-in failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-24">
      <p
        className="text-[10px] uppercase tracking-widest text-accent mb-3"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {mode === "signup" ? "Create account" : "Sign in"}
      </p>
      <h1 className="text-4xl italic mb-8" style={{ fontFamily: "var(--font-display)" }}>
        {mode === "signup" ? "Join the archive" : "Return to the archive"}
      </h1>

      <button
        onClick={google}
        disabled={busy}
        className="w-full border border-border py-3 text-xs uppercase tracking-widest hover:bg-muted disabled:opacity-50 mb-6"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        Continue with Google
      </button>

      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-border" />
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>
          or
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <form onSubmit={submit} className="space-y-4">
        {mode === "signup" && (
          <Field label="Full name" value={name} onChange={setName} required />
        )}
        <Field label="Email" type="email" value={email} onChange={setEmail} required />
        <Field label="Password" type="password" value={password} onChange={setPassword} required />
        <button
          type="submit"
          disabled={busy}
          className="w-full bg-foreground text-background py-3 text-xs uppercase tracking-widest hover:bg-accent disabled:opacity-50"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {busy ? "…" : mode === "signup" ? "Create account" : "Sign in"}
        </button>
      </form>

      <p className="text-xs text-muted-foreground mt-6 text-center">
        {mode === "signup" ? "Already have an account? " : "New to Archive Bukan? "}
        <button
          onClick={() => navigate({ to: "/auth", search: { mode: mode === "signup" ? "signin" : "signup" } })}
          className="underline underline-offset-4 hover:text-accent"
        >
          {mode === "signup" ? "Sign in" : "Create one"}
        </button>
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span
        className="text-[10px] uppercase tracking-widest text-muted-foreground"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full bg-transparent border-b border-border py-2 text-sm outline-none focus:border-accent"
      />
    </label>
  );
}
