// src/models/materials.data.jsx
import React from 'react';

export const materials = [
  {
    id: 1,
    type: "article",
    title: "Entendiendo los Casos de Uso",
    description: (
      <>
        Antes de programar… 
        <br /> 
        ¡respira y analiza!
        <br /> 
        Domina los casos de uso y evita el clásico “eso no era lo que quería el cliente”.
      </>
    ),
    thumbnail: "/modela_comportamiento.png", 
    tags: ["Análisis", "UML", "Ingeniería"],
    content: (
      <>
        {/* =================================================================
            1. SECCIÓN VISUAL (NUEVO DISEÑO)
           ================================================================= */}
        
        {/* HERO SECTION */}
        <div style={{ 
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', 
          padding: '25px', 
          borderRadius: '16px', 
          marginBottom: '30px', 
          borderLeft: '6px solid #2563eb',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ color: '#1e40af', margin: '0 0 10px 0', fontSize: '1.8rem', fontWeight: '800' }}>
            8. Modelado de Comportamiento
          </h2>
          <p style={{ margin: 0, color: '#3b82f6', fontSize: '1.2rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>🫀</span> La "Fisiología" del Sistema
          </p>
          <div style={{ marginTop: '15px', color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
            <p>
              Imagina el sistema como una caja negra. No nos importa los cables de adentro (código), 
              sino <strong>quién la toca</strong> y <strong>qué hace</strong> la caja cuando la tocan.
            </p>
          </div>
        </div>

        {/* TARJETAS DE CONCEPTO */}
        <h3 style={{ textAlign: 'center', color: '#334155', marginBottom: '20px', fontSize: '1.4rem' }}>
          ¿Qué es realmente este diagrama?
        </h3>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '20px', 
          marginBottom: '40px' 
        }}>
          
          {/* TARJETA 1: Interacción */}
          <div style={{ 
            background: 'white', padding: '20px', borderRadius: '12px', 
            borderTop: '4px solid #8b5cf6', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🔄</div>
            <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Interacción Pura</h4>
            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.5' }}>
              Ilustra cómo el sistema <strong>interactúa</strong> con entidades externas (actores) para lograr objetivos. 
              Es un diagrama de <em>comportamiento</em>.
            </p>
          </div>

          {/* TARJETA 2: Requisitos */}
          <div style={{ 
            background: 'white', padding: '20px', borderRadius: '12px', 
            borderTop: '4px solid #ec4899', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📋</div>
            <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Requisitos Funcionales</h4>
            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.5' }}>
              Se usa para capturar y visualizar los <strong>requisitos funcionales</strong>. 
              Es básicamente el contrato de "qué cosas debe hacer el software".
            </p>
          </div>

          {/* TARJETA 3: Límites */}
          <div style={{ 
            background: 'white', padding: '20px', borderRadius: '12px', 
            borderTop: '4px solid #10b981', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🚧</div>
            <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Límites del Sistema</h4>
            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.5' }}>
              Establece una frontera clara: 
              <strong> Adentro</strong> está lo que programamos, 
              <strong> Afuera</strong> están los actores que lo usan.
            </p>
          </div>
        </div>

        {/* =================================================================
            2. CONTENIDO TÉCNICO DETALLADO (LO QUE YA TENÍAMOS)
           ================================================================= */}
        
        <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', color: '#333' }}>
          Elementos Clave de los Casos de Uso
        </h3>

        {/* 1. DEFINICIÓN DEL CASO DE USO */}
        <h4>1. El Caso de Uso (El Óvalo)</h4>
        <p>
          Los casos de uso son <strong>funcionalidades individuales</strong> o características específicas del sistema. 
          Describen el comportamiento de un sistema o cómo responde a una acción externa.
        </p>
        <p>
          Cada caso de uso está asociado a uno o varios actores, indicando quién puede iniciarlo o participar en él.
        </p>
        
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/db/Use_case_symbol.svg/1200px-Use_case_symbol.svg.png" 
            alt="Símbolo de Caso de Uso" 
            style={{ width: '150px', border: '1px dashed #ccc', padding: '10px' }} 
          />
          <p style={{ fontSize: '0.8rem', color: '#666' }}>Representación gráfica: Un óvalo con el nombre de la acción (verbo + sustantivo).</p>
        </div>

        {/* 2. ACTORES */}
        <h4>2. Actores</h4>
        <p>
          Representan entidades externas que interactúan con el sistema. Pueden ser personas, 
          otros sistemas de software o dispositivos de hardware.
        </p>
        <div style={{ textAlign: 'center', margin: '15px 0' }}>
           <img 
              src="https://cdn-icons-png.flaticon.com/512/1256/1256650.png" 
              alt="Actor Stickman" 
              style={{ width: '60px' }} 
           />
        </div>

        {/* 3. RELACIONES */}
        <h3 style={{ marginTop: '30px', borderBottom: '1px solid #ddd', paddingBottom: '10px', color: '#333' }}>
          3. Relaciones (El Pegamento)
        </h3>

        {/* ASOCIACIÓN */}
        <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#2563eb' }}>A. Asociación (Comunicación)</h4>
          <p>
            Es una <strong>línea recta continua</strong> que conecta a un actor con un caso de uso.
            Muestra que el actor está asociado con ese caso de uso y representa un enlace de comunicación. 
          </p>
          <div style={{ borderLeft: '4px solid #2563eb', paddingLeft: '10px', margin: '10px 0' }}>
            <em>Visualmente: 👤 ───── ⬭</em>
          </div>
        </div>

        {/* GENERALIZACIÓN */}
        <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#2563eb' }}>B. Generalización (Herencia)</h4>
          <p>
            Se muestra como una línea continua con una <strong>flecha triangular hueca</strong> que va del caso específico al general.
            Ilustra que el caso específico hereda el comportamiento y atributos del general.
          </p>
          <ul>
            <li>El caso <strong>hijo</strong> hereda el comportamiento y significado del caso padre.</li>
            <li>El hijo puede añadir o redefinir el comportamiento del padre.</li>
          </ul>
          
          <div className="article-highlight" style={{ backgroundColor: '#e0f2fe', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
            <strong>⚠️ Importante:</strong> La generalización puede aplicarse no solo a casos de uso, 
            sino <strong>también a los Actores</strong> (ej: "Gerente" hereda de "Empleado").
          </div>
        </div>

        {/* INCLUDE */}
        <div style={{ background: '#fff3cd', padding: '15px', borderRadius: '8px', marginBottom: '15px', border: '1px solid #ffeeba' }}>
          <h4 style={{ color: '#856404', margin: '0 0 10px 0' }}>C. Include (&lt;&lt;include&gt;&gt;) - Obligatorio</h4>
          <p>
            Indica que un caso de uso <strong>incluye</strong> la funcionalidad de otro. Se utiliza para representar 
            comportamientos comunes o compartidos.
          </p>
          <ul>
            <li>Se usa para evitar describir el mismo flujo repetidas veces.</li>
            <li>Ocurre en <strong>condiciones normales o esperadas</strong>.</li>
            <li>Forma parte del flujo principal (no se puede omitir).</li>
          </ul>
          <div style={{ textAlign: 'center', fontStyle: 'italic', color: '#666', marginTop: '10px' }}>
            (Caso Base) ── &lt;&lt;include&gt;&gt; ──&gt; (Caso Incluido)
          </div>
        </div>

        {/* EXTEND */}
        <div style={{ background: '#d1e7dd', padding: '15px', borderRadius: '8px', marginBottom: '15px', border: '1px solid #badbcc' }}>
          <h4 style={{ color: '#0f5132', margin: '0 0 10px 0' }}>D. Extend (&lt;&lt;extend&gt;&gt;) - Opcional</h4>
          <p>
            Indica que un caso de uso <strong>amplía</strong> el comportamiento de otro en determinadas condiciones.
          </p>
          <ul>
            <li>Se utiliza para comportamientos <strong>opcionales</strong>.</li>
            <li>Ocurre solo en circunstancias específicas (como errores o menús extra).</li>
            <li>Es un caso que "hace un poco más" que el original.</li>
          </ul>
          <div style={{ textAlign: 'center', fontStyle: 'italic', color: '#666', marginTop: '10px' }}>
            (Caso Extendido) &lt;── &lt;&lt;extend&gt;&gt; ── (Caso Base)
          </div>
        </div>

        {/* NOTA FINAL DE ARQUITECTURA */}
        <div style={{ marginTop: '30px', padding: '20px', border: '2px solid #333', borderRadius: '10px', backgroundColor: '#2d3748', color: 'white' }}>
          <h4 style={{ color: '#fbbf24', marginTop: 0 }}>💡 Nota de Arquitectura</h4>
          <p style={{ marginBottom: 0 }}>
            En un paradigma orientado a objetos, <strong>todo caso de uso se traducirá en un método</strong> 
            (o una serie de métodos), pero <strong>no necesariamente todo método es un caso de uso</strong>. 
            Los casos de uso representan valor para el usuario, los métodos pueden ser lógica interna.
          </p>
        </div>
      </>
    )
  },
  
  // --- OTROS ARTÍCULOS O RECURSOS ---
  {
    id: 2,
    type: "download",
    title: "Plantilla SRS (Requerimientos)",
    description: "Formato estándar IEEE 830 para documentación de software.",
    thumbnail: "https://cdn-icons-png.flaticon.com/512/337/337946.png",
    tags: ["Documentación", "IEEE"],
    url: "https://docs.google.com/document/u/0/" 
  }
];