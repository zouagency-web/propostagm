"use client";

import { useEffect } from "react";
import { Proposta } from "@/lib/types";

export default function PropostaTemplate({ data }: { data: Proposta }) {
  useEffect(() => {
    // Cursor
    const cursor = document.getElementById("cursor");
    const handleMouse = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.left = e.clientX - 3 + "px";
        cursor.style.top = e.clientY - 3 + "px";
      }
    };
    document.addEventListener("mousemove", handleMouse);

    // Scroll reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    // Dor items
    const dorObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );
    document
      .querySelectorAll(".dor-item")
      .forEach((el) => dorObserver.observe(el));

    // Counter animation
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target as HTMLElement);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    document
      .querySelectorAll(".num-value")
      .forEach((el) => counterObserver.observe(el));

    return () => {
      document.removeEventListener("mousemove", handleMouse);
      observer.disconnect();
      dorObserver.disconnect();
      counterObserver.disconnect();
    };
  }, []);

  function animateCounter(el: HTMLElement) {
    const text = el.getAttribute("data-value") || el.textContent || "";
    const num = parseInt(text.replace(/\D/g, ""));
    const suffix = text.replace(/[\d]/g, "");
    const duration = 1800;
    let start: number | null = null;

    function update(now: number) {
      if (!start) start = now;
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(num * eased) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const whatsappLink =
    data.cta_link ||
    `https://wa.me/${data.whatsapp_numero}?text=${encodeURIComponent(`Olá! Vi a proposta da Zou Doctors para ${data.cliente_nome} e quero avançar.`)}`;

  return (
    <>
      <div className="cursor" id="cursor" />

      {/* NAV */}
      <nav>
        <div className="nav-logo">
          {data.cliente_logo_url ? (
            <img src={data.cliente_logo_url} alt={data.cliente_nome} />
          ) : (
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Zou Doctors
            </span>
          )}
        </div>
        <span className="nav-tag">Proposta Comercial</span>
        <a href="#cta" className="nav-cta">
          Falar Agora
        </a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-dots" />

        <div className="hero-meta">
          <div className="hero-meta-item">
            <label>Cliente</label>
            <span>{data.cliente_nome}</span>
          </div>
          <div className="hero-meta-item">
            <label>Data</label>
            <span>{data.data_proposta}</span>
          </div>
          <div className="hero-meta-item">
            <label>Validade</label>
            <span>{data.validade}</span>
          </div>
        </div>

        <div className="hero-eyebrow">{data.hero_eyebrow}</div>

        <h1 className="hero-title">
          <span className="line">
            <span>{data.hero_titulo_linha1}</span>
          </span>
          <span className="line">
            <span>{data.hero_titulo_linha2}</span>
          </span>
          {data.hero_titulo_linha3 && (
            <span className="line">
              <span>{data.hero_titulo_linha3}</span>
            </span>
          )}
        </h1>

        <p className="hero-sub">{data.hero_subtitulo}</p>

        <div className="hero-badges">
          {data.hero_badges.map((badge, i) => (
            <div
              key={i}
              className={`badge ${i === 0 ? "badge-green" : ""}`}
            >
              {i === 0 && <span className="badge-dot" />}
              {badge}
            </div>
          ))}
        </div>

        <div className="scroll-ind">
          Scroll
          <div className="scroll-line" />
        </div>
      </section>

      {/* TEAM */}
      <div className="team-section">
        <div className="team-img-col">
          {data.team_imagem_url && (
            <img src={data.team_imagem_url} alt="Time Zou Doctors" />
          )}
          <div className="team-img-overlay" />
        </div>
        <div className="team-text-col">
          <div className="team-eyebrow">Quem vai trabalhar com você</div>
          <h2 className="team-title">
            Time
            <br />
            <span>Zou Doctors</span>
          </h2>
          <p className="team-desc">{data.team_descricao}</p>
          <div className="team-stats">
            {data.team_stats.map((stat, i) => (
              <div key={i}>
                <div className="team-stat-val">{stat.valor}</div>
                <div className="team-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DIAGNÓSTICO */}
      {data.diagnostico_items.length > 0 && (
        <section className="section">
          <div className="eyebrow reveal">01 · Diagnóstico</div>
          <h2 className="sec-title reveal">
            O que
            <br />
            <span>encontramos</span>
          </h2>
          <div className="diag-grid">
            {data.diagnostico_items.map((item, i) => (
              <div key={i} className="diag-card reveal">
                <div className="diag-num">{item.numero}</div>
                <h3>{item.titulo}</h3>
                <p dangerouslySetInnerHTML={{ __html: item.descricao }} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* DORES */}
      {data.dores_items.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="eyebrow reveal">02 · Dores mapeadas</div>
          <h2 className="sec-title reveal">
            Problemas
            <br />
            <span>identificados</span>
          </h2>
          <div className="dores-list">
            {data.dores_items.map((dor, i) => (
              <div key={i} className="dor-item">
                <div className="dor-num-col">
                  <div className="dor-num">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
                <div className="dor-content">
                  <h4>{dor.titulo}</h4>
                  <p dangerouslySetInnerHTML={{ __html: dor.descricao }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SOLUÇÃO */}
      {data.pilares.length > 0 && (
        <section className="section solucao">
          <div className="eyebrow reveal">03 · Solução</div>
          <h2 className="sec-title reveal">
            O que vamos
            <br />
            <span>construir juntos</span>
          </h2>
          {data.solucao_intro && (
            <p className="solucao-intro reveal">{data.solucao_intro}</p>
          )}
          {data.solucao_disclaimer && (
            <p className="solucao-disclaimer reveal">
              {data.solucao_disclaimer}
            </p>
          )}
          <div className="pilares">
            {data.pilares.map((pilar, i) => (
              <div key={i} className="pilar reveal">
                <div className="pilar-num">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="pilar-tag">{pilar.tag}</div>
                <h3>{pilar.titulo}</h3>
                <ul>
                  {pilar.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* META */}
      {data.meta_items.length > 0 && (
        <section className="section meta-section">
          <div className="meta-glow" />
          <div className="eyebrow reveal">04 · Meta</div>
          <h2 className="sec-title reveal">
            Onde queremos
            <br />
            <span>chegar</span>
          </h2>
          <div className="meta-grid">
            <div className="meta-left reveal">
              <p>{data.meta_descricao}</p>
            </div>
            <div className="meta-right">
              {data.meta_items.map((item, i) => (
                <div key={i} className="meta-item reveal">
                  <div className="meta-item-label">{item.label}</div>
                  <p>{item.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* METODOLOGIA */}
      {data.etapas.length > 0 && (
        <section className="section">
          <div className="eyebrow reveal">05 · Metodologia</div>
          <h2 className="sec-title reveal">
            Como
            <br />
            <span>executamos</span>
          </h2>
          <div className="etapas">
            {data.etapas.map((etapa, i) => (
              <div key={i} className="etapa reveal">
                <div className="etapa-time">
                  <div className="etapa-time-tag">{etapa.periodo}</div>
                  <div className="etapa-time-step">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
                <div className="etapa-content">
                  <h4>{etapa.titulo}</h4>
                  <p>{etapa.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* DIFERENCIAIS */}
      {data.diferenciais.length > 0 && (
        <section className="section dif-section">
          <div className="eyebrow reveal">06 · Diferenciais</div>
          <h2 className="sec-title reveal">
            Por que a<br />
            <span>Zou Doctors</span>
          </h2>
          <div className="dif-grid">
            {data.diferenciais.map((dif, i) => (
              <div
                key={i}
                className={`dif-item reveal ${i > 0 ? `reveal-delay-${Math.min(i % 3, 2)}` : ""}`}
              >
                <div className="dif-icon">{dif.icone}</div>
                <h4>{dif.titulo}</h4>
                <p>{dif.descricao}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* NÚMEROS */}
      {data.numeros.length > 0 && (
        <section className="section numeros">
          <div className="eyebrow reveal" style={{ color: "#fff" }}>
            07 · Resultados
          </div>
          <h2
            className="sec-title reveal"
            style={{ marginBottom: 48 }}
          >
            Nossos
            <br />
            <span style={{ color: "#fff" }}>números</span>
          </h2>
          <div className="num-grid">
            {data.numeros.map((num, i) => (
              <div key={i} className="num-card reveal">
                <div className="num-value" data-value={num.valor}>
                  {num.valor}
                </div>
                <div className="num-label">{num.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* INVESTIMENTO */}
      <section className="section">
        <div className="eyebrow reveal">08 · Investimento</div>
        <h2 className="sec-title reveal">
          Proposta
          <br />
          <span>de investimento</span>
        </h2>
        <div className="inv-wrapper">
          <div className="inv-card reveal">
            <div className="inv-card-top">
              <div>
                <div className="inv-price-label">
                  Proposta de investimento
                </div>
                <div className="inv-price">{data.investimento_valor}</div>
                {data.investimento_subtexto && (
                  <div className="inv-sub">
                    {data.investimento_subtexto}
                  </div>
                )}
              </div>
              {data.investimento_badge && (
                <div className="inv-badge">{data.investimento_badge}</div>
              )}
            </div>
            {data.investimento_items.length > 0 && (
              <div className="inv-card-bottom">
                {data.investimento_items.map((item, i) => (
                  <div key={i} className="inv-item">
                    <div className="inv-item-dot" />
                    <span>{item.texto}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PRÓXIMOS PASSOS */}
      {data.proximos_passos.length > 0 && (
        <section className="section steps-section">
          <div className="eyebrow reveal">09 · Próximos passos</div>
          <h2 className="sec-title reveal">
            Como avançamos
            <br />
            <span>juntos</span>
          </h2>
          <div className="steps-grid">
            {data.proximos_passos.map((step, i) => (
              <div
                key={i}
                className={`step reveal ${i > 0 ? `reveal-delay-${Math.min(i, 3)}` : ""}`}
              >
                <div className="step-num">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="step-tag">{step.tag}</div>
                <h4>{step.titulo}</h4>
                <p>{step.descricao}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="cta-section" id="cta">
        <div className="cta-glow" />
        <div className="cta-dots-bg" />
        <h2
          className="cta-title reveal"
          dangerouslySetInnerHTML={{ __html: data.cta_titulo }}
        />
        <p className="cta-sub reveal">{data.cta_subtitulo}</p>
        <a
          href={whatsappLink}
          className="cta-btn reveal"
          target="_blank"
          rel="noopener noreferrer"
        >
          {data.cta_texto_botao}
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </section>

      {/* FOOTER */}
      <footer>
        <span
          style={{
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Zou Doctors
        </span>
        <div className="footer-info">
          Documento confidencial · {data.cliente_nome}
          <br />
          {data.data_proposta} · Validade: {data.validade}
        </div>
      </footer>
    </>
  );
}
