export const OSI_LAYERS = [
  {
    n: 1, name: 'Física', pdu: 'Bit', icon: '⚡',
    hex: 0xf472b6, css: '#f472b6', bg: '#3d0f2e',
    desc: 'Transmite bits crudos por el medio físico. Define voltajes, frecuencias, tipos de cable y conectores. No interpreta datos.',
    fn: 'Codificación de bits, modulación de señales, topologías físicas, anchos de banda y distancias máximas.',
    protos: ['Ethernet (físico)', 'Wi-Fi RF', 'DSL', 'SONET', 'USB', 'RS-232', 'Fibra óptica'],
    devs: ['Hubs', 'Repetidores', 'Cables UTP', 'Fibra', 'Antenas'],
    cases: [
      { t: 'Cable UTP Cat6', d: 'Transmite 10 Gbps a 55m. Los 4 pares trenzados reducen interferencia electromagnética.' },
      { t: 'Fibra submarina', d: 'Cables en el fondo del océano conectan continentes. Un cable puede transportar 400 Tbps de datos.' },
      { t: 'Wi-Fi 6 (802.11ax)', d: 'Señales de radio en 5GHz. OFDMA envía datos a múltiples dispositivos simultáneamente.' },
    ],
    diag: '<svg viewBox="0 0 320 100" xmlns="http://www.w3.org/2000/svg"><polyline points="10,50 30,50 35,20 45,80 55,20 65,80 75,50 130,50" stroke="#f472b6" stroke-width="2" fill="none"/><text x="160" y="35" fill="#f472b6" font-size="10" font-family="monospace">1 = +5V</text><text x="160" y="55" fill="#f472b6" font-size="10" font-family="monospace">0 = 0V</text><text x="160" y="75" fill="#888" font-size="9">Senal electrica</text><rect x="240" y="30" width="70" height="40" rx="4" fill="#3d0f2e" stroke="#f472b6"/><text x="275" y="54" text-anchor="middle" fill="#f472b6" font-size="9">01101001</text></svg>',
  },
  {
    n: 2, name: 'Enlace de datos', pdu: 'Trama', icon: '🔗',
    hex: 0xfb923c, css: '#fb923c', bg: '#3d1500',
    desc: 'Transferencia fiable entre nodos adyacentes. Detecta/corrige errores de capa física. Controla acceso al medio compartido.',
    fn: 'Enmarcado (framing), control acceso medio MAC, detección errores CRC, control flujo local.',
    protos: ['Ethernet 802.3', 'Wi-Fi 802.11', 'PPP', 'HDLC', 'STP', 'VLAN 802.1Q', 'ARP'],
    devs: ['Switches', 'Bridges', 'NIC (tarjeta de red)'],
    cases: [
      { t: 'Switch Ethernet', d: 'Lee MACs de destino y envía la trama al puerto correcto, no a todos. Aprende la tabla MAC automáticamente.' },
      { t: 'CSMA/CA en Wi-Fi', d: 'Antes de transmitir escucha el canal. Si está ocupado, espera tiempo aleatorio. Evita colisiones en el aire.' },
      { t: 'CRC — Detección errores', d: '4 bytes al final de cada trama. Si un bit se corrompe en el cable, el CRC lo detecta y la trama se descarta.' },
    ],
    diag: '<svg viewBox="0 0 320 110" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="30" width="35" height="50" rx="3" fill="#3d1500" stroke="#fb923c"/><text x="22" y="52" text-anchor="middle" fill="#fb923c" font-size="8">PRE</text><text x="22" y="70" text-anchor="middle" fill="#888" font-size="7">8B</text><rect x="44" y="30" width="50" height="50" rx="3" fill="#3d1500" stroke="#fb923c"/><text x="69" y="52" text-anchor="middle" fill="#fb923c" font-size="8">DST MAC</text><text x="69" y="70" text-anchor="middle" fill="#888" font-size="7">6 bytes</text><rect x="98" y="30" width="50" height="50" rx="3" fill="#3d1500" stroke="#fb923c"/><text x="123" y="52" text-anchor="middle" fill="#fb923c" font-size="8">SRC MAC</text><text x="123" y="70" text-anchor="middle" fill="#888" font-size="7">6 bytes</text><rect x="152" y="30" width="90" height="50" rx="3" fill-opacity="0.12" fill="#fb923c" stroke="#fb923c"/><text x="197" y="52" text-anchor="middle" fill="#fb923c" font-size="9">DATOS</text><text x="197" y="68" text-anchor="middle" fill="#888" font-size="7">46-1500 bytes</text><rect x="246" y="30" width="50" height="50" rx="3" fill="#3d1500" stroke="#ff4444"/><text x="271" y="52" text-anchor="middle" fill="#ff4444" font-size="8">CRC</text><text x="271" y="70" text-anchor="middle" fill="#888" font-size="7">4B</text><text x="160" y="100" text-anchor="middle" fill="#888" font-size="9">Estructura trama Ethernet</text></svg>',
  },
  {
    n: 3, name: 'Red', pdu: 'Paquete', icon: '🗺️',
    hex: 0xfbbf24, css: '#fbbf24', bg: '#3d2800',
    desc: 'Determina la ruta óptima entre redes. Opera con direcciones lógicas IP. Es la capa de los routers y el enrutamiento dinámico.',
    fn: 'Enrutamiento entre redes, direccionamiento lógico IP, fragmentación de paquetes, TTL anti-loops.',
    protos: ['IPv4', 'IPv6', 'ICMP', 'OSPF', 'BGP', 'RIP', 'ARP', 'IPsec'],
    devs: ['Routers', 'Switches L3', 'Firewalls de red'],
    cases: [
      { t: 'Enrutamiento BGP', d: 'Un paquete de Guatemala a Tokio pasa por 15-20 routers. BGP coordina rutas entre ~70,000 sistemas autónomos.' },
      { t: 'ping y traceroute', d: 'ICMP de capa 3. traceroute revela cada router en el camino con sus latencias. Herramienta fundamental de diagnóstico.' },
      { t: 'NAT — IP compartida', d: 'Tu router traduce IP privada 192.168.x.x a IP publica del ISP. 20 dispositivos comparten una sola IP de Internet.' },
    ],
    diag: '<svg viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="60" r="28" fill="#3d2800" stroke="#fbbf24"/><text x="50" y="55" text-anchor="middle" fill="#fbbf24" font-size="12">PC</text><text x="50" y="75" text-anchor="middle" fill="#888" font-size="8">192.168.1.5</text><circle cx="160" cy="35" r="22" fill="#3d2800" stroke="#fbbf24" stroke-width="1.5"/><text x="160" y="30" text-anchor="middle" fill="#fbbf24" font-size="9">RTR</text><text x="160" y="48" text-anchor="middle" fill="#888" font-size="8">Router</text><circle cx="160" cy="90" r="22" fill="#3d2800" stroke="#fbbf24" stroke-width="1.5"/><text x="160" y="85" text-anchor="middle" fill="#fbbf24" font-size="9">BGP</text><text x="160" y="103" text-anchor="middle" fill="#888" font-size="8">Backbone</text><circle cx="270" cy="60" r="28" fill="#3d2800" stroke="#fbbf24"/><text x="270" y="55" text-anchor="middle" fill="#fbbf24" font-size="12">SRV</text><text x="270" y="75" text-anchor="middle" fill="#888" font-size="8">203.0.113.42</text><line x1="78" y1="50" x2="138" y2="42" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4 2"/><line x1="160" y1="57" x2="160" y2="68" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4 2"/><line x1="182" y1="80" x2="242" y2="68" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4 2"/></svg>',
  },
  {
    n: 4, name: 'Transporte', pdu: 'Segmento', icon: '📦',
    hex: 0x34d399, css: '#34d399', bg: '#0a3328',
    desc: 'Comunicación extremo a extremo. Con TCP garantiza entrega; con UDP prioriza velocidad. Divide datos en segmentos numerados.',
    fn: 'Segmentación, control de flujo con ventana deslizante, control de errores, retransmisión, multiplexación de puertos.',
    protos: ['TCP', 'UDP', 'SCTP', 'QUIC'],
    devs: ['Firewalls stateful', 'Load balancers L4', 'Proxies TCP'],
    cases: [
      { t: 'TCP — Three-way handshake', d: 'SYN - SYN-ACK - ACK. Antes de transferir datos, TCP confirma que ambos extremos estan listos.' },
      { t: 'UDP en gaming online', d: 'Los FPS envían posición del jugador 60x/seg con UDP. Frames perdidos se descartan. Velocidad > perfección.' },
      { t: 'QUIC (HTTP/3)', d: 'Google creó QUIC sobre UDP. Implementa confiabilidad en app layer, eliminando latencia del handshake TLS+TCP separados.' },
    ],
    diag: '<svg viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="140" height="100" rx="6" fill="#0a3328" stroke="#34d399"/><text x="80" y="30" text-anchor="middle" fill="#34d399" font-size="11" font-weight="bold">TCP</text><text x="80" y="50" text-anchor="middle" fill="#34d399" font-size="9">SYN - SYN-ACK - ACK</text><text x="80" y="68" text-anchor="middle" fill="#888" font-size="9">ACK por segmento</text><text x="80" y="86" text-anchor="middle" fill="#888" font-size="9">Retransmision si falla</text><text x="80" y="102" text-anchor="middle" fill="#34d399" font-size="10">Fiable</text><rect x="170" y="10" width="140" height="100" rx="6" fill="#3d2800" stroke="#fbbf24"/><text x="240" y="30" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold">UDP</text><text x="240" y="50" text-anchor="middle" fill="#fbbf24" font-size="9">Sin handshake</text><text x="240" y="68" text-anchor="middle" fill="#888" font-size="9">Dispara y olvida</text><text x="240" y="86" text-anchor="middle" fill="#888" font-size="9">Sin confirmacion</text><text x="240" y="102" text-anchor="middle" fill="#fbbf24" font-size="10">Rapido</text></svg>',
  },
  {
    n: 5, name: 'Sesión', pdu: 'Datos', icon: '🤝',
    hex: 0x38bdf8, css: '#38bdf8', bg: '#0c3352',
    desc: 'Gestiona el diálogo entre aplicaciones. Establece, mantiene y termina sesiones. Implementa puntos de control para recuperación.',
    fn: 'Control de sesión (open/close), checkpoints de sincronización, control de diálogo simplex/half/full-duplex.',
    protos: ['NetBIOS', 'RPC', 'PPTP', 'L2TP', 'SIP', 'NFS', 'SQL sesión'],
    devs: ['Servidores aplicación', 'Gateways VPN'],
    cases: [
      { t: 'Videollamada con corte', d: 'Si pierdes señal 2 segundos, la sesión se reanuda automáticamente gracias a los checkpoints de la Capa 5.' },
      { t: 'Timeout bancario', d: 'El timeout de sesión (15 min sin actividad) es gestionado por Capa 5. Protege tu cuenta si te olvidas de cerrar.' },
      { t: 'RPC — Llamadas remotas', d: 'Un servidor ejecuta funciones en otra máquina remota como si fueran locales, usando RPC sobre la capa de sesión.' },
    ],
    diag: '<svg viewBox="0 0 320 110" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="15" width="90" height="80" rx="6" fill="#0c3352" stroke="#38bdf8"/><text x="55" y="35" text-anchor="middle" fill="#38bdf8" font-size="10">Cliente</text><line x1="100" y1="42" x2="218" y2="42" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="5 3"/><line x1="218" y1="62" x2="100" y2="62" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="5 3"/><line x1="100" y1="82" x2="218" y2="82" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="5 3"/><text x="159" y="37" text-anchor="middle" fill="#888" font-size="8">SYN</text><text x="159" y="57" text-anchor="middle" fill="#888" font-size="8">ACK</text><text x="159" y="77" text-anchor="middle" fill="#888" font-size="8">FIN</text><rect x="220" y="15" width="90" height="80" rx="6" fill="#0c3352" stroke="#38bdf8"/><text x="265" y="35" text-anchor="middle" fill="#38bdf8" font-size="10">Servidor</text></svg>',
  },
  {
    n: 6, name: 'Presentación', pdu: 'Datos', icon: '🔐',
    hex: 0x818cf8, css: '#818cf8', bg: '#1e2050',
    desc: 'Traductor de la red. Convierte datos entre formato de aplicación y formato estándar de red. Cifrado, compresión y codificación.',
    fn: 'Traducción de formatos, cifrado/descifrado TLS, compresión gzip, codificación ASCII/UTF-8/EBCDIC.',
    protos: ['SSL/TLS', 'MIME', 'JPEG', 'PNG', 'GIF', 'ASCII', 'EBCDIC', 'XDR', 'ASN.1'],
    devs: ['Gateways SSL', 'Servidores cifrado'],
    cases: [
      { t: 'HTTPS y TLS 1.3', d: 'El candado verde de tu navegador indica que TLS activo cifra todos los datos. Sin él, cualquiera en la red vería tus datos.' },
      { t: 'Compresión de imágenes', d: 'JPEG comprime fotos hasta 10x. PNG usa compresión sin pérdida. La Capa 6 define cómo se transmiten visualmente.' },
      { t: 'Codificación UTF-8', d: 'UTF-8 soporta todos los idiomas del mundo en un estándar universal. ASCII solo cubre 128 caracteres en inglés.' },
    ],
    diag: '<svg viewBox="0 0 320 100" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="20" width="70" height="60" rx="4" fill="#1e2050" stroke="#818cf8"/><text x="45" y="45" text-anchor="middle" fill="#818cf8" font-size="10">Texto</text><text x="45" y="62" text-anchor="middle" fill="#888" font-size="9">Hola</text><path d="M80 50 L120 50" stroke="#818cf8" stroke-width="1.5" fill="none"/><rect x="120" y="20" width="80" height="60" rx="4" fill="#1e2050" stroke="#818cf8" stroke-width="1.5"/><text x="160" y="42" text-anchor="middle" fill="#818cf8" font-size="10">TLS</text><text x="160" y="58" text-anchor="middle" fill="#888" font-size="8">AES-256</text><text x="160" y="72" text-anchor="middle" fill="#888" font-size="8">gzip</text><path d="M200 50 L240 50" stroke="#818cf8" stroke-width="1.5" fill="none"/><rect x="240" y="20" width="70" height="60" rx="4" fill="#1e2050" stroke="#818cf8"/><text x="275" y="45" text-anchor="middle" fill="#818cf8" font-size="10">Cifrado</text><text x="275" y="62" text-anchor="middle" fill="#888" font-size="9">Xk#9@!</text></svg>',
  },
  {
    n: 7, name: 'Aplicación', pdu: 'Datos', icon: '🌐',
    hex: 0xa78bfa, css: '#a78bfa', bg: '#2d1f5e',
    desc: 'Capa más cercana al usuario. Proporciona servicios de red directamente a las aplicaciones. No es la app sino los protocolos que usa.',
    fn: 'Interfaz entre software de usuario y red. Autenticación, privacidad, identificación, corrección de errores de alto nivel.',
    protos: ['HTTP', 'HTTPS', 'FTP', 'SMTP', 'DNS', 'SSH', 'Telnet', 'SNMP', 'POP3', 'IMAP', 'DHCP'],
    devs: ['Servidores web', 'Clientes email', 'Navegadores', 'DNS servers'],
    cases: [
      { t: 'HTTP/2 — Web moderna', d: 'HTTP/2 multiplexing permite múltiples peticiones simultáneas sobre una sola conexión TCP.' },
      { t: 'DNS — El directorio de Internet', d: 'Antes de conectar a google.com, DNS traduce el nombre a una IP. Consulta raiz - .com - google.com en milisegundos.' },
      { t: 'SSH — Terminal remoto seguro', d: 'SSH cifra toda la comunicación. Reemplazó a Telnet que enviaba usuario y contraseña en texto plano.' },
    ],
    diag: '<svg viewBox="0 0 320 100" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="10" width="70" height="40" rx="4" fill="#2d1f5e" stroke="#a78bfa"/><text x="40" y="28" text-anchor="middle" fill="#a78bfa" font-size="9">HTTP</text><text x="40" y="44" text-anchor="middle" fill="#888" font-size="8">REST APIs</text><rect x="85" y="10" width="70" height="40" rx="4" fill="#2d1f5e" stroke="#a78bfa"/><text x="120" y="28" text-anchor="middle" fill="#a78bfa" font-size="9">SMTP</text><text x="120" y="44" text-anchor="middle" fill="#888" font-size="8">Email</text><rect x="165" y="10" width="70" height="40" rx="4" fill="#2d1f5e" stroke="#a78bfa"/><text x="200" y="28" text-anchor="middle" fill="#a78bfa" font-size="9">SSH</text><text x="200" y="44" text-anchor="middle" fill="#888" font-size="8">Remoto seguro</text><rect x="245" y="10" width="70" height="40" rx="4" fill="#2d1f5e" stroke="#a78bfa"/><text x="280" y="28" text-anchor="middle" fill="#a78bfa" font-size="9">DNS</text><text x="280" y="44" text-anchor="middle" fill="#888" font-size="8">Nombres a IP</text><text x="160" y="80" text-anchor="middle" fill="#888" font-size="9">HTTP:80 HTTPS:443 SSH:22 DNS:53</text></svg>',
  },
];

