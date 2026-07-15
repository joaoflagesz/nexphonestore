import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth-store";
import { AuthShell, Field } from "./login";

export const Route = createFileRoute("/esqueci-senha")({
  component: ForgotPage,
  head: () => ({
    meta: [{ title: "Esqueci minha senha — NexPhoneStore" }],
  }),
});

function ForgotPage() {
  const { resetPasswordForEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [msg, setMsg] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await resetPasswordForEmail(email.trim().toLowerCase());
      setStatus("sent");
    } catch (err: any) {
      setMsg(err.message);
      setStatus("error");
    }
  };

  return (
    <AuthShell title="Recuperar senha" subtitle="Enviaremos um link para redefinir sua senha.">
      {status === "sent" ? (
        <div className="rounded-2xl border border-border bg-[color:var(--surface)] p-6 text-[14px] text-foreground">
          <p>Se este e-mail estiver cadastrado, você receberá um link em instantes.</p>
          <Link to="/login" className="mt-4 inline-block text-[13px] underline underline-offset-2">Voltar para o login</Link>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <Field label="E-mail cadastrado">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
          </Field>
          {msg && <p className="text-[13px] text-red-500">{msg}</p>}
          <button
            disabled={status === "loading"}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-[14px] font-medium text-background disabled:opacity-60"
          >
            {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Enviar link <ArrowRight className="h-4 w-4" /></>}
          </button>
          <div className="pt-2 text-center text-[12px] text-muted-foreground">
            <Link to="/login" className="text-foreground underline underline-offset-2">Voltar</Link>
          </div>
        </form>
      )}
    </AuthShell>
  );
}
