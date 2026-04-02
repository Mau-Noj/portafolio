// ─── Paleta InnoDB ───────────────────────────────────────────────────────────
// Buffer Pool  → azul    0x3b82f6 / '#3b82f6'
// B-Tree       → verde   0x22c55e / '#22c55e'
// WAL/Redo     → naranja 0xf97316 / '#f97316'
// Transactions → violeta 0xa855f7 / '#a855f7'
// Dirty pages  → rojo    0xef4444 / '#ef4444'
// Clean pages  → azul    0x60a5fa / '#60a5fa'

// ─── Componentes principales InnoDB ──────────────────────────────────────────
export const DB_COMPONENTS = [
  {
    id: 'disk',
    name: 'Disco / Tablespace',
    short: 'DISK',
    hex: 0x64748b, css: '#64748b', bg: '#1e2535',
    layer: 0,
    desc: 'Almacenamiento persistente. Los datos viven en archivos .ibd (uno por tabla con innodb_file_per_table). Organizado en páginas de 16KB.',
    fn: 'Persistencia de datos, organización en tablespaces, páginas de 16KB, extent de 1MB.',
    details: [
      { label: 'Página', value: '16 KB' },
      { label: 'Extent', value: '1 MB (64 páginas)' },
      { label: 'Formato', value: 'Barracuda (InnoDB)' },
      { label: 'Archivo', value: 'tabla.ibd' },
    ],
    cases: [
      { t: 'innodb_file_per_table', d: 'Cada tabla tiene su propio .ibd. Facilita backups por tabla y recuperación independiente.' },
      { t: 'Página de 16KB', d: 'InnoDB lee/escribe en unidades de 16KB aunque solo necesite 1 fila. El buffer pool cachea páginas completas.' },
    ],
  },
  {
    id: 'buffer',
    name: 'Buffer Pool',
    short: 'BUF',
    hex: 0x3b82f6, css: '#3b82f6', bg: '#0f2544',
    layer: 1,
    desc: 'Caché principal de InnoDB. Almacena páginas de datos e índices en RAM. El parámetro más crítico de tuning: idealmente 70-80% de la RAM disponible.',
    fn: 'Caché de páginas LRU, gestión dirty/clean, read-ahead, adaptive hash index.',
    details: [
      { label: 'Tamaño defecto', value: '128 MB' },
      { label: 'Recomendado', value: '70% de RAM' },
      { label: 'Página', value: '16 KB c/u' },
      { label: 'Política', value: 'LRU modificado' },
    ],
    cases: [
      { t: 'LRU modificado', d: 'InnoDB usa un LRU de dos sublistas: "young" (hot) y "old". Las páginas entran en "old" y suben a "young" si se acceden de nuevo en <1s.' },
      { t: 'Dirty pages', d: 'Una página "dirty" fue modificada en RAM pero no escrita a disco. El proceso de flushing las escribe periódicamente o cuando hay presión de memoria.' },
      { t: 'innodb_buffer_pool_size', d: 'El ajuste más impactante para performance. En un servidor dedicado a MySQL, ponlo en 70-80% de la RAM total.' },
    ],
  },
  {
    id: 'btree',
    name: 'B-Tree Index',
    short: 'IDX',
    hex: 0x22c55e, css: '#22c55e', bg: '#0a2e15',
    layer: 2,
    desc: 'Estructura de datos en árbol B+ que organiza los datos. La PRIMARY KEY en InnoDB ES el B-tree (índice clustered). Todos los demás índices son secundarios.',
    fn: 'Búsqueda O(log n), índice clustered (PK), índices secundarios, range scans.',
    details: [
      { label: 'Tipo', value: 'B+ Tree' },
      { label: 'PK', value: 'Clustered index' },
      { label: 'Altura típica', value: '3–4 niveles' },
      { label: 'Fill factor', value: '15/16 por default' },
    ],
    cases: [
      { t: 'Índice clustered', d: 'La tabla InnoDB NO existe separada del índice. Los datos de cada fila viven en los nodos hoja del B-tree de la PK. SELECT por PK = 0 lookups extra.' },
      { t: 'Índice secundario', d: 'Almacena la columna indexada + el valor de PK. Un SELECT por índice secundario hace 2 recorridos: secundario → encontrar PK → clustered → fila completa.' },
      { t: 'Cardinality', d: 'InnoDB estima cuántos valores únicos hay. El optimizer usa esto para decidir si usar el índice. ANALYZE TABLE actualiza las estadísticas.' },
    ],
  },
  {
    id: 'wal',
    name: 'Redo Log (WAL)',
    short: 'WAL',
    hex: 0xf97316, css: '#f97316', bg: '#2d1200',
    layer: 3,
    desc: 'Write-Ahead Log: antes de modificar datos en disco, InnoDB escribe el cambio en el redo log. Garantiza durabilidad (D de ACID) con mínimas escrituras a disco.',
    fn: 'Durabilidad ACID, crash recovery, group commit, LSN (Log Sequence Number).',
    details: [
      { label: 'Archivos', value: 'ib_logfile0, ib_logfile1' },
      { label: 'Tamaño defecto', value: '48 MB c/u (MySQL 8)' },
      { label: 'Escritura', value: 'Secuencial (rápida)' },
      { label: 'Formato', value: 'Circular (ring buffer)' },
    ],
    cases: [
      { t: 'Crash recovery', d: 'Si MySQL muere antes del checkpoint, al reiniciar reproduce el redo log desde el último checkpoint. Ninguna transacción commiteada se pierde.' },
      { t: 'Group commit', d: 'InnoDB agrupa múltiples commits en una sola escritura fsync al redo log. Reduce I/O sin sacrificar durabilidad.' },
      { t: 'innodb_flush_log_at_trx_commit', d: '1 = fsync en cada commit (ACID completo). 2 = escribe a OS cache, fsync cada 1s. 0 = solo escribe a InnoDB buffer. Performance vs durabilidad.' },
    ],
  },
  {
    id: 'trx',
    name: 'Transaction Manager',
    short: 'TRX',
    hex: 0xa855f7, css: '#a855f7', bg: '#1e0a35',
    layer: 4,
    desc: 'Gestiona el ciclo de vida de las transacciones. Coordina locks, MVCC (Multi-Version Concurrency Control) y el aislamiento entre transacciones concurrentes.',
    fn: 'ACID, MVCC, row-level locking, isolation levels, deadlock detection.',
    details: [
      { label: 'Aislamiento', value: 'REPEATABLE READ' },
      { label: 'Locking', value: 'Row-level' },
      { label: 'MVCC', value: 'Undo log versioning' },
      { label: 'Deadlock', value: 'Detección automática' },
    ],
    cases: [
      { t: 'MVCC', d: 'En lugar de bloquear filas al leer, InnoDB mantiene versiones anteriores en el undo log. Los SELECTs ven una snapshot consistente sin bloquear escrituras.' },
      { t: 'REPEATABLE READ', d: 'El nivel de aislamiento default de InnoDB. Una transacción ve siempre el mismo snapshot desde su BEGIN, aunque otras hagan commits mientras tanto.' },
      { t: 'Deadlock', d: 'Si T1 espera a T2 y T2 espera a T1, InnoDB lo detecta y mata la transacción con menos trabajo acumulado. Error 1213.' },
    ],
  },
  {
    id: 'optimizer',
    name: 'Query Optimizer',
    short: 'OPT',
    hex: 0xf59e0b, css: '#f59e0b', bg: '#2d1f00',
    layer: 5,
    desc: 'El cerebro de MySQL. Recibe el query parseado y decide el plan de ejecución óptimo: qué índices usar, en qué orden hacer JOINs, cuándo hacer full scan.',
    fn: 'Cost-based optimization, estadísticas de tablas, join reordering, index selection.',
    details: [
      { label: 'Tipo', value: 'Cost-based' },
      { label: 'Estadísticas', value: 'information_schema' },
      { label: 'Hint', value: 'FORCE INDEX, STRAIGHT_JOIN' },
      { label: 'Ver plan', value: 'EXPLAIN / EXPLAIN ANALYZE' },
    ],
    cases: [
      { t: 'EXPLAIN', d: 'Muestra el plan: tipo de acceso (ALL, ref, range, const), índice elegido, rows estimadas. type=ALL es un full scan — casi siempre hay que añadir un índice.' },
      { t: 'Selectividad', d: 'El optimizer elige un índice si filtra suficientes filas. Un índice en columna booleana (0/1) raramente se usa porque retorna ~50% de filas.' },
      { t: 'Join reordering', d: 'MySQL prueba permutaciones de tablas en JOIN para encontrar el orden más barato. Con más de 7 tablas, usa heurísticas.' },
    ],
  },
];

