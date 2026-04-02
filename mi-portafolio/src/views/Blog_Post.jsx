// src/views/Blog_Post.jsx
import { useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Blog_Post.css";
import LayerDiagram from "../components/LayerDiagram/LayerDiagram";
import {
  LAYERS_AI,   LEGEND_AI,   INFO_AI,
  LAYERS_BANK, LEGEND_BANK, INFO_BANK,
} from "../models/diagramData";

// ══════════════════════════════════════════════════════════════
// FADE-IN HOOK
// ══════════════════════════════════════════════════════════════
function Fade({ children, as: As = "div", className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("bp-visible"); },
      { threshold: 0.06, rootMargin: "0px 0px -30px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <As ref={ref} className={`bp-fade ${className}`}>{children}</As>;
}

// ══════════════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════════════
export default function Blog_Post() {
  const { slug } = useParams();

  const pillars = [
    { n:"01", title:"Sistema de Organización", desc:"¿Cómo se agrupa y categoriza el contenido? Esquemas exactos (alfabético, cronológico) vs. ambiguos (por tema, audiencia, tarea). La elección cambia todo." },
    { n:"02", title:"Sistema de Etiquetado",   desc:"¿Con qué palabras se representa la información? Las etiquetas son la interfaz entre el lenguaje del sistema y el del usuario. El gap aquí es devastador." },
    { n:"03", title:"Sistema de Navegación",   desc:"¿Cómo se mueve la gente por el espacio de información? Navegación global, local, contextual, de pie de página. Cada una cumple una función distinta." },
    { n:"04", title:"Sistema de Búsqueda",     desc:"¿Qué pasa cuando alguien no navega y solo busca? El algoritmo de búsqueda, los metadatos y el sistema de recuperación determinan si el usuario encuentra o abandona." },
  ];

  return (
    <article className="blog-post">

      {/* ── HEADER ──────────────────────────────────────────── */}
      <header className="bp-header">
        <div className="bp-journal-bar">
          <Link to="/articulos" className="bp-back-link">← Correspondencia</Link>
          <span>Vol. 01 · Arquitectura de la Información · 2025</span>
        </div>

        <div className="bp-header-body">
          <span className="bp-category-tag">Ensayo especializado</span>
          <h1 className="bp-title">
            La arquitectura invisible<br />que lo sostiene todo
          </h1>
          <p className="bp-subtitle">
            La Arquitectura de la Información no vive en las pantallas. Vive en las decisiones
            que se toman antes de que exista una sola pantalla.
          </p>
          <div className="bp-meta-row">
            {[["Campo","UX / Sistemas de Información"],["Enfoque","Estrategia & Estructura"],["Lectura","~8 minutos"]].map(([l,v])=>(
              <div key={l} className="bp-meta-item">
                <span className="bp-meta-label">{l}</span>
                <span className="bp-meta-value">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bp-abstract">
          <div className="bp-abstract-header">
            <span className="bp-abstract-label">Resumen</span>
          </div>
          <p>
            Este ensayo examina la Arquitectura de la Información (AI) como disciplina estructural
            previa al diseño visual, argumentando que la mayoría de los problemas de usabilidad
            tienen origen arquitectónico, no estético. Se describen los cuatro sistemas
            fundamentales propuestos por Morville y Rosenfeld, se ilustra mediante diagramas
            interactivos por capas, y se aplica el marco al caso de la banca digital, donde la
            complejidad regulatoria añade una dimensión adicional al diseño informacional.
          </p>
          <div className="bp-keywords">
            <span className="bp-kw-label">Palabras clave:</span>
            {["arquitectura de la información","UX","taxonomía","sistemas de navegación","banca digital","modelos mentales"].map(k=>(
              <span key={k} className="bp-keyword">{k}</span>
            ))}
          </div>
        </div>
      </header>

      {/* ── MAIN ────────────────────────────────────────────── */}
      <main className="bp-main">

        <Fade className="bp-epigraph">
          <blockquote>"Diseñar información no es diseñar píxeles. Es diseñar comprensión."</blockquote>
          <cite>— Principio fundamental de la Arquitectura de la Información</cite>
        </Fade>

        {/* § 1 */}
        <Fade as="section" className="bp-section">
          <div className="bp-section-header">
            <span className="bp-section-num">§ 1</span>
            <h2>El malentendido generalizado</h2>
          </div>
          <div className="bp-two-col">
            <p>Existe una confusión generalizada en equipos de producto, agencias de diseño y áreas de tecnología: creer que la Arquitectura de la Información (AI) es sinónimo de wireframes, menús de navegación o la forma en que se ven los botones en una interfaz.</p>
            <p>La Arquitectura de la Información es, en esencia, la disciplina que define cómo se organiza, etiqueta, relaciona y se hace findable el conocimiento dentro de un sistema. Es anterior al diseño visual y, en muchos casos, más crítica que ambos juntos.</p>
          </div>
        </Fade>

        {/* § 2 — Iceberg */}
        <Fade as="section" className="bp-section bp-section--dark">
          <div className="bp-section-header">
            <span className="bp-section-num bp-section-num--light">§ 2</span>
            <h2 className="bp-h2--light">Lo que los usuarios ven vs. lo que sostiene el sistema</h2>
          </div>
          <p className="bp-p--muted">La metáfora del iceberg es precisa: la parte visible —pantallas, componentes, animaciones— representa apenas el 20 % de lo que constituye una AI funcional. El 80 % restante opera por debajo de la superficie.</p>
          <div className="bp-iceberg-grid">
            <div className="bp-iceberg-card bp-iceberg-card--surface">
              <div className="bp-iceberg-tag">VISIBLE</div>
              <h3>La superficie</h3>
              <ul>{["Navegación y menús","Etiquetas y títulos de secciones","Breadcrumbs y mapas de sitio","Buscadores y filtros","Jerarquía visual en pantalla","Flujos de usuario (user flows)"].map(i=><li key={i}>{i}</li>)}</ul>
            </div>
            <div className="bp-iceberg-card bp-iceberg-card--depth">
              <div className="bp-iceberg-tag">INVISIBLE — PERO ESENCIAL</div>
              <h3>La profundidad</h3>
              <ul>{["Modelos mentales del usuario","Taxonomías y sistemas de clasificación","Ontologías y vocabularios controlados","Metadatos y sistemas de etiquetado","Arquitectura de contenidos y CMS","Sistemas de búsqueda y recuperación","Mapas de contenido y auditorías","Research estratégico (card sorting, tree testing)"].map(i=><li key={i}>{i}</li>)}</ul>
            </div>
          </div>
        </Fade>

        {/* § 3 */}
        <Fade as="section" className="bp-section">
          <div className="bp-section-header">
            <span className="bp-section-num">§ 3</span>
            <h2>Los cuatro sistemas fundamentales</h2>
          </div>
          <p>Morville y Rosenfeld, en su obra seminal <cite>Information Architecture for the World Wide Web</cite>, propusieron que una AI descansa sobre cuatro sistemas interdependientes. Ninguno es opcional.</p>
          <div className="bp-pillars">
            {pillars.map(({n,title,desc})=>(
              <div key={n} className="bp-pillar">
                <span className="bp-pillar-num">{n}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </Fade>

        {/* § 4 */}
        <Fade as="section" className="bp-section">
          <div className="bp-section-header">
            <span className="bp-section-num">§ 4</span>
            <h2>Antes del wireframe, existe la estrategia</h2>
          </div>
          <div className="bp-callout">
            <p>Un arquitecto de información trabaja <strong>antes de que el diseñador abra Figma</strong>. Su entregable no es una pantalla; es un mapa del territorio que todos los demás equipos usarán como brújula.</p>
          </div>
          <div className="bp-two-col">
            <div>
              <h3>Investigación de usuarios como base</h3>
              <p>Card sorting, entrevistas cualitativas y análisis de logs de búsqueda revelan el modelo mental real, no el que el equipo asume. Una taxonomía construida desde dentro de la organización casi siempre falla al usuario.</p>
            </div>
            <div>
              <h3>Auditoría y modelado de contenido</h3>
              <p>La AI requiere entender qué contenido existe, qué relaciones tiene y qué estructura necesita. Un modelo de contenido define tipos, atributos y relaciones antes de que exista una sola página.</p>
            </div>
          </div>
        </Fade>

        {/* § 5 — Figura 1 ───────────────────────────────────── */}
        <Fade as="section" className="bp-section">
          <div className="bp-section-header">
            <span className="bp-section-num">§ 5</span>
            <h2>La AI como sistema vivo</h2>
          </div>
          <p>
            El diagrama a continuación ilustra las tres capas constitutivas de una AI completa.
            Las conexiones animadas muestran cómo cada capa alimenta a la siguiente.
            Haz clic en cualquier nodo para obtener su descripción detallada.
          </p>
          <figure className="bp-figure">
            <LayerDiagram
              layers={LAYERS_AI}
              legend={LEGEND_AI}
              info={INFO_AI}
            />
            <figcaption className="bp-figcaption">
              <strong>Figura 1.</strong> Arquitectura de la Información general — 3 capas
              (UI visible, Sistemas de soporte, Estrategia) con conexiones neon animadas.
              Haz clic en un nodo para obtener descripción detallada.
            </figcaption>
          </figure>
        </Fade>

        {/* § 6 */}
        <Fade as="section" className="bp-section">
          <div className="bp-section-header">
            <span className="bp-section-num">§ 6</span>
            <h2>El costo del descuido</h2>
          </div>
          <p>Los síntomas de una AI deficiente son inmediatos y costosos. Los usuarios no encuentran lo que buscan. El contenido se duplica o se contradice. Los equipos de desarrollo codifican estructuras que luego deben reconstruirse desde cero.</p>
          <div className="bp-callout">
            <p>Estudios de usabilidad consistentemente muestran que <strong>entre el 60 % y el 80 % de los problemas de usabilidad</strong> no son problemas de diseño visual: son problemas de arquitectura de la información. El usuario no entiende <em>dónde está</em>, <em>qué hay aquí</em> o <em>cómo llegar a donde quiere ir</em>.</p>
          </div>
          <div className="bp-two-col">
            <div>
              <h3>El rediseño como síntoma</h3>
              <p>Muchos proyectos de "rediseño" son intentos de resolver problemas de AI con pintura nueva. Se cambia el look and feel pero la estructura subyacente permanece rota. El nuevo sitio se ve mejor pero los usuarios siguen perdidos.</p>
            </div>
            <div>
              <h3>La deuda de información</h3>
              <p>Al igual que la deuda técnica en el código, existe una deuda de información que se acumula con cada decisión sin estructura, cada etiqueta inconsistente, cada categoría creada ad-hoc. Esta deuda no desaparece. Crece.</p>
            </div>
          </div>
        </Fade>

        {/* § 7 — Figura 2 ───────────────────────────────────── */}
        <Fade as="section" className="bp-section">
          <div className="bp-section-header">
            <span className="bp-section-num">§ 7</span>
            <h2>Caso de estudio: la AI de un banco digital</h2>
          </div>
          <p>Un banco no es solo "cuentas y tarjetas". Es uno de los ecosistemas de información más complejos: regulaciones, productos anidados, perfiles de usuario radicalmente distintos y una carga emocional altísima en cada interacción.</p>
          <div className="bp-callout bp-callout--warning">
            <p>En banca, un error de AI no es solo frustración: puede significar que un usuario <strong>no encuentre cómo bloquear su tarjeta robada</strong>, que no entienda en qué producto está firmando, o que abandone una solicitud de crédito a la mitad. Las consecuencias son financieras y legales.</p>
          </div>

          <figure className="bp-figure">
            <LayerDiagram
              layers={LAYERS_BANK}
              legend={LEGEND_BANK}
              info={INFO_BANK}
            />
            <figcaption className="bp-figcaption">
              <strong>Figura 2.</strong> Arquitectura de la Información — Banco digital, 4 capas
              (UI, Productos financieros, Servicios de soporte, Estrategia y cumplimiento).
              La regulación actúa como capa estructural del diseño informacional.
            </figcaption>
          </figure>

          <div className="bp-two-col" style={{ marginTop: "2rem" }}>
            <div>
              <h3>El problema del lenguaje financiero</h3>
              <p>Un banco usa términos como "cuenta de captación", "línea revolvente" o "saldo disponible vs. saldo contable". El usuario busca "cuánto tengo" o "cuánto puedo gastar hoy". El sistema de etiquetado es un campo de minas.</p>
            </div>
            <div>
              <h3>Regulación como capa de la AI</h3>
              <p>En banca, la regulación no es solo un requerimiento legal: es una capa de la arquitectura. KYC, AML y las normativas de CNBV o equivalentes determinan qué información debe recopilarse, cómo etiquetarse y dónde guardarse.</p>
            </div>
          </div>
        </Fade>

        {/* § 8 — Conclusión */}
        <Fade as="section" className="bp-section bp-section--closing">
          <div className="bp-section-header">
            <span className="bp-section-num">§ 8</span>
            <h2>Conclusión</h2>
          </div>
          <p>Cuando la Arquitectura de la Información está bien hecha, los usuarios no la notan. Simplemente encuentran lo que buscan. Se mueven con fluidez. Entienden dónde están y a dónde pueden ir. El sistema responde a su modelo mental, no al contrario.</p>
          <p>Esa invisibilidad no es un fracaso del arquitecto. Es su mayor logro. La próxima vez que un producto se sienta naturalmente intuitivo, recuerde: no es magia del diseño visual. Es trabajo estructural que sucedió mucho antes de que alguien eligiera un color o dibujara un botón.</p>
          <blockquote className="bp-closing-quote">
            La Arquitectura de la Información es la diferencia entre un espacio que la gente{" "}
            <strong>habita con confianza</strong> y uno en el que la gente simplemente{" "}
            <strong>sobrevive con frustración</strong>.
          </blockquote>
        </Fade>

        {/* Bibliografía */}
        <Fade as="section" className="bp-section bp-section--biblio">
          <div className="bp-section-header">
            <span className="bp-section-num">Bib.</span>
            <h2>Bibliografía</h2>
          </div>
          <p className="bp-biblio-note">
            Referencias utilizadas en la elaboración de este ensayo, ordenadas por relevancia temática.
          </p>
          <ol className="bp-biblio-list">
            {[
              { ref:"Morville, P. & Rosenfeld, L.", year:"1998", title:"Information Architecture for the World Wide Web", pub:"O'Reilly Media.", doi:null },
              { ref:"Nielsen, J. & Loranger, H.", year:"2006", title:"Prioritizing Web Usability", pub:"New Riders Press.", doi:null },
              { ref:"Spencer, D.", year:"2010", title:"Card Sorting: Designing Usable Categories", pub:"Rosenfeld Media.", doi:null },
              { ref:"Covert, A.", year:"2014", title:"How to Make Sense of Any Mess", pub:"CreateSpace.", doi:null },
              { ref:"Halverson, T. & Hornbæk, K.", year:"2018", title:"How people navigate large information spaces", pub:"ACM Transactions on Computer-Human Interaction, 25(2), 1–28.", doi:"https://doi.org/10.1145/3173574" },
              { ref:"CNBV", year:"2023", title:"Disposiciones de carácter general aplicables a las instituciones de crédito", pub:"Diario Oficial de la Federación.", doi:null },
              { ref:"Garrett, J. J.", year:"2011", title:"The Elements of User Experience (2nd ed.)", pub:"New Riders Press.", doi:null },
            ].map(({ref,year,title,pub,doi},i)=>(
              <li key={i} className="bp-biblio-item">
                <span className="bp-biblio-num">[{String(i+1).padStart(2,"0")}]</span>
                <span className="bp-biblio-text">
                  <strong>{ref}</strong> ({year}). <em>{title}</em>. {pub}
                  {doi && <> <a href={doi} target="_blank" rel="noopener noreferrer" className="bp-biblio-doi">DOI ↗</a></>}
                </span>
              </li>
            ))}
          </ol>
        </Fade>

      </main>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="bp-footer">
        <span>Arquitectura de la Información</span>
        <span>Diseño de Sistemas · Estrategia UX · 2025</span>
        <span>Vol. 01</span>
      </footer>

    </article>
  );
}