export const FLOW_STEPS = [
  { layer: 6, side: 'send', txt: 'Capa 7 Aplicación: El navegador genera petición HTTP GET.' },
  { layer: 5, side: 'send', txt: 'Capa 6 Presentación: TLS cifra los datos con AES-256.' },
  { layer: 4, side: 'send', txt: 'Capa 5 Sesión: Se establece y gestiona la sesión de comunicación.' },
  { layer: 3, side: 'send', txt: 'Capa 4 Transporte: TCP segmenta los datos y añade puertos y SEQ#.' },
  { layer: 2, side: 'send', txt: 'Capa 3 Red: Se encapsula el segmento en paquete IP con IPs origen/destino.' },
  { layer: 1, side: 'send', txt: 'Capa 2 Enlace: Trama Ethernet con MACs y CRC de verificación.' },
  { layer: 0, side: 'send', txt: 'Capa 1 Física: Los bits viajan por el cable como señal eléctrica/óptica.' },
  { layer: -1, side: 'mid',  txt: 'Los bits viajan por el medio físico. Routers leen solo hasta Capa 3.' },
  { layer: 0, side: 'recv', txt: 'Capa 1 Física: El receptor detecta la señal y convierte a bits.' },
  { layer: 1, side: 'recv', txt: 'Capa 2 Enlace: Verifica MAC de destino y comprueba CRC.' },
  { layer: 2, side: 'recv', txt: 'Capa 3 Red: Confirma IP de destino. Pasa el segmento hacia arriba.' },
  { layer: 3, side: 'recv', txt: 'Capa 4 Transporte: Reensambla segmentos en orden. Envía ACK.' },
  { layer: 4, side: 'recv', txt: 'Capa 5 Sesión: Gestiona el estado de la sesión recibida.' },
  { layer: 5, side: 'recv', txt: 'Capa 6 Presentación: Descifra y descomprime los datos.' },
  { layer: 6, side: 'recv', txt: 'Capa 7 Aplicación: Datos originales entregados al receptor.' },
];

