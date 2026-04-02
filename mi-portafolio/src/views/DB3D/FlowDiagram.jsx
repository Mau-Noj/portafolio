import { useState } from 'react';
import './FlowDiagram.css';

const FLOW_STEPS = [
  {
    id: 'client',
    label: 'Cliente',
    sublabel: 'App / ORM',
    icon: '💻',
    color: '#6366f1',
    sql: 'SELECT * FROM orders WHERE customer_id = 42 AND status = "paid"',
    desc: 'La aplicación envía el query SQL al servidor MySQL. Puede venir de un ORM (Sequelize, Hibernate) o directamente por el driver de MySQL.',
    detail: 'El driver abre una conexión TCP al puerto 3306, autentica con usuario/contraseña, y envía el query como un paquete COM_QUERY.',
  },
  {
    id: 'parser',
    label: 'Parser',
    sublabel: 'Sintaxis & AST',
    icon: '📝',
    color: '#f59e0b',
    sql: 'Tokens: SELECT · * · FROM · orders · WHERE · customer_id · = · 42 · AND · status · = · "paid"',
    desc: 'El parser tokeniza el SQL y construye el AST (Abstract Syntax Tree). Si hay error de sintaxis, se rechaza aquí antes de tocar ningún dato.',
    detail: 'Verifica que palabras clave estén en orden, que las comillas estén balanceadas, que los operadores sean válidos. Error 1064 si falla.',
  },
  {
    id: 'preprocessor',
    label: 'Preprocessor',
    sublabel: 'Permisos & Tablas',
    icon: '🔍',
    color: '#ec4899',
    sql: 'CHECK: tabla "orders" existe · columnas customer_id, status existen · usuario tiene SELECT privilege',
    desc: 'Verifica que las tablas y columnas existan en el schema, y que el usuario autenticado tenga los permisos necesarios para acceder a esos datos.',
    detail: 'Consulta information_schema.tables, information_schema.columns. Verifica mysql.user y mysql.db para privileges.',
  },
  {
    id: 'optimizer',
    label: 'Query Optimizer',
    sublabel: 'Plan de ejecución',
    icon: '🧠',
    color: '#f59e0b',
    sql: 'EXPLAIN: type=ref · key=idx_customer_id · rows=12 · Extra=Using where',
    desc: 'El optimizer cost-based analiza estadísticas de la tabla y decide el plan más barato: qué índice usar, en qué orden filtrar, si hacer full scan.',
    detail: 'Estima el costo de cada plan en "cost units". Consulta mysql.innodb_table_stats. Puede ignorar un índice si cree que el full scan es más barato.',
  },
  {
    id: 'executor',
    label: 'Executor',
    sublabel: 'Ejecuta el plan',
    icon: '⚙️',
    color: '#fbbf24',
    sql: 'Recorre idx_customer_id → customer_id=42 → 12 rows encontradas → filtra status="paid" → 3 rows',
    desc: 'El executor implementa el plan del optimizer. Llama al storage engine (InnoDB) para leer páginas, aplica filtros WHERE adicionales y construye el resultado.',
    detail: 'El executor no sabe de índices — solo pide filas al storage engine. Es InnoDB quien navega el B-tree.',
  },
  {
    id: 'innodb',
    label: 'InnoDB Engine',
    sublabel: 'Storage layer',
    icon: '🗄️',
    color: '#22c55e',
    sql: 'B-Tree idx_customer_id → leaf page #4821 → clustered index lookup → pages en buffer pool',
    desc: 'InnoDB navega el B-tree del índice secundario para encontrar los PKs de customer_id=42, luego hace el lookup en el índice clustered para obtener todas las columnas.',
    detail: 'Index secondary → obtiene PKs · Clustered index → obtiene fila completa. Si la página no está en buffer pool, lee del disco (.ibd file).',
  },
  {
    id: 'buffer',
    label: 'Buffer Pool',
    sublabel: 'Cache de páginas',
    icon: '📦',
    color: '#3b82f6',
    sql: 'Page #4821: HIT ✓ (en RAM) · Page #4822: MISS → read 16KB from disk · LRU updated',
    desc: 'El buffer pool es la caché principal. Si la página ya está en RAM (HIT), la latencia es ~100ns. Si es MISS, se lee del disco (~1ms) y se carga en el pool.',
    detail: 'innodb_buffer_pool_size determina cuántas páginas caben. Un pool bien dimensionado tiene >99% hit rate. Usar SHOW STATUS LIKE "Innodb_buffer_pool_read%".',
  },
  {
    id: 'mvcc',
    label: 'MVCC / Snapshot',
    sublabel: 'Control de versiones',
    icon: '📸',
    color: '#a855f7',
    sql: 'READ VIEW: trx_id < 1847 · Fila con trx_id=1850 (otro commit) → no visible · 3 filas válidas',
    desc: 'El Transaction Manager aplica MVCC: filtra versiones de filas según el snapshot de la transacción activa. Las filas modificadas por otras transacciones no confirmadas son invisibles.',
    detail: 'REPEATABLE READ: el snapshot se toma al primer SELECT del transaction. READ COMMITTED: se toma en cada SELECT. El undo log guarda versiones anteriores.',
  },
  {
    id: 'result',
    label: 'Result Set',
    sublabel: 'Respuesta al cliente',
    icon: '✅',
    color: '#10b981',
    sql: '3 rows · customer_id=42 · status="paid" · 2 page reads · 0.38ms · sin acceso a disco extra',
    desc: 'MySQL serializa las 3 filas en el protocolo de respuesta y las envía al cliente por TCP. El query log registra el tiempo si supera long_query_time.',
    detail: 'El resultado viaja en paquetes EOF_Packet + Row_Data. En HTTP, el ORM lo mapea a objetos. SHOW PROFILE muestra el desglose exacto de tiempo por etapa.',
  },
];

