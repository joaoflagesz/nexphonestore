import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-store";
import { AuthShell, Field } from "./login";

export const Route = createFileRoute("/reset-password")({
  component: ResetPasswordPage,
  head: () => ({ meta: [{ title: "Nova senha — NexPhoneStore" }] }),
});

function ResetPasswordPage() {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    if (password.length < 6) return setMsg("Mínimo 6 caracteres.");
    if (password !== confirm) return setMsg("As senhas não coincidem.");
    setLoading(true);
    try {
      await updatePassword(password);
      navigate({ to: "/conta" });
    } catch (err: any) {
      setMsg(err.message ?? "Falha ao atualizar senha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Nova senha" subtitle="Escolha uma senha de acesso segura.">
      <form onSubmit={submit} className="space-y-4">
        <Field label="Nova senha">
          <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Field>
        <Field label="Confirmar senha">
          <input type="password" className="input" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        </Field>
        {msg && <p className="text-[13px] text-red-500">{msg}</p>}
        <button disabled={loading} className="inline-flex h-12 w-full items-center justify-center rounded-full bg-foreground text-[14px] font-medium text-background disabled:opacity-60">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Salvar nova senha"}
        </button>
      </form>
    </AuthShell>
  );
}
