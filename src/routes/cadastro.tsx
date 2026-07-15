import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-store";
import { AuthShell, Field } from "./login";
import { maskCPF, maskPhone, isValidCPF } from "@/lib/cpf";

export const Route = createFileRoute("/cadastro")({
  component: SignupPage,
  head: () => ({
    meta: [
      { title: "Criar conta — NexPhoneStore" },
      { name: "description", content: "Crie sua conta na NexPhoneStore para comprar mais rápido." },
    ],
  }),
});

function SignupPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    full_name: "",
    cpf: "",
    phone: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (form.full_name.trim().length < 3) return setError("Informe seu nome completo.");
    if (!isValidCPF(form.cpf)) return setError("CPF inválido.");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError("E-mail inválido.");
    if (form.password.length < 6) return setError("A senha deve ter no mínimo 6 caracteres.");
    if (form.password !== form.confirm) return setError("As senhas não coincidem.");
    setLoading(true);
    try {
      await signUp({
        full_name: form.full_name.trim(),
        cpf: form.cpf,
        phone: form.phone,
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });
      navigate({ to: "/conta" });
    } catch (err: any) {
      const msg = err?.message ?? "";
      if (msg.includes("duplicate") || msg.toLowerCase().includes("cpf"))
        setError("CPF já cadastrado.");
      else setError(msg || "Falha ao criar conta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Criar conta" subtitle="Cadastro rápido para comprar em segundos.">
      <form onSubmit={submit} className="space-y-4">
        <Field label="Nome completo">
          <input value={form.full_name} onChange={(e) => update("full_name", e.target.value)} className="input" />
        </Field>
        <Field label="CPF">
          <input value={form.cpf} onChange={(e) => update("cpf", maskCPF(e.target.value))} placeholder="000.000.000-00" className="input" inputMode="numeric" />
        </Field>
        <Field label="Telefone">
          <input value={form.phone} onChange={(e) => update("phone", maskPhone(e.target.value))} placeholder="(31) 99999-9999" className="input" inputMode="numeric" />
        </Field>
        <Field label="E-mail">
          <input value={form.email} onChange={(e) => update("email", e.target.value)} type="email" placeholder="voce@email.com" className="input" />
        </Field>
        <Field label="Senha">
          <input value={form.password} onChange={(e) => update("password", e.target.value)} type="password" placeholder="Mínimo 6 caracteres" className="input" />
        </Field>
        <Field label="Confirmar senha">
          <input value={form.confirm} onChange={(e) => update("confirm", e.target.value)} type="password" className="input" />
        </Field>
        {error && <p className="text-[13px] text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-[14px] font-medium text-background disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Criar conta <ArrowRight className="h-4 w-4" /></>}
        </button>
        <div className="pt-2 text-center text-[12px] text-muted-foreground">
          Já tem conta?{" "}
          <Link to="/login" className="text-foreground underline underline-offset-2">Entrar</Link>
        </div>
      </form>
    </AuthShell>
  );
}