export default function FlowDiagram({ onClose }) {
  const [activeStep, setActiveStep] = useState(null);
  const [autoPlay,  setAutoPlay]   = useState(false);

  const stepIdx = activeStep !== null ? FLOW_STEPS.findIndex(s => s.id === activeStep) : -1;
  const active  = stepIdx >= 0 ? FLOW_STEPS[stepIdx] : null;

  const goNext = () => {
    const next = stepIdx < FLOW_STEPS.length - 1 ? stepIdx + 1 : 0;
    setActiveStep(FLOW_STEPS[next].id);
  };
  const goPrev = () => {
    const prev = stepIdx > 0 ? stepIdx - 1 : FLOW_STEPS.length - 1;
    setActiveStep(FLOW_STEPS[prev].id);
  };

  return (
    <div className="flow-overlay">
      {/* Header */}
      <div className="flow-header">
        <div className="flow-header__title">
          <span className="flow-header__badge">FLOW</span>
          Ciclo de vida de un Query SQL en MySQL/InnoDB
        </div>
        <button className="flow-header__close" onClick={onClose}>✕ Cerrar</button>
      </div>

      {/* Pipeline horizontal */}
      <div className="flow-pipeline">
        {FLOW_STEPS.map((step, i) => (
          <div key={step.id} className="flow-pipeline__step-wrap">
            {/* Nodo */}
            <div
              className={`flow-node ${activeStep === step.id ? 'active' : ''} ${activeStep && activeStep !== step.id ? 'dim' : ''}`}
              style={{ '--step-color': step.color }}
              onClick={() => setActiveStep(prev => prev === step.id ? null : step.id)}
            >
              <div className="flow-node__icon">{step.icon}</div>
              <div className="flow-node__label">{step.label}</div>
              <div className="flow-node__sub">{step.sublabel}</div>
              <div className="flow-node__num">{i + 1}</div>
            </div>
            {/* Flecha entre nodos */}
            {i < FLOW_STEPS.length - 1 && (
              <div className={`flow-arrow ${activeStep === step.id ? 'active' : ''}`}
                style={{ '--step-color': step.color }}>
                <div className="flow-arrow__line" />
                <div className="flow-arrow__head" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Detail panel */}
      {active && (
        <div className="flow-detail" style={{ borderColor: active.color + '55' }}>
          <div className="flow-detail__header">
            <span className="flow-detail__icon">{active.icon}</span>
            <div>
              <div className="flow-detail__title" style={{ color: active.color }}>{active.label}</div>
              <div className="flow-detail__sub">{active.sublabel}</div>
            </div>
            <div className="flow-detail__nav">
              <button onClick={goPrev}>←</button>
              <span>{stepIdx + 1} / {FLOW_STEPS.length}</span>
              <button onClick={goNext}>→</button>
            </div>
          </div>

          {/* SQL trace */}
          <div className="flow-detail__sql" style={{ borderLeftColor: active.color }}>
            <span className="flow-detail__sql-label">TRACE</span>
            {active.sql}
          </div>

          <div className="flow-detail__body">
            <p className="flow-detail__desc">{active.desc}</p>
            <div className="flow-detail__detail-box">
              <span className="flow-detail__detail-label">Detalle técnico</span>
              <p className="flow-detail__detail">{active.detail}</p>
            </div>
          </div>
        </div>
      )}

      {!active && (
        <div className="flow-hint">
          Haz clic en cualquier etapa para ver el detalle técnico completo
        </div>
      )}
    </div>
  );
}