export const DEVICES = [
  // Capa 7 — Aplicación (idx 6)
  { name: 'PC Usuario',    type: 'pc',       layer: 6, pos: [-4,   0, -1],   color: 0xa78bfa },
  { name: 'Servidor Web',  type: 'server',   layer: 6, pos: [4,    0, -1],   color: 0xa78bfa },
  { name: 'Navegador',     type: 'browser',  layer: 6, pos: [-1.5, 0,  2.5], color: 0xa78bfa },
  // Capa 6 — Presentación (idx 5)
  { name: 'TLS/SSL',       type: 'tls',      layer: 5, pos: [-3,   0,  0],   color: 0x818cf8 },
  { name: 'Compresor',     type: 'compress', layer: 5, pos: [3,    0,  1],   color: 0x818cf8 },
  // Capa 5 — Sesión (idx 4)
  { name: 'Sesión RPC',    type: 'session',  layer: 4, pos: [-3.5, 0,  0.5], color: 0x38bdf8 },
  { name: 'WebSocket',     type: 'websocket',layer: 4, pos: [3,    0,  1.5], color: 0x38bdf8 },
  // Capa 4 — Transporte (idx 3)
  { name: 'Firewall',      type: 'firewall', layer: 3, pos: [4,    0,  1],   color: 0x34d399 },
  { name: 'Load Balancer', type: 'loadbal',  layer: 3, pos: [-4,   0,  2],   color: 0x34d399 },
  // Capa 3 — Red (idx 2)
  { name: 'Router ISP',    type: 'router',   layer: 2, pos: [0,    0,  0],   color: 0xfbbf24 },
  { name: 'Router BGP',    type: 'router',   layer: 2, pos: [3.5,  0,  2.5], color: 0xfbbf24 },
  // Capa 2 — Enlace de datos (idx 1)
  { name: 'Switch L2',     type: 'switch',   layer: 1, pos: [-3,   0,  0.5], color: 0xfb923c },
  { name: 'Switch Core',   type: 'switch',   layer: 1, pos: [3,    0, -1],   color: 0xfb923c },
  { name: 'NIC',           type: 'nic',      layer: 1, pos: [0,    0,  2],   color: 0xfb923c },
  // Capa 1 — Física (idx 0)
  { name: 'Cable UTP',     type: 'cable',    layer: 0, pos: [-2,   0,  2],   color: 0xf472b6 },
  { name: 'Fibra óptica',  type: 'cable',    layer: 0, pos: [2,    0,  2.5], color: 0xf472b6 },
];

