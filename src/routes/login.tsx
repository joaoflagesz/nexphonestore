import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Apple, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-store";
import { maskCPF, isValidCPF } from "@/lib/cpf";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Entrar — NexPhoneStore" },
      { name: "description", content: "Acesse sua conta NexPhoneStore com seu CPF." },
    ],
  }),
});

function LoginPage() {
  const { user, signInWithCpf } = useAuth();
  const navigate = useNavigate();
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate({ to: "/conta" });
  }, [user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!isValidCPF(cpf)) return setError("Informe um CPF válido.");
    if (password.length < 6) return setError("Senha deve ter no mínimo 6 caracteres.");
    setLoading(true);
    try {
      await signInWithCpf(cpf, password);
      navigate({ to: "/conta" });
    } catch (err: any) {
      setError(err.message ?? "Falha ao entrar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Entrar" subtitle="Acesse sua conta com CPF e senha.">
      <form onSubmit={submit} className="space-y-4">
        <Field label="CPF">
          <input
            value={cpf}
            onChange={(e) => setCpf(maskCPF(e.target.value))}
            placeholder="000.000.000-00"
            inputMode="numeric"
            autoComplete="username"
            className="input"
          />
        </Field>
        <Field label="Senha">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            className="input"
          />
        </Field>
        {error && <p className="text-[13px] text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-[14px] font-medium text-background disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Entrar <ArrowRight className="h-4 w-4" /></>}
        </button>
        <Link to="/cadastro" className="block h-12 w-full">
          <button type="button" className="h-12 w-full rounded-full border border-border text-[14px] font-medium text-foreground hover:bg-foreground/5">
            Criar Conta
          </button>
        </Link>
        <div className="flex items-center justify-center pt-2">
          <Link to="/esqueci-senha" className="text-[12px] text-muted-foreground hover:text-foreground">
            Esqueci minha senha
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}

export function AuthShell({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-16">
        <Link to="/" className="mb-10 flex items-center gap-2 text-foreground">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-foreground text-background">
            <Apple className="h-4 w-4" />
          </span>
          <span className="text-[16px] font-semibold tracking-tight">
            NexPhone<span className="text-muted-foreground">Store</span>
          </span>
        </Link>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground">{title}</h1>
        {subtitle && <p className="mt-2 text-[14px] text-muted-foreground">{subtitle}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}
