import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { onlyDigits } from "./cpf";

type Profile = {
  id: string;
  full_name: string;
  cpf: string;
  phone: string | null;
  email: string;
};

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signInWithCpf: (cpf: string, password: string) => Promise<void>;
  signUp: (data: {
    full_name: string;
    cpf: string;
    phone: string;
    email: string;
    password: string;
  }) => Promise<void>;
  signOut: () => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  resetPasswordForEmail: (email: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      if (sess?.user) {
        // defer profile fetch to avoid deadlock
        setTimeout(() => loadProfile(sess.user.id), 0);
      } else {
        setProfile(null);
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (data.session?.user) loadProfile(data.session.user.id);
      setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  async function loadProfile(userId: string) {
    const { data } = await supabase
      .from("profiles" as any)
      .select("*")
      .eq("id", userId)
      .maybeSingle();
    if (data) setProfile(data as unknown as Profile);
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      profile,
      loading,
      async signInWithCpf(cpf, password) {
        const clean = onlyDigits(cpf);
        const { data: emailData, error: rpcErr } = await supabase.rpc(
          "get_email_by_cpf" as any,
          { _cpf: clean },
        );
        if (rpcErr) throw new Error("Falha ao consultar CPF.");
        const email = emailData as unknown as string | null;
        if (!email) throw new Error("CPF não encontrado.");
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw new Error("Senha incorreta.");
      },
      async signUp({ full_name, cpf, phone, email, password }) {
        const clean = onlyDigits(cpf);
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              full_name,
              cpf: clean,
              phone: onlyDigits(phone),
            },
          },
        });
        if (error) {
          if (error.message.toLowerCase().includes("already"))
            throw new Error("Este e-mail já está cadastrado.");
          throw error;
        }
      },
      async signOut() {
        await supabase.auth.signOut();
      },
      async updatePassword(newPassword: string) {
        const { error } = await supabase.auth.updateUser({
          password: newPassword,
        });
        if (error) throw error;
      },
      async resetPasswordForEmail(email: string) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
      },
      async refreshProfile() {
        if (user) await loadProfile(user.id);
      },
    }),
    [user, session, profile, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