export const CABLE_CONNS = [
  [0, 1], [0, 2], [1, 2], [2, 3], [3, 5], [4, 5],
  [5, 6], [5, 7], [6, 8], [7, 8], [8, 9], [8, 10],
];

// ─── TCP/IP Model ─────────────────────────────────────────────────────────────
export const TCP_LAYERS = [
  {
    n: 1, name: 'Acceso a red', pdu: 'Trama', icon: 'NET', hex: 0xf97316, css: '#f97316', bg: '#3d1500',
    desc: 'Combina las capas Física y Enlace de datos del modelo OSI. Gestiona la transmisión de datos en la red local y el acceso al medio físico.',
    fn: 'Control de acceso al medio, enmarcado de datos, direccionamiento MAC, detección de errores en enlace local.',
    protos: ['Ethernet', 'Wi-Fi 802.11', 'ARP', 'PPP', 'DSL', 'Token Ring'],
    devs: ['Switches', 'Hubs', 'NIC', 'Cables', 'Access Points'],
    cases: [
      { t: 'Ethernet en LAN', d: 'La mayoría de redes locales usan Ethernet. Un switch aprende las MACs y envía tramas solo al puerto correcto.' },
      { t: 'ARP — Resolución de direcciones', d: 'Antes de enviar datos, ARP pregunta "¿quién tiene esta IP?" y recibe la MAC correspondiente para armar la trama.' },
      { t: 'Wi-Fi — Acceso inalámbrico', d: 'CSMA/CA evita colisiones en el medio inalámbrico. El AP actúa como switch para los clientes conectados.' },
    ],
    diag: '<svg viewBox="0 0 320 110" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="20" width="310" height="70" rx="6" fill="#3d1500" stroke="#f97316" stroke-width="1"/><rect x="15" y="30" width="90" height="50" rx="4" fill="#f97316" fill-opacity="0.15" stroke="#f97316"/><text x="60" y="52" text-anchor="middle" fill="#f97316" font-size="9" font-weight="bold">FISICA</text><text x="60" y="68" text-anchor="middle" fill="#888" font-size="8">Bits / señales</text><rect x="115" y="30" width="90" height="50" rx="4" fill="#f97316" fill-opacity="0.15" stroke="#f97316"/><text x="160" y="52" text-anchor="middle" fill="#f97316" font-size="9" font-weight="bold">ENLACE</text><text x="160" y="68" text-anchor="middle" fill="#888" font-size="8">Tramas / MAC</text><rect x="215" y="30" width="90" height="50" rx="4" fill="#f97316" fill-opacity="0.08" stroke="#f97316" stroke-dasharray="3 2"/><text x="260" y="52" text-anchor="middle" fill="#f97316" font-size="9">OSI L1+L2</text><text x="260" y="68" text-anchor="middle" fill="#888" font-size="8">Fusionadas</text></svg>',
  },
  {
    n: 2, name: 'Internet', pdu: 'Paquete', icon: 'IP', hex: 0xfbbf24, css: '#fbbf24', bg: '#3d2800',
    desc: 'El corazón del modelo TCP/IP. Gestiona el direccionamiento lógico y el enrutamiento de paquetes entre redes distintas a nivel global.',
    fn: 'Direccionamiento IP, enrutamiento inter-red, fragmentación de paquetes, detección de errores a nivel IP con ICMP.',
    protos: ['IPv4', 'IPv6', 'ICMP', 'IGMP', 'BGP', 'OSPF', 'RIP', 'IPsec'],
    devs: ['Routers', 'Switches L3', 'Firewalls'],
    cases: [
      { t: 'IPv4 vs IPv6', d: 'IPv4 tiene ~4 mil millones de direcciones. IPv6 tiene 340 undecillones. La transición es gradual con dual-stack.' },
      { t: 'ICMP y diagnóstico', d: 'ping usa ICMP Echo Request/Reply. traceroute usa TTL decreciente para revelar cada salto de router en la ruta.' },
      { t: 'BGP — Internet global', d: 'Border Gateway Protocol coordina el enrutamiento entre los ~80,000 sistemas autónomos que forman Internet.' },
    ],
    diag: '<svg viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="60" r="28" fill="#3d2800" stroke="#fbbf24"/><text x="50" y="56" text-anchor="middle" fill="#fbbf24" font-size="9" font-weight="bold">SRC</text><text x="50" y="72" text-anchor="middle" fill="#888" font-size="8">10.0.0.1</text><circle cx="160" cy="35" r="20" fill="#3d2800" stroke="#fbbf24" stroke-width="1.5"/><text x="160" y="39" text-anchor="middle" fill="#fbbf24" font-size="8">ROUTER</text><circle cx="160" cy="90" r="20" fill="#3d2800" stroke="#fbbf24" stroke-width="1.5"/><text x="160" y="94" text-anchor="middle" fill="#fbbf24" font-size="8">ROUTER</text><circle cx="270" cy="60" r="28" fill="#3d2800" stroke="#fbbf24"/><text x="270" y="56" text-anchor="middle" fill="#fbbf24" font-size="9" font-weight="bold">DST</text><text x="270" y="72" text-anchor="middle" fill="#888" font-size="8">203.0.113.5</text><line x1="76" y1="50" x2="140" y2="42" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4 2"/><line x1="160" y1="55" x2="160" y2="70" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4 2"/><line x1="180" y1="80" x2="242" y2="68" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4 2"/></svg>',
  },
  {
    n: 3, name: 'Transporte', pdu: 'Segmento', icon: 'TCP', hex: 0x34d399, css: '#34d399', bg: '#0a3328',
    desc: 'Proporciona comunicación extremo a extremo entre aplicaciones. TCP garantiza entrega ordenada; UDP prioriza velocidad sin confirmación.',
    fn: 'Multiplexación por puertos, control de flujo, control de congestión, segmentación y reensamblado de datos.',
    protos: ['TCP', 'UDP', 'QUIC', 'SCTP', 'DCCP'],
    devs: ['Firewalls stateful', 'Load balancers L4', 'Proxies'],
    cases: [
      { t: 'TCP three-way handshake', d: 'SYN → SYN-ACK → ACK establece la conexión. Garantiza que ambos lados están listos antes de transferir.' },
      { t: 'Control de congestión', d: 'TCP ajusta la ventana de transmisión según la congestión detectada. Algoritmos como CUBIC evitan colapsos de red.' },
      { t: 'QUIC — El futuro', d: 'HTTP/3 usa QUIC sobre UDP. Handshake 0-RTT, multiplexación sin head-of-line blocking, migración de conexión.' },
    ],
    diag: '<svg viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="140" height="100" rx="6" fill="#0a3328" stroke="#34d399"/><text x="80" y="30" text-anchor="middle" fill="#34d399" font-size="11" font-weight="bold">TCP</text><text x="80" y="48" text-anchor="middle" fill="#34d399" font-size="8">SYN - SYN/ACK - ACK</text><text x="80" y="64" text-anchor="middle" fill="#888" font-size="8">Control flujo</text><text x="80" y="80" text-anchor="middle" fill="#888" font-size="8">Control congestión</text><text x="80" y="100" text-anchor="middle" fill="#34d399" font-size="9">Confiable</text><rect x="170" y="10" width="140" height="100" rx="6" fill="#3d2800" stroke="#fbbf24"/><text x="240" y="30" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold">UDP</text><text x="240" y="48" text-anchor="middle" fill="#fbbf24" font-size="8">Sin handshake</text><text x="240" y="64" text-anchor="middle" fill="#888" font-size="8">Bajo overhead</text><text x="240" y="80" text-anchor="middle" fill="#888" font-size="8">Best-effort</text><text x="240" y="100" text-anchor="middle" fill="#fbbf24" font-size="9">Veloz</text></svg>',
  },
  {
    n: 4, name: 'Aplicación', pdu: 'Datos', icon: 'APP', hex: 0xa78bfa, css: '#a78bfa', bg: '#2d1f5e',
    desc: 'Capa única que agrupa Sesión, Presentación y Aplicación del modelo OSI. Contiene todos los protocolos de alto nivel que usan las aplicaciones.',
    fn: 'Interfaz directa con aplicaciones de usuario, autenticación, cifrado TLS, codificación de datos, gestión de sesiones.',
    protos: ['HTTP/HTTPS', 'DNS', 'SMTP', 'SSH', 'FTP', 'DHCP', 'SNMP', 'WebSocket', 'gRPC'],
    devs: ['Servidores web', 'DNS servers', 'Proxies reversos', 'CDN'],
    cases: [
      { t: 'HTTPS — Web segura', d: 'HTTP sobre TLS. El handshake TLS 1.3 tarda solo 1 RTT. Cifrado AES-256-GCM protege todos los datos en tránsito.' },
      { t: 'DNS — Resolución de nombres', d: 'Jerarquía: root → TLD → autoritativo. Respuestas cacheadas con TTL. DNS sobre HTTPS (DoH) añade privacidad.' },
      { t: 'WebSocket — Tiempo real', d: 'Upgrade desde HTTP. Canal bidireccional persistente. Ideal para chats, dashboards en vivo y multiplayer.' },
    ],
    diag: '<svg viewBox="0 0 320 100" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="10" width="68" height="40" rx="4" fill="#2d1f5e" stroke="#a78bfa"/><text x="39" y="27" text-anchor="middle" fill="#a78bfa" font-size="8" font-weight="bold">HTTP</text><text x="39" y="42" text-anchor="middle" fill="#888" font-size="7">:443 TLS</text><rect x="81" y="10" width="68" height="40" rx="4" fill="#2d1f5e" stroke="#a78bfa"/><text x="115" y="27" text-anchor="middle" fill="#a78bfa" font-size="8" font-weight="bold">DNS</text><text x="115" y="42" text-anchor="middle" fill="#888" font-size="7">:53 UDP</text><rect x="157" y="10" width="68" height="40" rx="4" fill="#2d1f5e" stroke="#a78bfa"/><text x="191" y="27" text-anchor="middle" fill="#a78bfa" font-size="8" font-weight="bold">SSH</text><text x="191" y="42" text-anchor="middle" fill="#888" font-size="7">:22 TCP</text><rect x="233" y="10" width="82" height="40" rx="4" fill="#2d1f5e" stroke="#a78bfa"/><text x="274" y="27" text-anchor="middle" fill="#a78bfa" font-size="8" font-weight="bold">SMTP</text><text x="274" y="42" text-anchor="middle" fill="#888" font-size="7">:25/:587</text><text x="160" y="80" text-anchor="middle" fill="#888" font-size="8">OSI L5 + L6 + L7 fusionadas en una sola capa</text></svg>',
  },
];

