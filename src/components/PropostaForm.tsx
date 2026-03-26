"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  background: "#111",
  border: "1px solid #222",
  borderRadius: 4,
  color: "#fff",
  fontSize: 14,
  fontFamily: "Inter, sans-serif",
};

const labelStyle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#1a7a3c",
  marginBottom: 6,
  display: "block",
};

const sectionStyle: React.CSSProperties = {
  padding: "32px 0",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
};

const sectionTitle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "-0.01em",
  marginBottom: 24,
};

interface JsonItem {
  [key: string]: string | string[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PropostaForm({ inicial }: { inicial?: any }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  // Basic fields
  const [slug, setSlug] = useState(inicial?.slug || "");
  const [clienteNome, setClienteNome] = useState(inicial?.cliente_nome || "");
  const [clienteLogoUrl, setClienteLogoUrl] = useState(inicial?.cliente_logo_url || "");
  const [dataProposta, setDataProposta] = useState(inicial?.data_proposta || new Date().toLocaleDateString("pt-BR"));
  const [validade, setValidade] = useState(inicial?.validade || "15 dias");
  const [heroEyebrow, setHeroEyebrow] = useState(inicial?.hero_eyebrow || "");
  const [heroLinha1, setHeroLinha1] = useState(inicial?.hero_titulo_linha1 || "");
  const [heroLinha2, setHeroLinha2] = useState(inicial?.hero_titulo_linha2 || "");
  const [heroLinha3, setHeroLinha3] = useState(inicial?.hero_titulo_linha3 || "");
  const [heroSub, setHeroSub] = useState(inicial?.hero_subtitulo || "");
  const [heroBadges, setHeroBadges] = useState(inicial?.hero_badges?.join("\n") || "");

  // Team
  const [teamImgUrl, setTeamImgUrl] = useState(inicial?.team_imagem_url || "");
  const [teamDesc, setTeamDesc] = useState(inicial?.team_descricao || "Especialistas em estruturação comercial e processos de vendas para o setor de saúde. 3 anos focados exclusivamente no mercado médico, com metodologia própria baseada em performance e previsibilidade.");
  const [teamStats, setTeamStats] = useState(JSON.stringify(inicial?.team_stats || [
    { valor: "170+", label: "Clínicas atendidas" },
    { valor: "R$200M+", label: "Gerados em receita" },
    { valor: "3 anos", label: "No setor de saúde" },
  ], null, 2));

  // JSON sections
  const [diagnosticoItems, setDiagnosticoItems] = useState(JSON.stringify(inicial?.diagnostico_items || [], null, 2));
  const [doresItems, setDoresItems] = useState(JSON.stringify(inicial?.dores_items || [], null, 2));
  const [solucaoIntro, setSolucaoIntro] = useState(inicial?.solucao_intro || "");
  const [solucaoDisclaimer, setSolucaoDisclaimer] = useState(inicial?.solucao_disclaimer || "");
  const [pilares, setPilares] = useState(JSON.stringify(inicial?.pilares || [], null, 2));
  const [metaDescricao, setMetaDescricao] = useState(inicial?.meta_descricao || "");
  const [metaItems, setMetaItems] = useState(JSON.stringify(inicial?.meta_items || [], null, 2));
  const [etapas, setEtapas] = useState(JSON.stringify(inicial?.etapas || [], null, 2));
  const [diferenciais, setDiferenciais] = useState(JSON.stringify(inicial?.diferenciais || [
    { icone: "⚙", titulo: "Processo próprio", descricao: "Metodologia validada em mais de 170 clínicas" },
    { icone: "🎯", titulo: "Foco em saúde", descricao: "Atuamos exclusivamente no setor médico" },
    { icone: "📈", titulo: "Orientação a dados", descricao: "Decisões baseadas em métricas reais" },
    { icone: "⚡", titulo: "Velocidade", descricao: "Implementação rápida sem burocracia" },
    { icone: "🤝", titulo: "Parceria real", descricao: "Trabalhamos junto com o time, não à distância" },
    { icone: "🏥", titulo: "Experiência médica", descricao: "Entendemos as particularidades do setor" },
  ], null, 2));
  const [numeros, setNumeros] = useState(JSON.stringify(inicial?.numeros || [
    { valor: "170+", label: "Clínicas atendidas" },
    { valor: "R$200M+", label: "Em receita gerada" },
    { valor: "3 anos", label: "Focados em saúde" },
  ], null, 2));

  // Investimento
  const [invValor, setInvValor] = useState(inicial?.investimento_valor || "A definir");
  const [invSub, setInvSub] = useState(inicial?.investimento_subtexto || "");
  const [invBadge, setInvBadge] = useState(inicial?.investimento_badge || "");
  const [invItems, setInvItems] = useState(JSON.stringify(inicial?.investimento_items || [], null, 2));

  // Próximos passos
  const [proximosPassos, setProximosPassos] = useState(JSON.stringify(inicial?.proximos_passos || [
    { tag: "Passo 1", titulo: "Reunião de alinhamento", descricao: "Alinhamos expectativas, escopo e cronograma" },
    { tag: "Passo 2", titulo: "Proposta aprovada", descricao: "Formalizamos e iniciamos o onboarding" },
    { tag: "Passo 3", titulo: "Kickoff", descricao: "Início da execução com o time dedicado" },
    { tag: "Passo 4", titulo: "Resultados", descricao: "Acompanhamento semanal com métricas claras" },
  ], null, 2));

  // CTA
  const [ctaTitulo, setCtaTitulo] = useState(inicial?.cta_titulo || 'Pronto para<br><span>estruturar?</span>');
  const [ctaSub, setCtaSub] = useState(inicial?.cta_subtitulo || "Fale agora com a Zou Doctors e dê o primeiro passo.");
  const [ctaLink, setCtaLink] = useState(inicial?.cta_link || "");
  const [ctaBotao, setCtaBotao] = useState(inicial?.cta_texto_botao || "Falar com a Zou Doctors");
  const [whatsapp, setWhatsapp] = useState(inicial?.whatsapp_numero || "5561995537205");

  // Cores
  const [corPrimaria, setCorPrimaria] = useState(inicial?.cor_primaria || "#1a7a3c");
  const [corPrimariaDim, setCorPrimariaDim] = useState(inicial?.cor_primaria_dim || "#0f4a22");

  function parseJson(str: string): JsonItem[] {
    try {
      return JSON.parse(str);
    } catch {
      return [];
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, ""),
      cliente_nome: clienteNome,
      cliente_logo_url: clienteLogoUrl || null,
      data_proposta: dataProposta,
      validade,
      hero_eyebrow: heroEyebrow,
      hero_titulo_linha1: heroLinha1,
      hero_titulo_linha2: heroLinha2,
      hero_titulo_linha3: heroLinha3 || null,
      hero_subtitulo: heroSub,
      hero_badges: heroBadges.split("\n").filter(Boolean),
      team_imagem_url: teamImgUrl || null,
      team_descricao: teamDesc,
      team_stats: parseJson(teamStats),
      diagnostico_items: parseJson(diagnosticoItems),
      dores_items: parseJson(doresItems),
      solucao_intro: solucaoIntro,
      solucao_disclaimer: solucaoDisclaimer,
      pilares: parseJson(pilares),
      meta_descricao: metaDescricao,
      meta_items: parseJson(metaItems),
      etapas: parseJson(etapas),
      diferenciais: parseJson(diferenciais),
      numeros: parseJson(numeros),
      investimento_valor: invValor,
      investimento_subtexto: invSub,
      investimento_badge: invBadge,
      investimento_items: parseJson(invItems),
      proximos_passos: parseJson(proximosPassos),
      cta_titulo: ctaTitulo,
      cta_subtitulo: ctaSub,
      cta_link: ctaLink || null,
      cta_texto_botao: ctaBotao,
      whatsapp_numero: whatsapp,
      cor_primaria: corPrimaria,
      cor_primaria_dim: corPrimariaDim,
      ativa: true,
    };

    if (inicial?.id) {
      const { error } = await supabase
        .from("propostas")
        .update(payload)
        .eq("id", inicial.id);
      if (error) {
        alert("Erro ao salvar: " + error.message);
        setSaving(false);
        return;
      }
    } else {
      const { error } = await supabase.from("propostas").insert(payload);
      if (error) {
        alert("Erro ao criar: " + error.message);
        setSaving(false);
        return;
      }
    }

    router.push("/admin");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
        padding: "40px 48px",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 48 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, textTransform: "uppercase" }}>
          {inicial ? "Editar Proposta" : "Nova Proposta"}
        </h1>
        <a href="/admin" style={{ color: "#888", fontSize: 13, textDecoration: "none" }}>
          ← Voltar
        </a>
      </div>

