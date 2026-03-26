"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import PropostaForm from "@/components/PropostaForm";

export default function EditarPropostaPage() {
  const params = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [proposta, setProposta] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("propostas")
        .select("*")
        .eq("id", params.id)
        .single();
      setProposta(data);
      setLoading(false);
    }
    load();
  }, [params.id]);

  if (loading)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#000",
          color: "#888",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Carregando...
      </div>
    );

  if (!proposta)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#000",
          color: "#ff4444",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Proposta não encontrada
      </div>
    );

  return <PropostaForm inicial={proposta} />;
}
