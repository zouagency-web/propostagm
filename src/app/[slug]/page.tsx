import { supabase } from "@/lib/supabase";
import { Proposta } from "@/lib/types";
import PropostaTemplate from "@/components/PropostaTemplate";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await supabase
    .from("propostas")
    .select("cliente_nome, hero_eyebrow")
    .eq("slug", slug)
    .eq("ativa", true)
    .single();

  if (!data) return { title: "Proposta não encontrada" };

  return {
    title: `Proposta · ${data.cliente_nome} · Zou Doctors`,
    description: data.hero_eyebrow,
  };
}

export default async function PropostaPage({ params }: PageProps) {
  const { slug } = await params;

  const { data, error } = await supabase
    .from("propostas")
    .select("*")
    .eq("slug", slug)
    .eq("ativa", true)
    .single();

  if (error || !data) {
    notFound();
  }

  return <PropostaTemplate data={data as Proposta} />;
}
