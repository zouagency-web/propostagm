-- Tabela de propostas
-- Execute este SQL no Supabase SQL Editor

create table if not exists propostas (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  ativa boolean default true,
  created_at timestamptz default now(),

  -- Hero
  cliente_nome text not null,
  cliente_logo_url text,
  data_proposta text not null,
  validade text not null default '15 dias',
  hero_eyebrow text not null,
  hero_titulo_linha1 text not null,
  hero_titulo_linha2 text not null,
  hero_titulo_linha3 text,
  hero_subtitulo text not null,
  hero_badges jsonb default '[]'::jsonb,

  -- Team
  team_imagem_url text,
  team_descricao text,
  team_stats jsonb default '[]'::jsonb,

  -- Seções (JSON flexível)
  diagnostico_items jsonb default '[]'::jsonb,
  dores_items jsonb default '[]'::jsonb,
  solucao_intro text,
  solucao_disclaimer text,
  pilares jsonb default '[]'::jsonb,
  meta_descricao text,
  meta_items jsonb default '[]'::jsonb,
  etapas jsonb default '[]'::jsonb,
  diferenciais jsonb default '[]'::jsonb,
  numeros jsonb default '[]'::jsonb,

  -- Investimento
  investimento_valor text default 'A definir',
  investimento_subtexto text,
  investimento_badge text,
  investimento_items jsonb default '[]'::jsonb,

  -- Próximos passos
  proximos_passos jsonb default '[]'::jsonb,

  -- CTA
  cta_titulo text default 'Pronto para estruturar?',
  cta_subtitulo text,
  cta_link text,
  cta_texto_botao text default 'Falar com a Zou Doctors',

  -- Customização
  cor_primaria text default '#1a7a3c',
  cor_primaria_dim text default '#0f4a22',
  whatsapp_numero text default '5561995537205'
);

-- RLS
alter table propostas enable row level security;

-- Leitura pública (propostas ativas)
create policy "Leitura pública de propostas ativas"
  on propostas for select
  using (true);

-- Inserção via anon (admin usa senha no frontend)
create policy "Inserção permitida"
  on propostas for insert
  with check (true);

-- Atualização permitida
create policy "Atualização permitida"
  on propostas for update
  using (true);

-- Deleção permitida
create policy "Deleção permitida"
  on propostas for delete
  using (true);

-- Index para busca por slug
create index if not exists idx_propostas_slug on propostas (slug);