// ─── Modos de visualización ───────────────────────────────────────────────────
export const DB_MODES = [
  { id: 'architecture', label: 'Arquitectura',   icon: 'ARCH' },
  { id: 'query',        label: 'Query Execution', icon: 'SQL'  },
  { id: 'transaction',  label: 'Transacciones',  icon: 'TRX'  },
  { id: 'indexscan',    label: 'Index vs Scan',   icon: 'IDX'  },
  { id: 'flow',         label: 'Flujo SQL',       icon: 'FLOW' },
];

// ─── Pasos: Query Execution ───────────────────────────────────────────────────
export const QUERY_STEPS = [
  {
    component: 'optimizer',
    title: 'Parser',
    sql: 'SELECT * FROM orders WHERE customer_id = 42',
    txt: 'El parser tokeniza el SQL y construye el AST (Abstract Syntax Tree). Detecta errores de sintaxis antes de cualquier ejecución.',
    highlight: 'optimizer',
  },
  {
    component: 'optimizer',
    title: 'Optimizer — elige el plan',
    sql: 'EXPLAIN → type: ref, key: idx_customer_id, rows: 12',
    txt: 'El optimizer consulta estadísticas. Hay un índice en customer_id con alta cardinality → decide usar el B-tree en lugar de full scan.',
    highlight: 'optimizer',
  },
  {
    component: 'btree',
    title: 'B-Tree traversal',
    sql: 'Root → Branch (42 > 30) → Leaf page #4821',
    txt: 'El executor recorre el B-tree: 3 niveles, 3 page reads. Encuentra el puntero a las filas con customer_id = 42 en la página hoja.',
    highlight: 'btree',
  },
  {
    component: 'buffer',
    title: 'Buffer Pool lookup',
    sql: 'Page #4821 → HIT en buffer pool',
    txt: 'El executor busca la página #4821 en el buffer pool. CACHE HIT: la página ya estaba en RAM. 0 lecturas a disco. Latencia: ~100ns.',
    highlight: 'buffer',
  },
  {
    component: 'disk',
    title: 'Disk read (si miss)',
    sql: 'Page #4821 → MISS → read from .ibd',
    txt: 'Si no hubiera estado en buffer pool: lectura de 16KB desde disco (~1ms), carga en buffer pool (desaloja página LRU si está lleno).',
    highlight: 'disk',
  },
  {
    component: 'trx',
    title: 'MVCC snapshot',
    sql: 'READ VIEW: ver solo filas commiteadas antes de BEGIN',
    txt: 'El transaction manager aplica MVCC: filtra versiones de filas según el snapshot de la transacción actual. Filas modificadas por otras TRX no se ven.',
    highlight: 'trx',
  },
  {
    component: 'optimizer',
    title: 'Resultado',
    sql: '12 rows returned — 3 page reads — 0.4ms',
    txt: 'Se retornan 12 filas al cliente. El índice evitó leer las 50,000 páginas de la tabla completa. Query log si > long_query_time.',
    highlight: null,
  },
];

