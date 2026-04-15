"use client";

/**
 * Renderiza HTML cru de uma proposta dentro de um iframe que ocupa a tela toda.
 * Isolamento total — estilos e scripts da proposta não conflitam com o app.
 */
export default function RawHtmlProposta({ html }: { html: string }) {
  return (
    <iframe
      srcDoc={html}
      title="Proposta"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        border: 0,
        margin: 0,
        padding: 0,
      }}
    />
  );
}
