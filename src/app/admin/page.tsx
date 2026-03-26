"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface PropostaResumida {
  id: string;
  slug: string;
  cliente_nome: string;
  ativa: boolean;
  created_at: string;
  investimento_valor: string;
}

export default function AdminPage() {
  const [propostas, setPropostas] = useState<PropostaResumida[]>([]);
  const [loading, setLoading] = useState(true);
  const [senha, setSenha] = useState("");
  const [autenticado, setAutenticado] = useState(false);

  const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASS || "zou2024";

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_auth");
    if (saved === "true") {
      setAutenticado(true);
      carregarPropostas();
    } else {
      setLoading(false);
    }
  }, []);

  async function carregarPropostas() {
    setLoading(true);
    const { data } = await supabase
      .from("propostas")
      .select("id, slug, cliente_nome, ativa, created_at, investimento_valor")
      .order("created_at", { ascending: false });
    setPropostas(data || []);
    setLoading(false);
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (senha === ADMIN_PASS) {
      setAutenticado(true);
      sessionStorage.setItem("admin_auth", "true");
      carregarPropostas();
    } else {
      alert("Senha incorreta");
    }
  }

  async function toggleAtiva(id: string, ativa: boolean) {
    await supabase.from("propostas").update({ ativa: !ativa }).eq("id", id);
    carregarPropostas();
  }

  async function deletarProposta(id: string) {
    if (!confirm("Tem certeza que deseja excluir esta proposta?")) return;
    await supabase.from("propostas").delete().eq("id", id);
    carregarPropostas();
  }

  if (!autenticado) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          color: "#fff",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            width: 320,
          }}
        >
          <h1
            style={{
              fontSize: 24,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
            }}
          >
            Admin
          </h1>
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={{
              padding: "12px 16px",
              background: "#111",
              border: "1px solid #222",
              borderRadius: 4,
              color: "#fff",
              fontSize: 14,
            }}
          />
          <button
            type="submit"
            style={{
              padding: "12px 16px",
              background: "#1a7a3c",
              border: "none",
              borderRadius: 4,
              color: "#000",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
        padding: "40px 48px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 48,
        }}
      >
        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
          }}
        >
          Propostas
        </h1>
        <a
          href="/admin/nova"
          style={{
            padding: "12px 24px",
            background: "#1a7a3c",
            color: "#000",
            borderRadius: 4,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          + Nova Proposta
        </a>
      </div>

      {loading ? (
        <p style={{ color: "#888" }}>Carregando...</p>
      ) : propostas.length === 0 ? (
        <p style={{ color: "#888" }}>Nenhuma proposta ainda.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.08)" }}>
          {propostas.map((p) => (
            <div
              key={p.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 120px 140px 160px",
                alignItems: "center",
                padding: "20px 24px",
                background: "#000",
                gap: 16,
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                  {p.cliente_nome}
                </div>
                <div style={{ fontSize: 12, color: "#888" }}>
                  /{p.slug} · {p.investimento_valor || "Sem valor"}
                </div>
              </div>
              <div>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: 3,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    background: p.ativa
                      ? "rgba(26,122,60,0.15)"
                      : "rgba(255,0,0,0.1)",
                    color: p.ativa ? "#1a7a3c" : "#ff4444",
                    border: `1px solid ${p.ativa ? "rgba(26,122,60,0.3)" : "rgba(255,0,0,0.2)"}`,
                  }}
                >
                  {p.ativa ? "Ativa" : "Inativa"}
                </span>
              </div>
              <div style={{ fontSize: 12, color: "#888" }}>
                {new Date(p.created_at).toLocaleDateString("pt-BR")}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <a
                  href={`/${p.slug}`}
                  target="_blank"
                  style={{
                    padding: "6px 12px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 3,
                    fontSize: 11,
                    color: "#ccc",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Ver
                </a>
                <a
                  href={`/admin/editar/${p.id}`}
                  style={{
                    padding: "6px 12px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 3,
                    fontSize: 11,
                    color: "#ccc",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Editar
                </a>
                <button
                  onClick={() => toggleAtiva(p.id, p.ativa)}
                  style={{
                    padding: "6px 12px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 3,
                    fontSize: 11,
                    color: "#ccc",
                    background: "transparent",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  {p.ativa ? "Desativar" : "Ativar"}
                </button>
                <button
                  onClick={() => deletarProposta(p.id)}
                  style={{
                    padding: "6px 12px",
                    border: "1px solid rgba(255,0,0,0.2)",
                    borderRadius: 3,
                    fontSize: 11,
                    color: "#ff4444",
                    background: "transparent",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