// ─── Pasos: Transacción ACID ──────────────────────────────────────────────────
export const TRX_STEPS = [
  {
    component: 'trx',
    title: 'BEGIN',
    sql: 'BEGIN; -- o START TRANSACTION',
    txt: 'InnoDB asigna un transaction ID (TRX_ID). Se toma un READ VIEW snapshot para MVCC. Aún no hay locks activos.',
    phase: 'start',
  },
  {
    component: 'optimizer',
    title: 'SELECT (con lock)',
    sql: 'SELECT balance FROM accounts WHERE id=1 FOR UPDATE',
    txt: 'FOR UPDATE adquiere un row-level exclusive lock sobre la fila. Otras transacciones que intenten modificar esta fila quedarán en espera.',
    phase: 'read',
  },
  {
    component: 'buffer',
    title: 'UPDATE — modifica buffer',
    sql: 'UPDATE accounts SET balance = balance - 100 WHERE id=1',
    txt: 'La modificación ocurre en el buffer pool (RAM). La página se marca "dirty". El dato antiguo se guarda en el undo log para ROLLBACK y MVCC.',
    phase: 'write',
  },
  {
    component: 'wal',
    title: 'Redo log — WAL',
    sql: 'Escribe change record en ib_logfile0 (secuencial)',
    txt: 'Antes de confirmar, InnoDB escribe el cambio en el redo log. Escritura secuencial = muy rápida. Si hay crash aquí, el cambio puede recuperarse.',
    phase: 'wal',
  },
  {
    component: 'trx',
    title: 'COMMIT',
    sql: 'COMMIT; -- fsync al redo log',
    txt: 'Con innodb_flush_log_at_trx_commit=1: fsync garantiza que el redo log está en disco. La transacción es durable. Se liberan todos los locks.',
    phase: 'commit',
  },
  {
    component: 'disk',
    title: 'Checkpoint — flush a disco',
    sql: 'Dirty pages → .ibd (asíncrono, background)',
    txt: 'El proceso de checkpoint escribe las dirty pages del buffer pool al tablespace en disco. Ocurre en background, no bloquea las transacciones.',
    phase: 'flush',
  },
];

