import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OSI_LAYERS, FLOW_STEPS, DEVICES, CABLE_CONNS, TCP_LAYERS, TCP_DEVICES, TCP_CABLE_CONNS } from './osi.data';
import OSIPanel from './OSIPanel';
import './OSI3D.css';

const LAYER_H = 0.6, LAYER_W = 12, LAYER_D = 8, LAYER_GAP = 1.4;

// ─── Canvas label helpers ────────────────────────────────────────────────────
function makeLayerLabel(text, hexColor, sub) {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 96;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 512, 96);
  const col = '#' + hexColor.toString(16).padStart(6, '0');
  ctx.fillStyle = col; ctx.font = 'bold 28px Segoe UI'; ctx.textAlign = 'center';
  ctx.fillText(text, 256, 38);
  ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.font = '18px monospace';
  ctx.fillText('PDU: ' + sub, 256, 70);
  const tex = new THREE.CanvasTexture(c);
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
  const s = new THREE.Sprite(mat); s.scale.set(5, 0.94, 1);
  return s;
}

// ─── Device geometry factory ─────────────────────────────────────────────────
function makeDeviceGeometry(deviceName, deviceType) {
  const n = deviceType || deviceName.toLowerCase();

  // PC / Computadora — monitor flat + base
  if (n === 'pc' || n === 'usuario' || n.includes('pc') || n.includes('usuario')) {
    const group = new THREE.Group();
    // Monitor
    const screen = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.65, 0.07),
      new THREE.MeshPhongMaterial({ color: 0x1a1a2e, emissive: 0x1a1a2e, emissiveIntensity: 0.3 })
    );
    screen.position.y = 0.22;
    // Screen glow
    const glow = new THREE.Mesh(
      new THREE.BoxGeometry(0.75, 0.5, 0.02),
      new THREE.MeshPhongMaterial({ color: 0x4f8ef7, emissive: 0x4f8ef7, emissiveIntensity: 0.8, transparent: true, opacity: 0.9 })
    );
    glow.position.set(0, 0.22, 0.045);
    // Stand
    const stand = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.28, 8),
      new THREE.MeshPhongMaterial({ color: 0x444466 })
    );
    stand.position.y = -0.12;
    // Base
    const base = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 0.05, 0.3),
      new THREE.MeshPhongMaterial({ color: 0x333355 })
    );
    base.position.y = -0.27;
    group.add(screen, glow, stand, base);
    return group;
  }

  // Servidor / Server rack
  if (n === 'server' || n === 'servidor' || n.includes('servidor') || n.includes('server') || n.includes('web')) {
    const group = new THREE.Group();
    // Chassis
    const chassis = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 1.0, 0.45),
      new THREE.MeshPhongMaterial({ color: 0x1c1c2e, shininess: 80 })
    );
    // Drive bays (3 strips)
    for (let i = 0; i < 3; i++) {
      const bay = new THREE.Mesh(
        new THREE.BoxGeometry(0.58, 0.12, 0.05),
        new THREE.MeshPhongMaterial({ color: 0x2a2a4a, emissive: 0x00ff88, emissiveIntensity: 0.15 })
      );
      bay.position.set(0, 0.25 - i * 0.22, 0.25);
      group.add(bay);
      // LED indicator
      const led = new THREE.Mesh(
        new THREE.SphereGeometry(0.03, 6, 6),
        new THREE.MeshPhongMaterial({ color: 0x00ff88, emissive: 0x00ff88, emissiveIntensity: 1 })
      );
      led.position.set(0.22, 0.25 - i * 0.22, 0.28);
      group.add(led);
    }
    group.add(chassis);
    return group;
  }

  // Navegador — ventana con tabs
  if (n === 'browser' || n === 'navegador' || n.includes('navegador') || n.includes('browser')) {
    const group = new THREE.Group();
    // Window frame
    const frame = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.7, 0.06),
      new THREE.MeshPhongMaterial({ color: 0x2d2d4e })
    );
    // Tab bar
    const tabBar = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.12, 0.07),
      new THREE.MeshPhongMaterial({ color: 0x1a1a30 })
    );
    tabBar.position.y = 0.29;
    // Active tab
    const tab = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 0.09, 0.08),
      new THREE.MeshPhongMaterial({ color: 0x4f8ef7, emissive: 0x4f8ef7, emissiveIntensity: 0.4 })
    );
    tab.position.set(-0.25, 0.29, 0.01);
    // Content area glow
    const content = new THREE.Mesh(
      new THREE.BoxGeometry(0.78, 0.48, 0.02),
      new THREE.MeshPhongMaterial({ color: 0x0d1117, emissive: 0x4f8ef7, emissiveIntensity: 0.12 })
    );
    content.position.set(0, -0.02, 0.04);
    group.add(frame, tabBar, tab, content);
    return group;
  }

  // Router — cilindro con antenas
  if (n === 'router' || n.includes('router')) {
    const group = new THREE.Group();
    // Body
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.42, 0.42, 0.18, 16),
      new THREE.MeshPhongMaterial({ color: 0x1a1a2e, shininess: 60 })
    );
    // Top ring glow
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.35, 0.025, 8, 32),
      new THREE.MeshPhongMaterial({ color: 0xfbbf24, emissive: 0xfbbf24, emissiveIntensity: 0.7 })
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.1;
    // Antenas (3)
    const antennaAngles = [-0.6, 0, 0.6];
    antennaAngles.forEach(angle => {
      const ant = new THREE.Mesh(
        new THREE.CylinderGeometry(0.025, 0.025, 0.55, 6),
        new THREE.MeshPhongMaterial({ color: 0x888899 })
      );
      ant.position.set(Math.sin(angle) * 0.28, 0.38, Math.cos(angle) * 0.1);
      ant.rotation.z = angle * 0.3;
      group.add(ant);
    });
    // LEDs
    for (let i = 0; i < 4; i++) {
      const led = new THREE.Mesh(
        new THREE.SphereGeometry(0.03, 6, 6),
        new THREE.MeshPhongMaterial({ color: 0x00ff88, emissive: 0x00ff88, emissiveIntensity: 1 })
      );
      led.position.set(-0.24 + i * 0.16, 0.1, 0.42);
      group.add(led);
    }
    group.add(body, ring);
    return group;
  }

  // Switch — caja plana con puertos
  if (n === 'switch' || n === 'ap' || n.includes('switch') || n.includes('access point')) {
    const group = new THREE.Group();
    // Body flat
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(1.0, 0.2, 0.55),
      new THREE.MeshPhongMaterial({ color: 0x1a1a2e, shininess: 70 })
    );
    // Port row
    for (let i = 0; i < 8; i++) {
      const port = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.07, 0.04),
        new THREE.MeshPhongMaterial({ color: 0x0d0d1a })
      );
      port.position.set(-0.38 + i * 0.11, 0.0, 0.29);
      const led = new THREE.Mesh(
        new THREE.SphereGeometry(0.02, 5, 5),
        new THREE.MeshPhongMaterial({ color: 0xfb923c, emissive: 0xfb923c, emissiveIntensity: i % 3 === 0 ? 0.2 : 1 })
      );
      led.position.set(-0.38 + i * 0.11, 0.07, 0.29);
      group.add(port, led);
    }
    group.add(body);
    return group;
  }

  // Firewall — escudo
  if (n === 'firewall' || n.includes('firewall')) {
    const group = new THREE.Group();
    // Shield shape via extruded geometry
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.5);
    shape.lineTo(0.4, 0.35);
    shape.lineTo(0.4, -0.1);
    shape.lineTo(0, -0.5);
    shape.lineTo(-0.4, -0.1);
    shape.lineTo(-0.4, 0.35);
    shape.closePath();
    const extrudeSettings = { depth: 0.12, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03 };
    const shield = new THREE.Mesh(
      new THREE.ExtrudeGeometry(shape, extrudeSettings),
      new THREE.MeshPhongMaterial({ color: 0x0a3328, emissive: 0x34d399, emissiveIntensity: 0.25, shininess: 80 })
    );
    shield.position.z = -0.06;
    // Inner glow cross
    const crossH = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.06, 0.04),
      new THREE.MeshPhongMaterial({ color: 0x34d399, emissive: 0x34d399, emissiveIntensity: 0.9 })
    );
    const crossV = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.35, 0.04),
      new THREE.MeshPhongMaterial({ color: 0x34d399, emissive: 0x34d399, emissiveIntensity: 0.9 })
    );
    crossH.position.z = 0.08; crossV.position.z = 0.08;
    group.add(shield, crossH, crossV);
    return group;
  }

  // Load Balancer — cilindros apilados con flechas
  if (n === 'loadbal' || n.includes('load') || n.includes('balancer')) {
    const group = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.38, 0.38, 0.55, 12),
      new THREE.MeshPhongMaterial({ color: 0x0a3328, shininess: 60 })
    );
    // Ring bands
    [0.15, -0.15].forEach(y => {
      const band = new THREE.Mesh(
        new THREE.TorusGeometry(0.38, 0.04, 6, 24),
        new THREE.MeshPhongMaterial({ color: 0x34d399, emissive: 0x34d399, emissiveIntensity: 0.6 })
      );
      band.rotation.x = Math.PI / 2;
      band.position.y = y;
      group.add(band);
    });
    // Top arrows (3 cones pointing out)
    for (let i = 0; i < 3; i++) {
      const angle = (i / 3) * Math.PI * 2;
      const cone = new THREE.Mesh(
        new THREE.ConeGeometry(0.07, 0.2, 6),
        new THREE.MeshPhongMaterial({ color: 0x34d399, emissive: 0x34d399, emissiveIntensity: 0.8 })
      );
      cone.position.set(Math.cos(angle) * 0.55, 0.32, Math.sin(angle) * 0.55);
      cone.rotation.z = -angle + Math.PI / 2;
      group.add(cone);
    }
    group.add(body);
    return group;
  }

  // Cable / Fibra — helix/tubo ondulado
  if (n === 'dns') {
    // DNS Server — globe with lines + small rack
    const group = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.SphereGeometry(0.38, 16, 16),
      new THREE.MeshPhongMaterial({ color: 0x1a1a2e, shininess: 70 })
    );
    // Latitude rings
    [-0.15, 0.15].forEach(y => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(Math.sqrt(0.38**2 - y**2), 0.018, 6, 24),
        new THREE.MeshPhongMaterial({ color: 0xa78bfa, emissive: 0xa78bfa, emissiveIntensity: 0.5 })
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.y = y;
      group.add(ring);
    });
    // Vertical meridian
    const vring = new THREE.Mesh(
      new THREE.TorusGeometry(0.38, 0.018, 6, 24),
      new THREE.MeshPhongMaterial({ color: 0xa78bfa, emissive: 0xa78bfa, emissiveIntensity: 0.5 })
    );
    group.add(body, vring);
    return group;
  }

  if (n === 'cable' || n.includes('cable') || n.includes('fibra') || n.includes('fibr')) {
    const group = new THREE.Group();
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.45, -0.2, 0),
      new THREE.Vector3(-0.2, 0.1, 0.2),
      new THREE.Vector3(0.1, -0.1, -0.2),
      new THREE.Vector3(0.3, 0.2, 0.1),
      new THREE.Vector3(0.45, -0.1, 0),
    ]);
    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 20, 0.055, 8, false),
      new THREE.MeshPhongMaterial({ color: 0xf472b6, emissive: 0xf472b6, emissiveIntensity: 0.4, shininess: 90 })
    );
    // Connectors at ends
    [new THREE.Vector3(-0.45, -0.2, 0), new THREE.Vector3(0.45, -0.1, 0)].forEach(pos => {
      const conn = new THREE.Mesh(
        new THREE.CylinderGeometry(0.09, 0.09, 0.12, 8),
        new THREE.MeshPhongMaterial({ color: 0x888899, shininess: 100 })
      );
      conn.position.copy(pos);
      conn.rotation.z = Math.PI / 2;
      group.add(conn);
    });
    group.add(tube);
    return group;
  }

  // TLS/SSL — candado con arco
  if (n === 'tls') {
    const group = new THREE.Group();
    // Cuerpo del candado
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.6, 0.3),
      new THREE.MeshPhongMaterial({ color: 0x818cf8, shininess: 90 })
    );
    body.position.y = -0.15;
    // Arco superior
    const arc = new THREE.Mesh(
      new THREE.TorusGeometry(0.22, 0.07, 8, 16, Math.PI),
      new THREE.MeshPhongMaterial({ color: 0x818cf8, shininess: 90 })
    );
    arc.position.y = 0.18;
    arc.rotation.z = Math.PI;
    // Cerradura (cilindro)
    const lock = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.12, 12),
      new THREE.MeshPhongMaterial({ color: 0xa78bfa, emissive: 0xa78bfa, emissiveIntensity: 0.8 })
    );
    lock.position.set(0, -0.15, 0.18);
    lock.rotation.x = Math.PI / 2;
    group.add(body, arc, lock);
    return group;
  }

  // Compresor — cilindro con flechas hacia adentro
  if (n === 'compress') {
    const group = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.38, 0.38, 0.5, 16),
      new THREE.MeshPhongMaterial({ color: 0x818cf8, shininess: 70 })
    );
    // Flechas convergentes (conos apuntando al centro)
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const cone = new THREE.Mesh(
        new THREE.ConeGeometry(0.08, 0.25, 6),
        new THREE.MeshPhongMaterial({ color: 0xa78bfa, emissive: 0xa78bfa, emissiveIntensity: 0.7 })
      );
      cone.position.set(Math.cos(angle) * 0.52, 0, Math.sin(angle) * 0.52);
      cone.rotation.z = Math.PI / 2;
      cone.rotation.y = -angle;
      group.add(cone);
    }
    group.add(body);
    return group;
  }

  // Sesión RPC — dos bloques conectados por línea
  if (n === 'session') {
    const group = new THREE.Group();
    const matA = new THREE.MeshPhongMaterial({ color: 0x38bdf8, shininess: 80 });
    const matB = new THREE.MeshPhongMaterial({ color: 0x0c3352, emissive: 0x38bdf8, emissiveIntensity: 0.3 });
    const blockA = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.55, 0.25), matA);
    blockA.position.x = -0.3;
    const blockB = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.55, 0.25), matA);
    blockB.position.x = 0.3;
    // Conector central pulsante
    const conn = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 0.6, 8),
      new THREE.MeshPhongMaterial({ color: 0x38bdf8, emissive: 0x38bdf8, emissiveIntensity: 1 })
    );
    conn.rotation.z = Math.PI / 2;
    // Dots en extremos
    [-0.3, 0.3].forEach(x => {
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 10, 10),
        new THREE.MeshPhongMaterial({ color: 0x38bdf8, emissive: 0x38bdf8, emissiveIntensity: 1 })
      );
      dot.position.set(x, 0, 0.14);
      group.add(dot);
    });
    group.add(blockA, blockB, conn);
    return group;
  }

  // WebSocket — símbolo de conexión bidireccional
  if (n === 'websocket') {
    const group = new THREE.Group();
    const mat = new THREE.MeshPhongMaterial({ color: 0x38bdf8, emissive: 0x38bdf8, emissiveIntensity: 0.5 });
    // Dos toroides perpendiculares = símbolo de infinito/conexión
    const t1 = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.06, 8, 24), mat);
    t1.position.x = -0.18;
    const t2 = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.06, 8, 24), mat);
    t2.position.x = 0.18;
    // Flecha doble en el centro
    const bar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.5, 8),
      new THREE.MeshPhongMaterial({ color: 0x7dd3fc, emissive: 0x7dd3fc, emissiveIntensity: 0.9 })
    );
    bar.rotation.z = Math.PI / 2;
    group.add(t1, t2, bar);
    return group;
  }

  // NIC — tarjeta de red rectangular con puertos
  if (n === 'nic') {
    const group = new THREE.Group();
    // PCB
    const board = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.06, 0.55),
      new THREE.MeshPhongMaterial({ color: 0x1a4a1a, shininess: 60 })
    );
    // Conector RJ45
    const rj45 = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.18, 0.12),
      new THREE.MeshPhongMaterial({ color: 0x333355 })
    );
    rj45.position.set(0.3, 0.12, 0.24);
    // Chips en la PCB
    [[-0.2, 0, 0], [0.1, 0, -0.1]].forEach(([x, y, z]) => {
      const chip = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.08, 0.2),
        new THREE.MeshPhongMaterial({ color: 0x111122 })
      );
      chip.position.set(x, 0.07, z);
      group.add(chip);
    });
    // LEDs
    [0, 0.12].forEach(x => {
      const led = new THREE.Mesh(
        new THREE.SphereGeometry(0.03, 6, 6),
        new THREE.MeshPhongMaterial({ color: 0xfb923c, emissive: 0xfb923c, emissiveIntensity: 1 })
      );
      led.position.set(0.36 + x, 0.18, 0.24);
      group.add(led);
    });
    group.add(board, rj45);
    return group;
  }

  // Fallback — octahedron
  return new THREE.Group();
}

