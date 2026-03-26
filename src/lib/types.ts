export interface DiagnosticoItem {
  numero: string;
  titulo: string;
  descricao: string;
}

export interface DorItem {
  titulo: string;
  descricao: string;
}

export interface PilarItem {
  tag: string;
  titulo: string;
  items: string[];
}

export interface EtapaItem {
  periodo: string;
  titulo: string;
  descricao: string;
}

export interface DiferencialItem {
  icone: string;
  titulo: string;
  descricao: string;
}

export interface NumeroItem {
  valor: string;
  label: string;
}

export interface InvestimentoItem {
  texto: string;
}

export interface StepItem {
  tag: string;
  titulo: string;
  descricao: string;
}

export interface MetaItem {
  label: string;
  texto: string;
}

export interface Proposta {
  id: string;
  slug: string;
  ativa: boolean;
  created_at: string;

  // Hero
  cliente_nome: string;
  cliente_logo_url?: string;
  data_proposta: string;
  validade: string;
  hero_eyebrow: string;
  hero_titulo_linha1: string;
  hero_titulo_linha2: string;
  hero_titulo_linha3: string;
  hero_subtitulo: string;
  hero_badges: string[];

  // Team
  team_imagem_url?: string;
  team_descricao: string;
  team_stats: NumeroItem[];

  // Diagnóstico
  diagnostico_items: DiagnosticoItem[];

  // Dores
  dores_items: DorItem[];

  // Solução
  solucao_intro: string;
  solucao_disclaimer: string;
  pilares: PilarItem[];

  // Meta
  meta_descricao: string;
  meta_items: MetaItem[];

  // Metodologia
  etapas: EtapaItem[];

  // Diferenciais
  diferenciais: DiferencialItem[];

  // Números
  numeros: NumeroItem[];

  // Investimento
  investimento_valor: string;
  investimento_subtexto: string;
  investimento_badge: string;
  investimento_items: InvestimentoItem[];

  // Próximos passos
  proximos_passos: StepItem[];

  // CTA
  cta_titulo: string;
  cta_subtitulo: string;
  cta_link: string;
  cta_texto_botao: string;

  // Cores (customizável por proposta)
  cor_primaria: string;
  cor_primaria_dim: string;

  // WhatsApp
  whatsapp_numero: string;
}