// ─── Pasos: Index vs Full Scan ────────────────────────────────────────────────
export const SCAN_STEPS = [
  {
    type: 'index',
    title: 'Index Scan — con índice',
    sql: 'SELECT * FROM orders WHERE customer_id = 42',
    txt: 'customer_id tiene índice. El optimizer elige B-tree traversal.',
    pages: 3,
    totalPages: 50000,
    time: '0.4 ms',
  },
  {
    type: 'full',
    title: 'Full Table Scan — sin índice',
    sql: 'SELECT * FROM orders WHERE notes LIKE "%urgent%"',
    txt: 'notes no tiene índice. MySQL lee TODAS las páginas de la tabla.',
    pages: 50000,
    totalPages: 50000,
    time: '3,200 ms',
  },
  {
    type: 'index',
    title: 'Covering Index',
    sql: 'SELECT customer_id, total FROM orders WHERE customer_id = 42',
    txt: 'El índice cubre todas las columnas del SELECT. 0 lookups al clustered index.',
    pages: 2,
    totalPages: 50000,
    time: '0.1 ms',
  },
  {
    type: 'full',
    title: 'Full Scan inevitable',
    sql: 'SELECT COUNT(*) FROM orders',
    txt: 'Sin WHERE. MySQL puede usar el índice más pequeño pero lee todo.',
    pages: 50000,
    totalPages: 50000,
    time: '1,100 ms',
  },
];

// ─── Dispositivos por componente (para Three.js) ─────────────────────────────
export const DB_DEVICES = [
  // Disco
  { name: 'Tablespace',   type: 'disk',    layer: 0, pos: [-3.5, 0,  0],   color: 0x64748b },
  { name: 'Data File',    type: 'datafile',layer: 0, pos: [3.5,  0,  0],   color: 0x64748b },
  { name: 'Ibdata1',      type: 'datafile',layer: 0, pos: [0,    0,  2.5], color: 0x475569 },
  // Buffer Pool
  { name: 'Clean Pages',  type: 'cleanpg', layer: 1, pos: [-3.5, 0,  0.5], color: 0x60a5fa },
  { name: 'Dirty Pages',  type: 'dirtypg', layer: 1, pos: [3.5,  0,  0.5], color: 0xef4444 },
  { name: 'LRU List',     type: 'lru',     layer: 1, pos: [0,    0, -1],   color: 0x3b82f6 },
  // B-Tree
  { name: 'Root Node',    type: 'btroot',  layer: 2, pos: [0,    0,  0],   color: 0x22c55e },
  { name: 'Leaf Pages',   type: 'btleaf',  layer: 2, pos: [-3,   0,  1.5], color: 0x16a34a },
  { name: 'Secondary Idx',type: 'btleaf',  layer: 2, pos: [3,    0,  1.5], color: 0x4ade80 },
  // WAL
  { name: 'ib_logfile0',  type: 'logfile', layer: 3, pos: [-3,   0,  0],   color: 0xf97316 },
  { name: 'ib_logfile1',  type: 'logfile', layer: 3, pos: [3,    0,  0],   color: 0xea580c },
  { name: 'Log Buffer',   type: 'logbuf',  layer: 3, pos: [0,    0,  2],   color: 0xfb923c },
  // Transaction
  { name: 'Active TRX',   type: 'trxobj',  layer: 4, pos: [-3.5, 0,  0],   color: 0xa855f7 },
  { name: 'Undo Log',     type: 'undolog', layer: 4, pos: [3.5,  0,  0],   color: 0x9333ea },
  { name: 'Lock Manager', type: 'lockobj', layer: 4, pos: [0,    0,  2],   color: 0xc084fc },
  // Optimizer
  { name: 'Parser',       type: 'parser',  layer: 5, pos: [-3,   0,  0],   color: 0xf59e0b },
  { name: 'Planner',      type: 'planner', layer: 5, pos: [0,    0,  0],   color: 0xd97706 },
  { name: 'Executor',     type: 'executor',layer: 5, pos: [3,    0,  0],   color: 0xfbbf24 },
];

export const DB_CABLE_CONNS = [
  [0,1],[1,2],[3,4],[3,5],[4,5],
  [6,7],[6,8],[3,6],[9,10],[10,11],
  [12,13],[12,14],[15,16],[16,17],
  [6,3],[11,3],[17,6],[17,12],
];  