// ─── Icon drawing on canvas (no emojis) ─────────────────────────────────────
function drawDevIcon(ctx, type, x, y, size, color) {
  ctx.strokeStyle = color;
  ctx.fillStyle   = color;
  ctx.lineWidth   = 2;
  ctx.lineCap     = 'round';
  ctx.lineJoin    = 'round';
  const h = size, w = size;

  if (type === 'pc' || type === 'usuario') {
    // Monitor
    ctx.strokeRect(x, y, w, h * 0.65);
    ctx.fillStyle = color + '33';
    ctx.fillRect(x + 2, y + 2, w - 4, h * 0.65 - 4);
    ctx.fillStyle = color;
    // Stand
    ctx.fillRect(x + w * 0.42, y + h * 0.65, w * 0.16, h * 0.22);
    ctx.fillRect(x + w * 0.2, y + h * 0.87, w * 0.6, h * 0.1);
  } else if (type === 'server' || type === 'servidor') {
    // Rack unit
    ctx.strokeRect(x, y, w, h);
    for (let i = 0; i < 3; i++) {
      const ry = y + 4 + i * (h / 3.2);
      ctx.strokeRect(x + 4, ry, w - 8, h / 4);
      ctx.beginPath();
      ctx.arc(x + w - 8, ry + h / 8, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (type === 'browser' || type === 'navegador') {
    // Window chrome + address bar
    ctx.strokeRect(x, y, w, h);
    ctx.fillRect(x, y, w, h * 0.25);
    ctx.fillStyle = color + '22';
    ctx.fillRect(x + 2, y + h * 0.27, w - 4, h * 0.7);
    ctx.fillStyle = color;
    // 3 dots
    for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(x + 6 + i * 7, y + h * 0.13, 2, 0, Math.PI * 2); ctx.fill(); }
  } else if (type === 'router') {
    // Circle body + antennas
    ctx.beginPath(); ctx.arc(x + w / 2, y + h * 0.62, h * 0.35, 0, Math.PI * 2); ctx.stroke();
    // Antennas
    [0.25, 0.5, 0.75].forEach(xr => {
      ctx.beginPath(); ctx.moveTo(x + w * xr, y + h * 0.28); ctx.lineTo(x + w * xr, y + 2); ctx.stroke();
    });
    // Signal arcs
    ctx.beginPath(); ctx.arc(x + w / 2, y + h * 0.62, h * 0.18, Math.PI, 0); ctx.stroke();
  } else if (type === 'switch') {
    // Flat box + ports
    ctx.strokeRect(x, y + h * 0.3, w, h * 0.4);
    for (let i = 0; i < 6; i++) {
      ctx.strokeRect(x + 3 + i * (w - 6) / 6, y + h * 0.37, (w - 10) / 6, h * 0.26);
    }
  } else if (type === 'firewall') {
    // Shield
    ctx.beginPath();
    ctx.moveTo(x + w / 2, y); ctx.lineTo(x + w, y + h * 0.25);
    ctx.lineTo(x + w, y + h * 0.6); ctx.lineTo(x + w / 2, y + h);
    ctx.lineTo(x, y + h * 0.6); ctx.lineTo(x, y + h * 0.25);
    ctx.closePath(); ctx.stroke();
    ctx.fillStyle = color + '22'; ctx.fill();
    // Lock body
    ctx.strokeRect(x + w * 0.32, y + h * 0.48, w * 0.36, h * 0.3);
    ctx.beginPath(); ctx.arc(x + w / 2, y + h * 0.46, w * 0.14, Math.PI, 0); ctx.stroke();
  } else if (type === 'loadbal') {
    // Split arrows icon
    ctx.beginPath(); ctx.moveTo(x + w * 0.1, y + h / 2); ctx.lineTo(x + w * 0.9, y + h / 2); ctx.stroke();
    // Top arrow
    ctx.beginPath(); ctx.moveTo(x + w * 0.6, y + h / 2); ctx.lineTo(x + w * 0.9, y + h * 0.2); ctx.lineTo(x + w * 0.9, y + h * 0.42); ctx.stroke();
    // Bottom arrow
    ctx.beginPath(); ctx.moveTo(x + w * 0.6, y + h / 2); ctx.lineTo(x + w * 0.9, y + h * 0.8); ctx.lineTo(x + w * 0.9, y + h * 0.58); ctx.stroke();
    // Arrowhead left
    ctx.beginPath(); ctx.moveTo(x + w * 0.1, y + h / 2);
    ctx.lineTo(x + w * 0.22, y + h * 0.38); ctx.moveTo(x + w * 0.1, y + h / 2);
    ctx.lineTo(x + w * 0.22, y + h * 0.62); ctx.stroke();
  } else if (type === 'dns') {
    // Globe with horizontal lines
    ctx.beginPath(); ctx.arc(x + w / 2, y + h / 2, h * 0.45, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + 2, y + h * 0.38); ctx.lineTo(x + w - 2, y + h * 0.38); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + 2, y + h * 0.62); ctx.lineTo(x + w - 2, y + h * 0.62); ctx.stroke();
    // Vertical ellipse
    ctx.beginPath(); ctx.ellipse(x + w / 2, y + h / 2, w * 0.2, h * 0.45, 0, 0, Math.PI * 2); ctx.stroke();
  } else if (type === 'ap') {
    // Access point — semicircle waves
    for (let r = 1; r <= 3; r++) {
      ctx.beginPath(); ctx.arc(x + w / 2, y + h * 0.7, r * h * 0.16, Math.PI, 0); ctx.stroke();
    }
    ctx.beginPath(); ctx.arc(x + w / 2, y + h * 0.7, 3, 0, Math.PI * 2); ctx.fill();
    // Pole
    ctx.beginPath(); ctx.moveTo(x + w / 2, y + h * 0.7); ctx.lineTo(x + w / 2, y + h); ctx.stroke();
    ctx.strokeRect(x + w * 0.15, y + h * 0.9, w * 0.7, h * 0.1);
  } else if (type === 'cable') {
    // Wavy line + connectors
    ctx.beginPath();
    ctx.moveTo(x, y + h / 2);
    ctx.bezierCurveTo(x + w * 0.25, y + h * 0.2, x + w * 0.5, y + h * 0.8, x + w * 0.75, y + h * 0.3);
    ctx.bezierCurveTo(x + w * 0.88, y + h * 0.1, x + w, y + h / 2, x + w, y + h / 2);
    ctx.stroke();
    // End connectors
    ctx.fillRect(x - 3, y + h / 2 - 4, 6, 8);
    ctx.fillRect(x + w - 3, y + h / 2 - 4, 6, 8);
  } else {
    // Fallback: diamond
    ctx.beginPath();
    ctx.moveTo(x + w / 2, y); ctx.lineTo(x + w, y + h / 2);
    ctx.lineTo(x + w / 2, y + h); ctx.lineTo(x, y + h / 2);
    ctx.closePath(); ctx.stroke();
  }
}

function makeDevLabel(name, type, hexColor) {
  const c = document.createElement('canvas'); c.width = 280; c.height = 72;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 280, 72);

  // Background pill
  ctx.fillStyle = 'rgba(8,11,18,0.82)';
  ctx.beginPath(); ctx.roundRect(3, 3, 274, 66, 10); ctx.fill();
  ctx.strokeStyle = hexColor + '55'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.roundRect(3, 3, 274, 66, 10); ctx.stroke();

  // Icon background circle
  ctx.fillStyle = hexColor + '22';
  ctx.beginPath(); ctx.arc(34, 36, 22, 0, Math.PI * 2); ctx.fill();

  // Draw icon
  const col = '#' + hexColor.toString(16).padStart(6, '0');
  drawDevIcon(ctx, type || name.toLowerCase(), 16, 18, 36, col);

  // Name text
  ctx.fillStyle = col;
  ctx.font = 'bold 14px "Segoe UI", system-ui, sans-serif';
  ctx.fillText(name, 64, 30);

  // Type sub-label
  ctx.fillStyle = 'rgba(255,255,255,0.38)';
  ctx.font = '11px monospace';
  const typeLabel = {
    server: 'Servidor', browser: 'Navegador', router: 'Router',
    switch: 'Switch', firewall: 'Firewall', loadbal: 'Load Balancer',
    dns: 'DNS Server', ap: 'Access Point', cable: 'Cable/Fibra',
    usuario: 'Cliente', pc: 'Cliente',
  }[type] || type || '';
  ctx.fillText(typeLabel, 64, 50);

  const tex = new THREE.CanvasTexture(c);
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
  const s   = new THREE.Sprite(mat); s.scale.set(2.8, 0.72, 1);
  return s;
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function OSI3D() {
  const canvasRef = useRef(null);
  const stateRef  = useRef({});           // mutable three.js state
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [tooltip, setTooltip]             = useState({ visible: false, x: 0, y: 0, text: '' });
  const [model, setModel]                 = useState('osi');
  const [camView, setCamView]             = useState('persp');
  const [flowStep, setFlowStep]           = useState(-1);
  const [flowTxt, setFlowTxt]             = useState('');

  // ─── Three.js bootstrap ────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const s = stateRef.current;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(innerWidth, innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080b12);
    scene.fog = new THREE.FogExp2(0x080b12, 0.018);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 200);
    camera.position.set(14, 12, 18);
    camera.lookAt(0, 7, 0);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dir = new THREE.DirectionalLight(0xffffff, 1.0);
    dir.position.set(10, 20, 10); dir.castShadow = true; scene.add(dir);
    const ptA = new THREE.PointLight(0x4f8ef7, 1.5, 50); ptA.position.set(-5, 15, 5); scene.add(ptA);
    const ptB = new THREE.PointLight(0xa78bfa, 1.0, 50); ptB.position.set(8, 3, 8);  scene.add(ptB);
    const ptC = new THREE.PointLight(0xffffff, 1.5, 40); ptC.position.set(0, 5, 12); scene.add(ptC);

    // Grid
    const grid = new THREE.GridHelper(30, 30, 0x1a2035, 0x1a2035);
    grid.position.y = -0.5; scene.add(grid);

    // Groups — OSI
    const layerGroup  = new THREE.Group(); scene.add(layerGroup);
    const deviceGroup = new THREE.Group(); scene.add(deviceGroup);
    const cableGroup  = new THREE.Group(); scene.add(cableGroup);
    // Groups — TCP/IP (hidden initially)
    const tcpLayerGroup  = new THREE.Group(); scene.add(tcpLayerGroup);  tcpLayerGroup.visible  = false;
    const tcpDeviceGroup = new THREE.Group(); scene.add(tcpDeviceGroup); tcpDeviceGroup.visible = false;
    const tcpCableGroup  = new THREE.Group(); scene.add(tcpCableGroup);  tcpCableGroup.visible  = false;

    // ── Helper: build device group ──
    function buildDeviceGroup(d, targetGroup) {
      const y = d.layer * (LAYER_H + LAYER_GAP) + LAYER_H * 0.5 + 0.35;
      const devGroup = makeDeviceGeometry(d.name, d.type);

      // Scale up 1.5× so devices are clearly visible above the layers
      devGroup.scale.setScalar(1.5);

      devGroup.traverse(child => {
        if (child.isMesh && child.material) {
          child.material = child.material.clone();

          const isGlowPart = child.material.emissiveIntensity >= 0.5;

          if (isGlowPart) {
            // LEDs e indicadores — mantener su color vivo pero más brillante
            child.material.emissiveIntensity = 1.5;
          } else {
            // Partes estructurales — blanco casi puro con tinte del color del dispositivo
            child.material.color            = new THREE.Color(0xffffff).lerp(new THREE.Color(d.color), 0.15);
            child.material.emissive         = new THREE.Color(d.color);
            child.material.emissiveIntensity = 0.4;
            child.material.shininess        = 120;
            child.material.specular         = new THREE.Color(0xffffff);
          }

          child.material.transparent = false;
          child.material.opacity     = 1.0;
          child.castShadow           = true;
        }
      });

      devGroup.position.set(d.pos[0], y, d.pos[2]);
      devGroup.userData = { type: 'device', data: d };
      targetGroup.add(devGroup);

      // Hitbox scaled to match
      const hitGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
      const mesh   = new THREE.Mesh(hitGeo, new THREE.MeshBasicMaterial({ visible: false }));
      mesh.position.set(d.pos[0], y, d.pos[2]);
      mesh.userData = { type: 'device', data: d };
      targetGroup.add(mesh);

      // Larger glow halo
      const sg = new THREE.Mesh(
        new THREE.SphereGeometry(1.0, 12, 12),
        new THREE.MeshPhongMaterial({ color: d.color, transparent: true, opacity: 0.08 }),
      );
      sg.position.copy(mesh.position);
      targetGroup.add(sg);

      const lbl = makeDevLabel(d.name, d.type || d.name.toLowerCase(), d.color);
      lbl.position.set(d.pos[0], y + 1.55, d.pos[2]);
      targetGroup.add(lbl);
      return { mesh, devGroup, d, baseY: y };
    }

    // ── Helper: build cables ──
    function buildCables(meshList, conns, targetGroup) {
      conns.forEach(([a, b]) => {
        if (a >= meshList.length || b >= meshList.length) return;
        const pa = meshList[a].mesh.position;
        const pb = meshList[b].mesh.position;
        const mid = new THREE.Vector3().lerpVectors(pa, pb, 0.5); mid.y += 0.3;
        const curve = new THREE.QuadraticBezierCurve3(pa.clone(), mid, pb.clone());
        const line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(curve.getPoints(20)),
          new THREE.LineBasicMaterial({ color: meshList[a].d.color, transparent: true, opacity: 0.4 }),
        );
        targetGroup.add(line);
      });
    }

    // ── Layers ──
    const layerMeshes = [];
    const layerBoxes  = [];
    OSI_LAYERS.forEach((l, i) => {
      const y = i * (LAYER_H + LAYER_GAP);
      const geo = new THREE.BoxGeometry(LAYER_W, LAYER_H, LAYER_D);
      const mat = new THREE.MeshPhongMaterial({
        color: l.hex, transparent: true, opacity: 0.18,
        side: THREE.DoubleSide, shininess: 60, specular: 0x334455,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(0, y, 0);
      mesh.receiveShadow = true;
      mesh.userData = { type: 'layer', data: l };
      layerGroup.add(mesh);
      layerMeshes.push(mesh);

      const edges = new THREE.EdgesGeometry(geo);
      mesh.add(new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: l.hex, transparent: true, opacity: 0.5 })));

      const lbl = makeLayerLabel(`${l.n} · ${l.name}`, l.hex, l.pdu);
      lbl.position.set(0, y + 0.7, LAYER_D / 2 + 0.1);
      scene.add(lbl);
      layerBoxes.push({ mesh, lbl, layer: l, baseY: y });
    });

    // ── OSI Devices ──
    const deviceMeshes = DEVICES.map(d => buildDeviceGroup(d, deviceGroup));
    buildCables(deviceMeshes, CABLE_CONNS, cableGroup);

    // ── TCP Layers ──
    const tcpLayerMeshes = [];
    const tcpLayerBoxes  = [];
    TCP_LAYERS.forEach((l, i) => {
      const y = i * (LAYER_H + LAYER_GAP);
      const geo = new THREE.BoxGeometry(LAYER_W, LAYER_H, LAYER_D);
      const mat = new THREE.MeshPhongMaterial({
        color: l.hex, transparent: true, opacity: 0.18,
        side: THREE.DoubleSide, shininess: 60, specular: 0x334455,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(0, y, 0);
      mesh.receiveShadow = true;
      mesh.userData = { type: 'layer', data: l };
      tcpLayerGroup.add(mesh);
      tcpLayerMeshes.push(mesh);

      const edges = new THREE.EdgesGeometry(geo);
      mesh.add(new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: l.hex, transparent: true, opacity: 0.5 })));

      const lbl = makeLayerLabel(`${l.n} · ${l.name}`, l.hex, l.pdu);
      lbl.position.set(0, y + 0.7, LAYER_D / 2 + 0.1);
      tcpLayerGroup.add(lbl);
      tcpLayerBoxes.push({ mesh, lbl, layer: l, baseY: y });
    });

    // ── TCP Devices ──
    const tcpDeviceMeshes = TCP_DEVICES.map(d => buildDeviceGroup(d, tcpDeviceGroup));
    buildCables(tcpDeviceMeshes, TCP_CABLE_CONNS, tcpCableGroup);

    // ── Expose TCP layer controls ──
    s.highlightTcpLayer = (layerIdx) => {
      tcpLayerMeshes.forEach((m, i) => {
        m.material.opacity = i === layerIdx ? 0.55 : 0.18;
        m.material.emissive = i === layerIdx ? new THREE.Color(TCP_LAYERS[i].hex) : new THREE.Color(0x000000);
        m.material.emissiveIntensity = i === layerIdx ? 0.3 : 0;
      });
    };
    s.clearTcpHighlights = () => {
      tcpLayerMeshes.forEach(m => { m.material.opacity = 0.18; m.material.emissiveIntensity = 0; });
    };

    // ── Model visibility switcher ──
    s.switchModel = (m) => {
      const isOsi = m === 'osi' || m === 'flow';
      const isTcp = m === 'tcp';
      layerGroup.visible  = isOsi; deviceGroup.visible  = isOsi; cableGroup.visible  = isOsi;
      tcpLayerGroup.visible = isTcp; tcpDeviceGroup.visible = isTcp; tcpCableGroup.visible = isTcp;
    };

    // ── Orbit state ──
    let theta = 0.6, phi = 0.9, radius = 26;
    const target = new THREE.Vector3(0, 7, 0);
    let isDragging = false, prevMouse = { x: 0, y: 0 };
    let camAnim = false, camTarget = null, camTargetLook = null;

    function updateCam() {
      camera.position.x = target.x + radius * Math.sin(phi) * Math.sin(theta);
      camera.position.y = target.y + radius * Math.cos(phi);
      camera.position.z = target.z + radius * Math.sin(phi) * Math.cos(theta);
      camera.lookAt(target);
    }

    // expose cam animator for React controls
    s.animateCam = (th, ph, r, tgt) => {
      camAnim = true;
      camTarget = { theta: th, phi: ph, radius: r };
      camTargetLook = tgt;
    };

    // ── Raycasting ──
    const raycaster = new THREE.Raycaster();
    const mouse2 = new THREE.Vector2();
    const allMeshes = () => [...layerMeshes, ...deviceMeshes.map(d => d.mesh)];

    function getHit(clientX, clientY) {
      mouse2.x = (clientX / innerWidth) * 2 - 1;
      mouse2.y = -(clientY / innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse2, camera);
      const hits = raycaster.intersectObjects(allMeshes());
      return hits.length > 0 ? hits[0] : null;
    }

    // Mouse events
    const onMouseDown = e => { if (e.button === 0) { isDragging = true; prevMouse = { x: e.clientX, y: e.clientY }; } };
    const onMouseUp   = () => { isDragging = false; };
    const onMouseMove = e => {
      if (isDragging) {
        theta -= (e.clientX - prevMouse.x) * 0.007;
        phi = Math.max(0.15, Math.min(1.45, phi + (e.clientY - prevMouse.y) * 0.007));
        prevMouse = { x: e.clientX, y: e.clientY };
        camAnim = false;
      }
      // Hover tooltip
      const hit = getHit(e.clientX, e.clientY);
      if (hit) {
        const ud = hit.object.userData;
        const text = ud.type === 'layer'
          ? `Capa ${ud.data.n} — ${ud.data.name} | PDU: ${ud.data.pdu}`
          : ud.data.name;
        s.setTooltip({ visible: true, x: e.clientX + 14, y: e.clientY - 10, text });
        canvas.style.cursor = 'pointer';
      } else {
        s.setTooltip({ visible: false, x: 0, y: 0, text: '' });
        canvas.style.cursor = 'default';
      }
    };
    // ── Layer isolation ──
    let isolatedLayerIdx = -1;  // -1 = todas visibles

    s.isolateLayer = (layerData) => {
      const isTcp    = s.currentModel === 'tcp';
      const boxes    = isTcp ? tcpLayerBoxes    : layerBoxes;
      const devList  = isTcp ? tcpDeviceMeshes  : deviceMeshes;
      const layers   = isTcp ? TCP_LAYERS       : OSI_LAYERS;

      // n va de 1..7 (OSI) o 1..4 (TCP), el array va de 0..N-1
      const idx = layerData.n - 1;
      if (idx < 0 || idx >= layers.length) return;

      // Si ya está aislada la misma, reset
      if (isolatedLayerIdx === idx) {
        s.resetLayers();
        return;
      }
      isolatedLayerIdx = idx;

      // Capas: ocultar todas excepto la seleccionada
      boxes.forEach((lb, i) => {
        const isSelected = i === idx;
        // Animar opacidad via material
        lb.mesh.material.transparent = true;
        lb.mesh.material.opacity     = isSelected ? 0.45 : 0.0;
        lb.mesh.material.emissive    = isSelected ? new THREE.Color(layers[i].hex) : new THREE.Color(0x000000);
        lb.mesh.material.emissiveIntensity = isSelected ? 0.25 : 0;
        lb.lbl.material.opacity      = isSelected ? 1.0  : 0.0;
        lb.mesh.visible              = isSelected;
        lb.lbl.visible               = isSelected;
        // Wireframe edges
        lb.mesh.children.forEach(c => { c.visible = isSelected; });
      });

      // Devices: mostrar solo los de la capa seleccionada
      devList.forEach(({ mesh, devGroup, d }) => {
        const belongs = d.layer === idx;
        mesh.visible    = belongs;
        if (devGroup) devGroup.visible = belongs;
        // buscar el label (sprite después del sg)
        const parent = isTcp ? tcpDeviceGroup : deviceGroup;
        // Labels están en el grupo — los sprites
        parent.children.forEach(child => {
          if (child.isSprite && child.position.x === mesh.position.x && child.position.z === mesh.position.z) {
            child.visible = belongs;
          }
        });
      });

      // Mover cámara a la capa seleccionada — centrada y cerca
      const targetY  = idx * (LAYER_H + LAYER_GAP);
      s.animateCam(theta, phi, 18, new THREE.Vector3(0, targetY, 0));
      s.setIsolatedLayer?.(layerData);
    };

    s.resetLayers = () => {
      isolatedLayerIdx = -1;
      const isTcp   = s.currentModel === 'tcp';
      const boxes   = isTcp ? tcpLayerBoxes   : layerBoxes;
      const devList = isTcp ? tcpDeviceMeshes : deviceMeshes;
      const layers  = isTcp ? TCP_LAYERS      : OSI_LAYERS;

      boxes.forEach((lb, i) => {
        lb.mesh.visible              = true;
        lb.lbl.visible               = true;
        lb.mesh.material.opacity     = 0.18;
        lb.mesh.material.emissive    = new THREE.Color(0x000000);
        lb.mesh.material.emissiveIntensity = 0;
        lb.lbl.material.opacity      = 1.0;
        lb.mesh.children.forEach(c => { c.visible = true; });
      });

      devList.forEach(({ mesh, devGroup }) => {
        mesh.visible = true;
        if (devGroup) devGroup.visible = true;
      });
      const parent = isTcp ? tcpDeviceGroup : deviceGroup;
      parent.children.forEach(child => { child.visible = true; });

      // Cámara vuelve a perspectiva general
      s.animateCam(0.6, 0.9, 26, new THREE.Vector3(0, 7, 0));
      s.setIsolatedLayer?.(null);
    };

    const onWheel = e => { radius = Math.max(8, Math.min(55, radius + e.deltaY * 0.03)); camAnim = false; e.preventDefault(); };
    const onClick = e => {
      const hit = getHit(e.clientX, e.clientY);
      if (hit) {
        const ud = hit.object.userData;
        let layer;
        if (ud.type === 'layer') {
          layer = ud.data;
        } else {
          const layers = s.currentModel === 'tcp' ? TCP_LAYERS : OSI_LAYERS;
          layer = layers[ud.data.layer] || ud.data;
        }
        // Abrir panel de info
        s.selectLayer(layer);
        // Aislar capa — o reset si es la misma
        s.isolateLayer(layer);
      } else {
        // Click en vacío — reset
        s.resetLayers();
      }
    };

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('wheel', onWheel, { passive: false });
    canvas.addEventListener('click', onClick);

    // ── Packets ──
    const packets = [];
    let lastSpawn = 0;
    function spawnPacket() {
      const activeMeshes = s.currentModel === 'tcp' ? tcpDeviceMeshes : deviceMeshes;
      const activeConns  = s.currentModel === 'tcp' ? TCP_CABLE_CONNS : CABLE_CONNS;
      const activeLayers = s.currentModel === 'tcp' ? TCP_LAYERS : OSI_LAYERS;
      if (!activeMeshes.length) return;
      const idx = Math.floor(Math.random() * activeConns.length);
      const [si, ei] = activeConns[idx];
      if (si >= activeMeshes.length || ei >= activeMeshes.length) return;
      const start = activeMeshes[si].mesh.position.clone();
      const end   = activeMeshes[ei].mesh.position.clone();
      const col   = activeLayers[activeMeshes[si].d.layer]?.hex ?? 0x4f8ef7;
      const geo   = new THREE.SphereGeometry(0.14, 8, 8);
      const mat   = new THREE.MeshPhongMaterial({ color: col, emissive: col, emissiveIntensity: 0.9, transparent: true, opacity: 0.95 });
      const mesh  = new THREE.Mesh(geo, mat);
      mesh.position.copy(start);
      scene.add(mesh);
      const mid = new THREE.Vector3().lerpVectors(start, end, 0.5); mid.y += 0.8 + Math.random() * 0.5;
      packets.push({ mesh, curve: new THREE.QuadraticBezierCurve3(start, mid, end), t: 0, speed: 0.004 + Math.random() * 0.006 });
    }

    // ── Flow packet ──
    let flowPkt = null;
    s.spawnFlowPacket = (layerIdx) => {
      if (flowPkt) { scene.remove(flowPkt.mesh); flowPkt = null; }
      const l = OSI_LAYERS[layerIdx];
      const y = layerIdx * (LAYER_H + LAYER_GAP) + LAYER_H / 2;
      const geo = new THREE.SphereGeometry(0.22, 12, 12);
      const mat = new THREE.MeshPhongMaterial({ color: l.hex, emissive: l.hex, emissiveIntensity: 1, transparent: true, opacity: 1 });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
      const start = new THREE.Vector3(-6, y, 0), end = new THREE.Vector3(6, y, 0);
      const mid = new THREE.Vector3(0, y + 1.5, 0);
      flowPkt = { mesh, curve: new THREE.QuadraticBezierCurve3(start, mid, end), t: 0, speed: 0.008 };
    };
    s.clearFlowPacket = () => {
      if (flowPkt) { scene.remove(flowPkt.mesh); flowPkt = null; }
      layerMeshes.forEach(m => { m.material.opacity = 0.18; m.material.emissiveIntensity = 0; });
    };
    s.highlightLayer = (layerIdx) => {
      layerMeshes.forEach((m, i) => {
        m.material.opacity = i === layerIdx ? 0.55 : 0.18;
        m.material.emissive = i === layerIdx ? new THREE.Color(OSI_LAYERS[i].hex) : new THREE.Color(0x000000);
        m.material.emissiveIntensity = i === layerIdx ? 0.3 : 0;
      });
    };

    // ── Animation loop ──
    const clock = new THREE.Clock();
    let rafId;
    function animate() {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (camAnim && camTarget) {
        theta  += (camTarget.theta  - theta)  * 0.08;
        phi    += (camTarget.phi    - phi)    * 0.08;
        radius += (camTarget.radius - radius) * 0.08;
        if (camTargetLook) target.lerp(camTargetLook, 0.08);
      }
      updateCam();

      layerBoxes.forEach((lb, i) => {
        const wave = Math.sin(t * 0.6 + i * 0.5) * 0.04;
        lb.mesh.position.y = lb.baseY + wave;
        lb.lbl.position.y  = lb.baseY + 0.7 + wave;
      });
      tcpLayerBoxes.forEach((lb, i) => {
        const wave = Math.sin(t * 0.6 + i * 0.5) * 0.04;
        lb.mesh.position.y = lb.baseY + wave;
        lb.lbl.position.y  = lb.baseY + 0.7 + wave;
      });
      deviceMeshes.forEach(({ mesh, devGroup, baseY }, i) => {
        const bobY = baseY + Math.sin(t * 0.9 + i * 1.1) * 0.06;
        mesh.position.y = bobY;
        if (devGroup) { devGroup.position.y = bobY; devGroup.rotation.y = t * 0.25 + i * 0.4; }
      });
      tcpDeviceMeshes.forEach(({ mesh, devGroup, baseY }, i) => {
        const bobY = baseY + Math.sin(t * 0.9 + i * 1.1) * 0.06;
        mesh.position.y = bobY;
        if (devGroup) { devGroup.position.y = bobY; devGroup.rotation.y = t * 0.25 + i * 0.4; }
      });

      // ambient packets (non-flow mode)
      if (!s.flowMode && t - lastSpawn > 1.2) { lastSpawn = t; spawnPacket(); }
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i]; p.t += p.speed;
        if (p.t >= 1) { scene.remove(p.mesh); packets.splice(i, 1); }
        else p.mesh.position.copy(p.curve.getPoint(p.t));
      }

      if (flowPkt) {
        flowPkt.t += flowPkt.speed;
        if (flowPkt.t >= 1) flowPkt.t = 0;
        flowPkt.mesh.position.copy(flowPkt.curve.getPoint(flowPkt.t));
      }

      ptA.position.x = Math.sin(t * 0.4) * 8;
      ptB.position.z = Math.cos(t * 0.35) * 8;
      ptC.position.x = Math.cos(t * 0.28) * 6;

      renderer.render(scene, camera);
    }
    animate();

    // Resize
    const onResize = () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    };
    window.addEventListener('resize', onResize);

    // Expose camera view setter
    const VIEWS = {
      persp: { theta: 0.6, phi: 0.9, radius: 26, ty: 7 },
      front: { theta: Math.PI / 2, phi: 1.1, radius: 28, ty: 7 },
      top:   { theta: 0, phi: 0.05, radius: 28, ty: 7 },
      side:  { theta: 0, phi: 1.1, radius: 28, ty: 7 },
      iso:   { theta: Math.PI / 4, phi: 0.7, radius: 30, ty: 7 },
    };
    s.setCamView = (v) => {
      const vd = VIEWS[v];
      if (!vd) return;
      s.animateCam(vd.theta, vd.phi, vd.radius, new THREE.Vector3(0, vd.ty, 0));
    };

    s.flowMode = false;
    s.currentModel = 'osi';

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('wheel', onWheel);
      canvas.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  const [isolatedLayer, setIsolatedLayer] = useState(null);

  // Wire up React → Three.js callbacks
  useEffect(() => { stateRef.current.selectLayer = setSelectedLayer; }, []);
  useEffect(() => { stateRef.current.setTooltip  = setTooltip; }, []);
  useEffect(() => { stateRef.current.setIsolatedLayer = setIsolatedLayer; }, []);

  // ─── Camera view handler ────────────────────────────────────────────────────
  const handleCamView = (v) => {
    setCamView(v);
    stateRef.current.setCamView?.(v);
  };

  // ─── Model switch ───────────────────────────────────────────────────────────
  const handleModel = (m) => {
    setModel(m);
    stateRef.current.flowMode     = m === 'flow';
    stateRef.current.currentModel = m;
    stateRef.current.resetLayers?.();
    stateRef.current.switchModel?.(m);
    if (m !== 'flow') {
      setFlowStep(-1);
      setFlowTxt('');
      stateRef.current.clearFlowPacket?.();
    }
    setSelectedLayer(null);
  };

  // ─── Flow controls ──────────────────────────────────────────────────────────
  const applyFlowStep = useCallback((i) => {
    const s = stateRef.current;
    const step = FLOW_STEPS[i];
    if (!step) return;
    setFlowTxt(step.txt);
    if (step.layer >= 0) {
      s.highlightLayer?.(step.layer);
      s.spawnFlowPacket?.(step.layer);
    } else {
      s.clearFlowPacket?.();
    }
  }, []);

  const flowNext = () => {
    const next = flowStep + 1;
    if (next < FLOW_STEPS.length) { setFlowStep(next); applyFlowStep(next); }
  };
  const flowPrev = () => {
    const prev = flowStep - 1;
    if (prev >= 0) { setFlowStep(prev); applyFlowStep(prev); }
    else { setFlowStep(-1); setFlowTxt(''); stateRef.current.clearFlowPacket?.(); }
  };
  const flowReset = () => {
    setFlowStep(-1); setFlowTxt('');
    stateRef.current.clearFlowPacket?.();
  };

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div
      className="osi3d-root"
      style={{
        position: 'fixed',
        top: '68px',
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        background: '#080b12',
      }}
    >
      {/* Canvas */}
      <canvas ref={canvasRef} className="osi3d-canvas" />

      {/* Layer selector — derecha, no tapa el navbar */}
      <div className="osi3d-layers">
        {(model === 'tcp' ? TCP_LAYERS : OSI_LAYERS).map(l => {
          const isActive = isolatedLayer?.n === l.n;
          const isHidden = isolatedLayer && !isActive;
          return (
            <div
              key={l.n}
              className={`osi3d-layer-item ${isActive ? 'active' : ''} ${isHidden ? 'hidden' : ''}`}
              style={{ '--layer-color': l.css }}
              onClick={() => {
                setSelectedLayer(l);
                stateRef.current.isolateLayer?.(l);
              }}
            >
              <span className="osi3d-layer-dot" style={{ background: l.css }} />
              <span className="osi3d-layer-name">{l.n}. {l.name}</span>
              {isActive && (
                <button
                  className="osi3d-layer-reset"
                  onClick={e => {
                    e.stopPropagation();
                    stateRef.current.resetLayers?.();
                    setSelectedLayer(null);
                  }}
                >✕</button>
              )}
            </div>
          );
        })}
      </div>

      {/* Tooltip */}
      {tooltip.visible && (
        <div className="osi3d-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          {tooltip.text}
        </div>
      )}

      {/* Hint cuando no hay nada aislado */}
      {!isolatedLayer && (
        <div className="osi3d-hint">Clic en una capa para aislarla</div>
      )}
      <div className="osi3d-bottombar">
        {/* Model tabs */}
        <div className="osi3d-model-tabs">
          {[['osi', 'Modelo OSI'], ['tcp', 'TCP/IP'], ['flow', 'Flujo']].map(([id, label]) => (
            <button
              key={id}
              className={`osi3d-mbtn ${model === id ? 'active' : ''}`}
              onClick={() => handleModel(id)}
            >{label}</button>
          ))}
        </div>

        <div className="osi3d-bottombar__sep" />

        {/* Camera views */}
        {[['persp','Perspectiva'],['front','Frente'],['top','Superior'],['side','Lateral'],['iso','Iso']].map(([id, label]) => (
          <button
            key={id}
            className={`osi3d-cbtn ${camView === id ? 'active' : ''}`}
            onClick={() => handleCamView(id)}
          >{label}</button>
        ))}
      </div>

      {/* Flow controls */}
      {model === 'flow' && (
        <>
          <div className="osi3d-flowctrl">
            <button className="osi3d-fbtn osi3d-fbtn--reset" onClick={flowReset}>↺</button>
            <button className="osi3d-fbtn osi3d-fbtn--prev"  onClick={flowPrev}>← Atrás</button>
            <button className="osi3d-fbtn osi3d-fbtn--next"  onClick={flowNext}>Siguiente →</button>
            <span className="osi3d-step-info">
              {flowStep < 0 ? 0 : flowStep + 1} / {FLOW_STEPS.length}
            </span>
          </div>
          {flowTxt && (
            <div className="osi3d-flow-info">{flowTxt}</div>
          )}
        </>
      )}

      {/* Side Panel */}
      <OSIPanel layer={selectedLayer} onClose={() => {
        setSelectedLayer(null);
        stateRef.current.resetLayers?.();
      }} />
    </div>
  );
}