export const TCP_DEVICES = [
  // Capa 4 — Aplicación (idx 3)
  { name: 'Navegador',      type: 'browser',   layer: 3, pos: [-4,  0, -1],   color: 0xa78bfa },
  { name: 'Servidor Web',   type: 'server',    layer: 3, pos: [4,   0, -1],   color: 0xa78bfa },
  { name: 'DNS Server',     type: 'dns',       layer: 3, pos: [0,   0, 2.5],  color: 0xa78bfa },
  // Capa 3 — Transporte (idx 2)
  { name: 'Firewall',       type: 'firewall',  layer: 2, pos: [3.5, 0,  1],   color: 0x34d399 },
  { name: 'Load Balancer',  type: 'loadbal',   layer: 2, pos: [-4,  0,  1.5], color: 0x34d399 },
  // Capa 2 — Internet (idx 1)
  { name: 'Router Core',    type: 'router',    layer: 1, pos: [0,   0,  0],   color: 0xfbbf24 },
  { name: 'Router BGP',     type: 'router',    layer: 1, pos: [3.5, 0,  2],   color: 0xfbbf24 },
  // Capa 1 — Acceso a red (idx 0)
  { name: 'Switch',         type: 'switch',    layer: 0, pos: [-3,  0,  0.5], color: 0xf97316 },
  { name: 'Access Point',   type: 'ap',        layer: 0, pos: [3,   0, -1],   color: 0xf97316 },
  { name: 'Cable Ethernet', type: 'cable',     layer: 0, pos: [-1,  0,  2],   color: 0xf97316 },
];

export const TCP_CABLE_CONNS = [
  [0,1],[0,2],[1,2],[2,3],[3,5],[4,5],[5,6],[5,7],[6,7],[7,8],[7,9],
];