      <form onSubmit={handleSubmit}>
        {/* BÁSICO */}
        <div style={sectionStyle}>
          <h2 style={sectionTitle}>Informações Básicas</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={labelStyle}>Slug (URL)</label>
              <input style={inputStyle} value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="zeiki-medical" required />
            </div>
            <div>
              <label style={labelStyle}>Nome do Cliente</label>
              <input style={inputStyle} value={clienteNome} onChange={(e) => setClienteNome(e.target.value)} placeholder="Zeiki Medical" required />
            </div>
            <div>
              <label style={labelStyle}>Logo URL</label>
              <input style={inputStyle} value={clienteLogoUrl} onChange={(e) => setClienteLogoUrl(e.target.value)} placeholder="https://..." />
            </div>
            <div>
              <label style={labelStyle}>Data da Proposta</label>
              <input style={inputStyle} value={dataProposta} onChange={(e) => setDataProposta(e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Validade</label>
              <input style={inputStyle} value={validade} onChange={(e) => setValidade(e.target.value)} />
            </div>
          </div>
        </div>

        {/* HERO */}
        <div style={sectionStyle}>
          <h2 style={sectionTitle}>Hero</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={labelStyle}>Eyebrow (texto pequeno acima do título)</label>
              <input style={inputStyle} value={heroEyebrow} onChange={(e) => setHeroEyebrow(e.target.value)} placeholder="Proposta Comercial Estratégica · Zeiki Medical · 2025" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              <div>
                <label style={labelStyle}>Título Linha 1</label>
                <input style={inputStyle} value={heroLinha1} onChange={(e) => setHeroLinha1(e.target.value)} placeholder="Estruturação" required />
              </div>
              <div>
                <label style={labelStyle}>Título Linha 2 (verde)</label>
                <input style={inputStyle} value={heroLinha2} onChange={(e) => setHeroLinha2(e.target.value)} placeholder="Comercial" required />
              </div>
              <div>
                <label style={labelStyle}>Título Linha 3 (opcional)</label>
                <input style={inputStyle} value={heroLinha3} onChange={(e) => setHeroLinha3(e.target.value)} placeholder="Zeiki Medical" />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Subtítulo</label>
              <textarea style={{ ...inputStyle, minHeight: 80 }} value={heroSub} onChange={(e) => setHeroSub(e.target.value)} placeholder="Descrição da proposta..." />
            </div>
            <div>
              <label style={labelStyle}>Badges (uma por linha)</label>
              <textarea style={{ ...inputStyle, minHeight: 60 }} value={heroBadges} onChange={(e) => setHeroBadges(e.target.value)} placeholder="Consultoria Estratégica&#10;CRM & Processos&#10;Performance" />
            </div>
          </div>
        </div>

        {/* TEAM */}
        <div style={sectionStyle}>
          <h2 style={sectionTitle}>Time</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={labelStyle}>Imagem do Time (URL)</label>
              <input style={inputStyle} value={teamImgUrl} onChange={(e) => setTeamImgUrl(e.target.value)} placeholder="https://..." />
            </div>
            <div>
              <label style={labelStyle}>Descrição do Time</label>
              <textarea style={{ ...inputStyle, minHeight: 80 }} value={teamDesc} onChange={(e) => setTeamDesc(e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Stats do Time (JSON)</label>
              <textarea style={{ ...inputStyle, minHeight: 100, fontFamily: "monospace", fontSize: 12 }} value={teamStats} onChange={(e) => setTeamStats(e.target.value)} />
            </div>
          </div>
        </div>

        {/* DIAGNÓSTICO */}
        <div style={sectionStyle}>
          <h2 style={sectionTitle}>Diagnóstico</h2>
          <label style={labelStyle}>Items (JSON: numero, titulo, descricao)</label>
          <textarea style={{ ...inputStyle, minHeight: 200, fontFamily: "monospace", fontSize: 12 }} value={diagnosticoItems} onChange={(e) => setDiagnosticoItems(e.target.value)} placeholder='[{"numero": "01", "titulo": "...", "descricao": "..."}]' />
        </div>

        {/* DORES */}
        <div style={sectionStyle}>
          <h2 style={sectionTitle}>Dores</h2>
          <label style={labelStyle}>Items (JSON: titulo, descricao)</label>
          <textarea style={{ ...inputStyle, minHeight: 200, fontFamily: "monospace", fontSize: 12 }} value={doresItems} onChange={(e) => setDoresItems(e.target.value)} placeholder='[{"titulo": "...", "descricao": "..."}]' />
        </div>

        {/* SOLUÇÃO */}
        <div style={sectionStyle}>
          <h2 style={sectionTitle}>Solução</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={labelStyle}>Intro</label>
              <textarea style={{ ...inputStyle, minHeight: 80 }} value={solucaoIntro} onChange={(e) => setSolucaoIntro(e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Disclaimer</label>
              <textarea style={{ ...inputStyle, minHeight: 80 }} value={solucaoDisclaimer} onChange={(e) => setSolucaoDisclaimer(e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Pilares (JSON: tag, titulo, items[])</label>
              <textarea style={{ ...inputStyle, minHeight: 200, fontFamily: "monospace", fontSize: 12 }} value={pilares} onChange={(e) => setPilares(e.target.value)} />
            </div>
          </div>
        </div>

        {/* META */}
        <div style={sectionStyle}>
          <h2 style={sectionTitle}>Meta</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={labelStyle}>Descrição</label>
              <textarea style={{ ...inputStyle, minHeight: 80 }} value={metaDescricao} onChange={(e) => setMetaDescricao(e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Items (JSON: label, texto)</label>
              <textarea style={{ ...inputStyle, minHeight: 150, fontFamily: "monospace", fontSize: 12 }} value={metaItems} onChange={(e) => setMetaItems(e.target.value)} />
            </div>
          </div>
        </div>

        {/* METODOLOGIA */}
        <div style={sectionStyle}>
          <h2 style={sectionTitle}>Metodologia / Etapas</h2>
          <label style={labelStyle}>Etapas (JSON: periodo, titulo, descricao)</label>
          <textarea style={{ ...inputStyle, minHeight: 200, fontFamily: "monospace", fontSize: 12 }} value={etapas} onChange={(e) => setEtapas(e.target.value)} placeholder='[{"periodo": "Semana 1-2", "titulo": "...", "descricao": "..."}]' />
        </div>

        {/* DIFERENCIAIS */}
        <div style={sectionStyle}>
          <h2 style={sectionTitle}>Diferenciais</h2>
          <label style={labelStyle}>Items (JSON: icone, titulo, descricao)</label>
          <textarea style={{ ...inputStyle, minHeight: 200, fontFamily: "monospace", fontSize: 12 }} value={diferenciais} onChange={(e) => setDiferenciais(e.target.value)} />
        </div>

        {/* NÚMEROS */}
        <div style={sectionStyle}>
          <h2 style={sectionTitle}>Números</h2>
          <label style={labelStyle}>Items (JSON: valor, label)</label>
          <textarea style={{ ...inputStyle, minHeight: 120, fontFamily: "monospace", fontSize: 12 }} value={numeros} onChange={(e) => setNumeros(e.target.value)} />
        </div>

        {/* INVESTIMENTO */}
        <div style={sectionStyle}>
          <h2 style={sectionTitle}>Investimento</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Valor</label>
              <input style={inputStyle} value={invValor} onChange={(e) => setInvValor(e.target.value)} placeholder="R$ 5.000/mês" />
            </div>
            <div>
              <label style={labelStyle}>Subtexto</label>
              <input style={inputStyle} value={invSub} onChange={(e) => setInvSub(e.target.value)} placeholder="Valor ajustado após alinhamento" />
            </div>
            <div>
              <label style={labelStyle}>Badge</label>
              <input style={inputStyle} value={invBadge} onChange={(e) => setInvBadge(e.target.value)} placeholder="Duração mínima · 3 meses" />
            </div>
          </div>
          <label style={labelStyle}>Items inclusos (JSON: texto)</label>
          <textarea style={{ ...inputStyle, minHeight: 150, fontFamily: "monospace", fontSize: 12 }} value={invItems} onChange={(e) => setInvItems(e.target.value)} placeholder='[{"texto": "Auditoria completa"}]' />
        </div>

        {/* PRÓXIMOS PASSOS */}
        <div style={sectionStyle}>
          <h2 style={sectionTitle}>Próximos Passos</h2>
          <label style={labelStyle}>Steps (JSON: tag, titulo, descricao)</label>
          <textarea style={{ ...inputStyle, minHeight: 200, fontFamily: "monospace", fontSize: 12 }} value={proximosPassos} onChange={(e) => setProximosPassos(e.target.value)} />
        </div>

        {/* CTA */}
        <div style={sectionStyle}>
          <h2 style={sectionTitle}>CTA (Chamada Final)</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={labelStyle}>Título (aceita HTML para &lt;span&gt; verde)</label>
              <input style={inputStyle} value={ctaTitulo} onChange={(e) => setCtaTitulo(e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Subtítulo</label>
              <input style={inputStyle} value={ctaSub} onChange={(e) => setCtaSub(e.target.value)} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={labelStyle}>Link customizado (opcional)</label>
                <input style={inputStyle} value={ctaLink} onChange={(e) => setCtaLink(e.target.value)} placeholder="Deixe vazio para usar WhatsApp" />
              </div>
              <div>
                <label style={labelStyle}>Texto do botão</label>
                <input style={inputStyle} value={ctaBotao} onChange={(e) => setCtaBotao(e.target.value)} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>WhatsApp (número)</label>
              <input style={inputStyle} value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
            </div>
          </div>
        </div>

        {/* CORES */}
        <div style={sectionStyle}>
          <h2 style={sectionTitle}>Cores</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={labelStyle}>Cor Primária</label>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input type="color" value={corPrimaria} onChange={(e) => setCorPrimaria(e.target.value)} style={{ width: 40, height: 36, border: "none", background: "transparent", cursor: "pointer" }} />
                <input style={inputStyle} value={corPrimaria} onChange={(e) => setCorPrimaria(e.target.value)} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Cor Primária Dim</label>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input type="color" value={corPrimariaDim} onChange={(e) => setCorPrimariaDim(e.target.value)} style={{ width: 40, height: 36, border: "none", background: "transparent", cursor: "pointer" }} />
                <input style={inputStyle} value={corPrimariaDim} onChange={(e) => setCorPrimariaDim(e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: "40px 0", display: "flex", gap: 16 }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              padding: "16px 40px",
              background: "#1a7a3c",
              color: "#000",
              border: "none",
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: saving ? "not-allowed" : "pointer",
              opacity: saving ? 0.5 : 1,
            }}
          >
            {saving ? "Salvando..." : inicial ? "Salvar Alterações" : "Criar Proposta"}
          </button>
          <a
            href="/admin"
            style={{
              padding: "16px 24px",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 4,
              color: "#888",
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            Cancelar
          </a>
        </div>
      </form>
    </div>
  );
}
