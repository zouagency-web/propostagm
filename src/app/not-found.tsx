export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, sans-serif",
        textAlign: "center",
        padding: 48,
      }}
    >
      <h1
        style={{
          fontSize: 72,
          fontWeight: 700,
          color: "rgba(26,122,60,0.2)",
          lineHeight: 1,
          marginBottom: 16,
        }}
      >
        404
      </h1>
      <p style={{ color: "#888", fontSize: 14, letterSpacing: "0.1em" }}>
        Proposta não encontrada
      </p>
    </div>
  );
}
