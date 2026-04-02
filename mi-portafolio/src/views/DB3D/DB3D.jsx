import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import {
  DB_COMPONENTS, DB_MODES,
  QUERY_STEPS, TRX_STEPS, SCAN_STEPS,
} from './db.data';
import DBPanel from './DBPanel';
import FlowDiagram from './FlowDiagram';
import './DB3D.css';

// ─── Posiciones de edificios en la ciudad ─────────────────────────────────────
const CITY_LAYOUT = [
  { id: 'disk',      x: -9,   z:  3.5, w: 3.5, d: 3.5 },
  { id: 'buffer',    x: -2,   z:  4,   w: 4.5, d: 3.5 },
  { id: 'btree',     x:  6,   z:  3.5, w: 3.5, d: 3.5 },
  { id: 'wal',       x: -9,   z: -3.5, w: 3.5, d: 3.0 },
  { id: 'trx',       x: -1.5, z: -3.5, w: 4.5, d: 3.0 },
  { id: 'optimizer', x:  6,   z: -3.5, w: 3.5, d: 3.0 },
];

const ROADS = [
  ['disk','buffer'], ['buffer','btree'],
  ['wal','trx'],     ['trx','optimizer'],
  ['disk','wal'],    ['buffer','trx'],
  ['btree','optimizer'], ['buffer','optimizer'],
];

// ─── Chip label sprite ────────────────────────────────────────────────────────
function makeBuildingLabel(comp) {
  const c = document.createElement('canvas'); c.width = 340; c.height = 110;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 340, 110);
  const col = '#' + comp.hex.toString(16).padStart(6, '0');

  ctx.fillStyle = 'rgba(4,6,16,0.88)';
  ctx.beginPath(); ctx.roundRect(4, 4, 332, 102, 8); ctx.fill();
  ctx.strokeStyle = col + '77'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.roundRect(4, 4, 332, 102, 8); ctx.stroke();

  // badge
  ctx.fillStyle = col + '2a';
  ctx.beginPath(); ctx.roundRect(12, 12, 52, 20, 5); ctx.fill();
  ctx.fillStyle = col;
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(comp.short, 38, 26);

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 17px "Segoe UI", system-ui';
  ctx.textAlign = 'left';
  ctx.fillText(comp.name, 12, 60);

  ctx.fillStyle = 'rgba(255,255,255,0.32)';
  ctx.font = '11px "JetBrains Mono", monospace';
  ctx.fillText(comp.fn.split(',')[0].trim().slice(0, 36), 12, 82);

  const tex = new THREE.CanvasTexture(c);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  s.scale.set(4.0, 1.3, 1);
  return s;
}

// ─── Edificio 3D por componente ───────────────────────────────────────────────
function makeBuilding(comp, w, d) {
  const group = new THREE.Group();
  const col   = comp.hex;
  const colV  = new THREE.Color(col);

  const buildingConfigs = {
    disk: () => {
      const mat = new THREE.MeshPhongMaterial({ color: 0x2a3a50, shininess: 60 });
      for (let i = 0; i < 3; i++) {
        const h = 1.2 + i * 0.4;
        const r = 0.7 - i * 0.08;
        const silo = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 20), mat.clone());
        silo.position.set(-0.8 + i * 0.85, h / 2, 0);
        silo.material.color = new THREE.Color(col).lerp(new THREE.Color(0x2a3a55), 0.3 + i * 0.1);
        group.add(silo);
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(r + 0.04, 0.05, 6, 24),
          new THREE.MeshPhongMaterial({ color: col, emissive: col, emissiveIntensity: 1.2 })
        );
        ring.rotation.x = Math.PI / 2;
        ring.position.set(-0.8 + i * 0.85, h - 0.15, 0);
        group.add(ring);
      }
    },
    buffer: () => {
      const base = new THREE.Mesh(
        new THREE.BoxGeometry(w * 0.85, 3.5, d * 0.85),
        new THREE.MeshPhongMaterial({ color: 0x1a3560, shininess: 80 })
      );
      base.position.y = 1.75;
      group.add(base);
      for (let floor = 0; floor < 5; floor++) {
        for (let win = 0; win < 6; win++) {
          const on = Math.random() > 0.2;
          const window = new THREE.Mesh(
            new THREE.BoxGeometry(0.28, 0.22, 0.05),
            new THREE.MeshPhongMaterial({
              color: on ? col : 0x0a1830,
              emissive: on ? col : 0x000000,
              emissiveIntensity: on ? 1.2 : 0,
            })
          );
          window.position.set(-0.82 + win * 0.33, 0.5 + floor * 0.58, d * 0.43);
          group.add(window);
        }
      }
      const antenna = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 1.2, 6),
        new THREE.MeshPhongMaterial({ color: 0x6688aa })
      );
      antenna.position.set(0, 3.5 + 0.6, 0);
      group.add(antenna);
      const beacon = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 8, 8),
        new THREE.MeshPhongMaterial({ color: col, emissive: col, emissiveIntensity: 2.0 })
      );
      beacon.position.set(0, 4.3, 0);
      group.add(beacon);
    },
    btree: () => {
      const rootH = 3.2;
      const root = new THREE.Mesh(
        new THREE.BoxGeometry(1.4, rootH, 1.4),
        new THREE.MeshPhongMaterial({ color: 0x144428, shininess: 60 })
      );
      root.position.y = rootH / 2;
      group.add(root);
      const roof = new THREE.Mesh(
        new THREE.ConeGeometry(1.1, 0.7, 4),
        new THREE.MeshPhongMaterial({ color: col, emissive: col, emissiveIntensity: 0.9 })
      );
      roof.position.y = rootH + 0.35;
      roof.rotation.y = Math.PI / 4;
      group.add(roof);
      [[-1.2, -1.1], [1.2, -1.1]].forEach(([lx, lz]) => {
        const lh = 1.6;
        const leaf = new THREE.Mesh(
          new THREE.BoxGeometry(1.0, lh, 1.0),
          new THREE.MeshPhongMaterial({ color: 0x1a5530, shininess: 50 })
        );
        leaf.position.set(lx, lh / 2, lz);
        group.add(leaf);
        const conn = new THREE.Mesh(
          new THREE.BoxGeometry(0.08, 0.08, Math.abs(lz) * 0.9),
          new THREE.MeshPhongMaterial({ color: col, emissive: col, emissiveIntensity: 1.0 })
        );
        conn.position.set(lx * 0.5, lh - 0.1, lz * 0.45);
        group.add(conn);
      });
    },
    wal: () => {
      const h = 2.8;
      const body = new THREE.Mesh(
        new THREE.CylinderGeometry(1.4, 1.4, h, 24),
        new THREE.MeshPhongMaterial({ color: 0x3d1e00, shininess: 60 })
      );
      body.position.y = h / 2;
      group.add(body);
      for (let i = 0; i < 8; i++) {
        const stripe = new THREE.Mesh(
          new THREE.CylinderGeometry(1.44, 1.44, 0.07, 24, 1, true),
          new THREE.MeshPhongMaterial({ color: col, emissive: col, emissiveIntensity: i % 2 === 0 ? 1.2 : 0.3, transparent: true, opacity: 0.9 })
        );
        stripe.position.y = 0.25 + i * 0.32;
        group.add(stripe);
      }
      const cap = new THREE.Mesh(
        new THREE.CylinderGeometry(1.4, 1.4, 0.14, 24),
        new THREE.MeshPhongMaterial({ color: col, emissive: col, emissiveIntensity: 1.0 })
      );
      cap.position.y = h + 0.07;
      group.add(cap);
    },
    trx: () => {
      const h = 3.8;
      const body = new THREE.Mesh(
        new THREE.CylinderGeometry(1.3, 1.4, h, 6),
        new THREE.MeshPhongMaterial({ color: 0x280d55, shininess: 80 })
      );
      body.position.y = h / 2;
      group.add(body);
      for (let i = 0; i < 6; i++) {
        const floor = new THREE.Mesh(
          new THREE.CylinderGeometry(1.34, 1.34, 0.07, 6),
          new THREE.MeshPhongMaterial({ color: col, emissive: col, emissiveIntensity: 1.0 - i * 0.08 })
        );
        floor.position.y = 0.4 + i * 0.56;
        group.add(floor);
      }
      const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 1.0, 6),
        new THREE.MeshPhongMaterial({ color: 0xaa88dd })
      );
      pole.position.y = h + 0.5;
      group.add(pole);
      const tip = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 8, 8),
        new THREE.MeshPhongMaterial({ color: col, emissive: col, emissiveIntensity: 2.0 })
      );
      tip.position.y = h + 1.1;
      group.add(tip);
    },
    optimizer: () => {
      const base = new THREE.Mesh(
        new THREE.BoxGeometry(w * 0.7, 1.2, d * 0.7),
        new THREE.MeshPhongMaterial({ color: 0x3a2800, shininess: 70 })
      );
      base.position.y = 0.6;
      group.add(base);
      const pyramid = new THREE.Mesh(
        new THREE.ConeGeometry(w * 0.38, 3.0, 4),
        new THREE.MeshPhongMaterial({ color: 0x4a3500, emissive: col, emissiveIntensity: 0.5, shininess: 90 })
      );
      pyramid.position.y = 1.2 + 1.5;
      pyramid.rotation.y = Math.PI / 4;
      group.add(pyramid);
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(pyramid.geometry),
        new THREE.LineBasicMaterial({ color: col })
      );
      edges.position.copy(pyramid.position);
      edges.rotation.copy(pyramid.rotation);
      group.add(edges);
      const tip = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 8, 8),
        new THREE.MeshPhongMaterial({ color: col, emissive: col, emissiveIntensity: 2.5 })
      );
      tip.position.y = 1.2 + 3.0 + 0.14;
      group.add(tip);
    },
  };

  if (buildingConfigs[comp.id]) buildingConfigs[comp.id]();

  // Base / foundation para todos
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(w * 0.92, 0.12, d * 0.92),
    new THREE.MeshPhongMaterial({ color: col, emissive: col, emissiveIntensity: 0.15 })
  );
  base.position.y = 0.06;
  group.add(base);

  return group;
}

// ─── Carretera entre edificios ─────────────────────────────────────────────────
function makeRoad(p1, p2, color) {
  const mid = new THREE.Vector3(p1.x, 0.02, p2.z);
  const pts = [p1.clone().setY(0.02), mid, p2.clone().setY(0.02)];
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.3 }));
  return line;
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function DB3D() {
  const canvasRef  = useRef(null);
  const stateRef   = useRef({});
  const [selected,  setSelected]  = useState(null);
  const [tooltip,   setTooltip]   = useState({ visible: false, x: 0, y: 0, text: '' });
  const [mode,      setMode]      = useState('architecture');
  const [camView,   setCamView]   = useState('persp');
  const [step,      setStep]      = useState(-1);
  const [stepTxt,   setStepTxt]   = useState('');
  const [stepSQL,   setStepSQL]   = useState('');
  const [isolated,  setIsolated]  = useState(null);
  const [scanData,  setScanData]  = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const s = stateRef.current;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(innerWidth, innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x02040c);
    scene.fog = new THREE.FogExp2(0x02040c, 0.022);

    const camera = new THREE.PerspectiveCamera(48, innerWidth / innerHeight, 0.1, 200);
    camera.position.set(0, 20, 22);
    camera.lookAt(0, 0, 0);

    // ── Luces — máxima visibilidad ──
    scene.add(new THREE.AmbientLight(0x8899cc, 3.5));
    const dir = new THREE.DirectionalLight(0xffffff, 2.0);
    dir.position.set(5, 20, 10); dir.castShadow = true; scene.add(dir);
    const dir2 = new THREE.DirectionalLight(0xaabbff, 1.5);
    dir2.position.set(-10, 15, -5); scene.add(dir2);

    // Luz cenital blanca fuerte
    const top = new THREE.DirectionalLight(0xffffff, 1.8);
    top.position.set(0, 30, 0); scene.add(top);

    // Por cada edificio: luz puntual intensa encima y una rasante
    DB_COMPONENTS.forEach((comp) => {
      const layout = CITY_LAYOUT.find(l => l.id === comp.id);
      if (!layout) return;
      const pt1 = new THREE.PointLight(comp.hex, 12, 16);
      pt1.position.set(layout.x, 7, layout.z);
      scene.add(pt1);
      const pt2 = new THREE.PointLight(0xffffff, 6, 10);
      pt2.position.set(layout.x, 1, layout.z);
      scene.add(pt2);
    });

    const fill = new THREE.HemisphereLight(0x6688cc, 0x334455, 2.5);
    scene.add(fill);

    // ── Suelo de ciudad — visible ──
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 40),
      new THREE.MeshPhongMaterial({ color: 0x0a1020, shininess: 20, specular: 0x1a2040 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    ground.receiveShadow = true;
    scene.add(ground);

    // Grid de ciudad visible
    const gridHelper = new THREE.GridHelper(50, 25, 0x1e3a5a, 0x0f1e35);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    // Bloque de asfalto central entre filas
    const asphalt = new THREE.Mesh(
      new THREE.BoxGeometry(30, 0.06, 2.5),
      new THREE.MeshPhongMaterial({ color: 0x0d1525, shininess: 40 })
    );
    asphalt.position.set(0, 0.03, 0);
    scene.add(asphalt);

    // Líneas de carretera amarillas
    for (let x = -12; x <= 12; x += 2.8) {
      const ln = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.02, 0.14),
        new THREE.MeshPhongMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 0.8 })
      );
      ln.position.set(x, 0.04, 0);
      scene.add(ln);
    }

    // Farolas
    [-11, -5.5, 0, 5.5, 11].forEach(x => {
      [-1.8, 1.8].forEach(z => {
        const pole = new THREE.Mesh(
          new THREE.CylinderGeometry(0.05, 0.05, 2.5, 6),
          new THREE.MeshPhongMaterial({ color: 0x445566 })
        );
        pole.position.set(x, 1.25, z);
        scene.add(pole);
        const lamp = new THREE.Mesh(
          new THREE.SphereGeometry(0.14, 8, 8),
          new THREE.MeshPhongMaterial({ color: 0xfef9c3, emissive: 0xfef9c3, emissiveIntensity: 1.5 })
        );
        lamp.position.set(x, 2.6, z);
        scene.add(lamp);
        const ptLamp = new THREE.PointLight(0xfef9c3, 1.2, 6);
        ptLamp.position.set(x, 2.5, z);
        scene.add(ptLamp);
      });
    });

    // ── Edificios ──
    const buildingMeshes = {};
    const buildingGroup = new THREE.Group(); scene.add(buildingGroup);
    const roadGroup = new THREE.Group(); scene.add(roadGroup);

    CITY_LAYOUT.forEach(layout => {
      const comp = DB_COMPONENTS.find(c => c.id === layout.id);
      if (!comp) return;

      const bldg = makeBuilding(comp, layout.w, layout.d);
      bldg.position.set(layout.x, 0, layout.z);
      bldg.userData = { type: 'building', comp };
      buildingGroup.add(bldg);

      // Hitbox invisible
      const hit = new THREE.Mesh(
        new THREE.BoxGeometry(layout.w, 5, layout.d),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      hit.position.set(layout.x, 2.5, layout.z);
      hit.userData = { type: 'building', comp };
      scene.add(hit);

      // Label flotante
      const lbl = makeBuildingLabel(comp);
      lbl.position.set(layout.x, 6.5, layout.z);
      scene.add(lbl);

      buildingMeshes[comp.id] = { bldg, hit, lbl, layout, comp };
    });

    // ── Carreteras de datos ──
    ROADS.forEach(([idA, idB]) => {
      const a = CITY_LAYOUT.find(c => c.id === idA);
      const b = CITY_LAYOUT.find(c => c.id === idB);
      const compA = DB_COMPONENTS.find(c => c.id === idA);
      if (!a || !b || !compA) return;
      const road = makeRoad(
        new THREE.Vector3(a.x, 0, a.z),
        new THREE.Vector3(b.x, 0, b.z),
        compA.hex
      );
      roadGroup.add(road);
    });

    // ── Paquetes de datos (coches de luz) ──
    const packets = []; let lastSpawn = 0;
    function spawnPacket() {
      const [idA, idB] = ROADS[Math.floor(Math.random() * ROADS.length)];
      const a = CITY_LAYOUT.find(c => c.id === idA);
      const b = CITY_LAYOUT.find(c => c.id === idB);
      const compA = DB_COMPONENTS.find(c => c.id === idA);
      if (!a || !b) return;
      const col = compA.hex;
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, 0.1, 0.12),
        new THREE.MeshPhongMaterial({ color: col, emissive: col, emissiveIntensity: 1.5 })
      );
      // Luz de "faro"
      const light = new THREE.PointLight(col, 1.5, 3);
      mesh.add(light);
      const p1 = new THREE.Vector3(a.x, 0.12, a.z);
      const p2 = new THREE.Vector3(b.x, 0.12, b.z);
      const mid = new THREE.Vector3(p1.x, 0.12, p2.z);
      const curve = new THREE.CatmullRomCurve3([p1, mid, p2]);
      mesh.position.copy(p1);
      scene.add(mesh);
      packets.push({ mesh, curve, t: 0, speed: 0.007 + Math.random() * 0.007 });
    }

    // ── Orbit controls ──
    let theta = 0.3, phi = 0.65, radius = 28;
    let isDragging = false, prevMouse = { x: 0, y: 0 };
    let camAnim = false, camTarget = null, camTargetLook = null;
    const camLook = new THREE.Vector3(0, 0, 0);

    function updateCam() {
      camera.position.x = camLook.x + radius * Math.sin(phi) * Math.sin(theta);
      camera.position.y = camLook.y + radius * Math.cos(phi);
      camera.position.z = camLook.z + radius * Math.sin(phi) * Math.cos(theta);
      camera.lookAt(camLook);
    }

    s.animateCam = (th, ph, r, tgt) => { camAnim = true; camTarget = { theta: th, phi: ph, radius: r }; camTargetLook = tgt; };
    s.setCamView = (v) => {
      const views = {
        persp: { theta: 0.3,         phi: 0.65, radius: 28, ty: 1 },
        top:   { theta: 0,           phi: 0.08, radius: 28, ty: 1 },
        front: { theta: Math.PI / 2, phi: 0.85, radius: 26, ty: 2 },
        side:  { theta: 0,           phi: 0.85, radius: 26, ty: 2 },
        iso:   { theta: Math.PI / 4, phi: 0.5,  radius: 30, ty: 1 },
      };
      const vd = views[v]; if (!vd) return;
      s.animateCam(vd.theta, vd.phi, vd.radius, new THREE.Vector3(0, vd.ty, 0));
    };

    // ── Raycaster ──
    const raycaster = new THREE.Raycaster(), mouse2 = new THREE.Vector2();
    const hitMeshes = Object.values(buildingMeshes).map(b => b.hit);

    function getHit(cx, cy) {
      mouse2.x = (cx / innerWidth) * 2 - 1;
      mouse2.y = -(cy / innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse2, camera);
      const hits = raycaster.intersectObjects(hitMeshes);
      return hits.length > 0 ? hits[0] : null;
    }

    const onMouseDown = e => { if (e.button === 0) { isDragging = true; prevMouse = { x: e.clientX, y: e.clientY }; } };
    const onMouseUp   = () => { isDragging = false; };
    const onMouseMove = e => {
      if (isDragging) {
        theta -= (e.clientX - prevMouse.x) * 0.007;
        phi = Math.max(0.1, Math.min(1.4, phi + (e.clientY - prevMouse.y) * 0.007));
        prevMouse = { x: e.clientX, y: e.clientY };
        camAnim = false;
      }
      const hit = getHit(e.clientX, e.clientY);
      if (hit) {
        s.setTooltip({ visible: true, x: e.clientX + 14, y: e.clientY - 10, text: `${hit.object.userData.comp.short} — ${hit.object.userData.comp.name}` });
        canvas.style.cursor = 'pointer';
      } else {
        s.setTooltip({ visible: false, x: 0, y: 0, text: '' });
        canvas.style.cursor = 'default';
      }
    };
    const onWheel = e => { radius = Math.max(8, Math.min(55, radius + e.deltaY * 0.03)); camAnim = false; e.preventDefault(); };
    const onClick = e => {
      const hit = getHit(e.clientX, e.clientY);
      if (hit) {
        const comp = hit.object.userData.comp;
        s.selectComp(comp);
        s.isolateBuilding(comp);
        const layout = CITY_LAYOUT.find(l => l.id === comp.id);
        if (layout) s.animateCam(theta, 0.55, 14, new THREE.Vector3(layout.x, 2, layout.z));
      } else {
        s.resetBuildings();
      }
    };

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup',   onMouseUp);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('wheel', onWheel, { passive: false });
    canvas.addEventListener('click', onClick);

    // ── Isolation ──
    s.isolateBuilding = (comp) => {
      Object.values(buildingMeshes).forEach(({ bldg, lbl, comp: c }) => {
        const isTarget = c.id === comp.id;
        bldg.traverse(child => {
          if (child.isMesh && child.material) {
            child.material = child.material.clone();
            child.material.transparent = true;
            child.material.opacity = isTarget ? 1.0 : 0.15;
            if (!isTarget) child.material.emissiveIntensity = 0;
          }
        });
        lbl.material.opacity = isTarget ? 1 : 0.08;
      });
      s.setIsolated(comp);
    };
    s.resetBuildings = () => {
      Object.values(buildingMeshes).forEach(({ bldg, lbl }) => {
        bldg.traverse(child => {
          if (child.isMesh && child.material) {
            child.material = child.material.clone();
            child.material.transparent = false;
            child.material.opacity = 1;
          }
        });
        lbl.material.opacity = 1;
      });
      s.animateCam(0.3, 0.65, 28, new THREE.Vector3(0, 0, 0));
      s.setIsolated(null);
    };

    s.highlightComp = (compId) => {
      Object.values(buildingMeshes).forEach(({ bldg, comp: c }) => {
        const isTarget = c.id === compId;
        bldg.traverse(child => {
          if (child.isMesh && child.material) {
            child.material = child.material.clone();
            child.material.transparent = !isTarget;
            child.material.opacity = isTarget ? 1 : 0.2;
            if (isTarget && child.material.emissiveIntensity > 0) {
              child.material.emissiveIntensity = Math.min(child.material.emissiveIntensity * 2, 2.0);
            }
          }
        });
      });
    };
    s.clearHighlight = () => {
      Object.values(buildingMeshes).forEach(({ bldg }) => {
        bldg.traverse(child => {
          if (child.isMesh && child.material) {
            child.material = child.material.clone();
            child.material.transparent = false;
            child.material.opacity = 1;
          }
        });
      });
    };

    // ── Animation loop ──
    const clock = new THREE.Clock(); let rafId;
    function animate() {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (camAnim && camTarget) {
        theta  += (camTarget.theta  - theta)  * 0.08;
        phi    += (camTarget.phi    - phi)    * 0.08;
        radius += (camTarget.radius - radius) * 0.08;
        if (camTargetLook) camLook.lerp(camTargetLook, 0.08);
      }
      updateCam();

      // Pulso de luces en edificios (efecto ciudad viva)
      Object.values(buildingMeshes).forEach(({ bldg, comp: c }, idx) => {
        const pulse = Math.sin(t * 1.5 + idx * 0.9) * 0.15 + 0.85;
        bldg.traverse(child => {
          if (child.isMesh && child.material?.emissiveIntensity > 0.3) {
            child.material.emissiveIntensity = child.material.emissiveIntensity * 0.97 + pulse * 0.03;
          }
        });
        // Etiquetas flotan suavemente
        const lbl = buildingMeshes[c.id]?.lbl;
        if (lbl) lbl.position.y = 6.5 + Math.sin(t * 0.6 + idx * 1.2) * 0.15;
      });

      // Paquetes/coches
      if (t - lastSpawn > 0.85) { lastSpawn = t; spawnPacket(); }
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i]; p.t += p.speed;
        if (p.t >= 1) { scene.remove(p.mesh); packets.splice(i, 1); }
        else {
          p.mesh.position.copy(p.curve.getPoint(p.t));
          // Orientar el coche en la dirección del movimiento
          if (p.t < 0.99) {
            const next = p.curve.getPoint(Math.min(p.t + 0.01, 1));
            p.mesh.lookAt(next);
          }
        }
      }

      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mouseup',   onMouseUp);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('wheel',     onWheel);
      canvas.removeEventListener('click',     onClick);
      window.removeEventListener('resize',    onResize);
      renderer.dispose();
    };
  }, []);

  useEffect(() => { stateRef.current.selectComp    = setSelected;  }, []);
  useEffect(() => { stateRef.current.setTooltip    = setTooltip;   }, []);
  useEffect(() => { stateRef.current.setIsolated   = setIsolated;  }, []);

  const handleCamView = (v) => { setCamView(v); stateRef.current.setCamView?.(v); };

  const handleMode = (m) => {
    setMode(m); setStep(-1); setStepTxt(''); setStepSQL(''); setScanData(null);
    stateRef.current.clearHighlight?.();
    stateRef.current.resetBuildings?.();
    setSelected(null);
  };

  const getSteps = useCallback(() =>
    mode === 'query' ? QUERY_STEPS : mode === 'transaction' ? TRX_STEPS : SCAN_STEPS
  , [mode]);

  const applyStep = useCallback((i) => {
    const steps = getSteps(); const st = steps[i]; if (!st) return;
    setStepTxt(st.txt); setStepSQL(st.sql || st.title);
    if (mode === 'indexscan') { setScanData(st); return; }
    if (st.highlight) stateRef.current.highlightComp?.(st.highlight);
    else stateRef.current.clearHighlight?.();
    const comp = DB_COMPONENTS.find(c => c.id === st.component);
    if (comp) {
      setSelected(comp);
      const layout = CITY_LAYOUT.find(l => l.id === comp.id);
      if (layout) stateRef.current.animateCam?.(0.3, 0.5, 16, new THREE.Vector3(layout.x, 2, layout.z));
    }
  }, [mode, getSteps]);

  const stepNext  = () => { const n = step + 1; if (n < getSteps().length) { setStep(n); applyStep(n); } };
  const stepPrev  = () => { const p = step - 1; if (p >= 0) { setStep(p); applyStep(p); } else { setStep(-1); setStepTxt(''); setStepSQL(''); stateRef.current.clearHighlight?.(); } };
  const stepReset = () => { setStep(-1); setStepTxt(''); setStepSQL(''); setScanData(null); stateRef.current.clearHighlight?.(); stateRef.current.resetBuildings?.(); };

  const showStepControls = mode !== 'architecture';

  return (
    <div className="db3d-root" style={{ position:'fixed', top:68, left:0, right:0, bottom:0, overflow:'hidden', background:'#02040c' }}>
      <canvas ref={canvasRef} className="db3d-canvas" />

      {/* Component selector */}
      <div className="db3d-layers">
        {DB_COMPONENTS.map(comp => {
          const isActive = isolated?.id === comp.id;
          const isHidden = isolated && !isActive;
          return (
            <div key={comp.id}
              className={`db3d-layer-item ${isActive ? 'active' : ''} ${isHidden ? 'hidden' : ''}`}
              style={{ '--layer-color': comp.css }}
              onClick={() => { setSelected(comp); stateRef.current.isolateBuilding?.(comp); }}
            >
              <span className="db3d-layer-dot" style={{ background: comp.css }} />
              <span className="db3d-layer-badge" style={{ color: comp.css }}>{comp.short}</span>
              <span className="db3d-layer-name">{comp.name}</span>
              {isActive && (
                <button className="db3d-layer-reset" onClick={e => { e.stopPropagation(); stateRef.current.resetBuildings?.(); setSelected(null); }}>✕</button>
              )}
            </div>
          );
        })}
      </div>

      {tooltip.visible && (
        <div className="db3d-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>{tooltip.text}</div>
      )}
      {!isolated && <div className="db3d-hint">Clic en un edificio para aislar · Scroll para zoom · Arrastra para rotar</div>}

      {/* Barra de modos — arriba izquierda */}
      <div className="db3d-modebar">
        {DB_MODES.map(m => (
          <button key={m.id} className={`db3d-mbtn ${mode === m.id ? 'active' : ''}`} onClick={() => handleMode(m.id)}>
            <span className="db3d-mbtn-icon">{m.icon}</span> {m.label}
          </button>
        ))}
      </div>

      {/* Barra de cámara — abajo centro */}
      <div className="db3d-bottombar">
        {[['persp','3D'],['top','Top'],['front','Frente'],['side','Lateral'],['iso','Iso']].map(([id, label]) => (
          <button key={id} className={`db3d-cbtn ${camView === id ? 'active' : ''}`} onClick={() => handleCamView(id)}>{label}</button>
        ))}
      </div>

      {showStepControls && (
        <div className="db3d-stepctrl">
          <button className="db3d-fbtn db3d-fbtn--reset" onClick={stepReset}>↺</button>
          <button className="db3d-fbtn db3d-fbtn--prev"  onClick={stepPrev}>← Prev</button>
          <button className="db3d-fbtn db3d-fbtn--next"  onClick={stepNext}>Next →</button>
          <span className="db3d-step-info">{step < 0 ? 0 : step + 1} / {getSteps().length}</span>
        </div>
      )}

      {(stepTxt || stepSQL) && !scanData && (
        <div className="db3d-stepinfo">
          {stepSQL && <div className="db3d-stepinfo__sql">{stepSQL}</div>}
          {stepTxt && <div className="db3d-stepinfo__txt">{stepTxt}</div>}
        </div>
      )}

      {scanData && (
        <div className="db3d-scanbox">
          <div className={`db3d-scantype ${scanData.type}`}>
            {scanData.type === 'index' ? '⚡ Index Scan' : '🐢 Full Table Scan'}
          </div>
          <div className="db3d-scan-sql">{scanData.sql}</div>
          <div className="db3d-scan-stats">
            <div className="db3d-scan-stat">
              <span className="db3d-scan-stat-label">Páginas leídas</span>
              <span className="db3d-scan-stat-value" style={{ color: scanData.type==='index'?'#22c55e':'#ef4444' }}>
                {scanData.pages.toLocaleString()} / {scanData.totalPages.toLocaleString()}
              </span>
            </div>
            <div className="db3d-scan-stat">
              <span className="db3d-scan-stat-label">Tiempo estimado</span>
              <span className="db3d-scan-stat-value" style={{ color: scanData.type==='index'?'#22c55e':'#ef4444' }}>
                {scanData.time}
              </span>
            </div>
          </div>
          <div className="db3d-scan-bar-bg">
            <div className="db3d-scan-bar-fill" style={{ width:`${(scanData.pages/scanData.totalPages)*100}%`, background:scanData.type==='index'?'#22c55e':'#ef4444' }}/>
          </div>
          <div className="db3d-scan-desc">{scanData.txt}</div>
        </div>
      )}

      <DBPanel component={selected} onClose={() => { setSelected(null); stateRef.current.resetBuildings?.(); }} />

      {/* Diagrama de flujo — overlay completo */}
      {mode === 'flow' && (
        <FlowDiagram onClose={() => handleMode('architecture')} />
      )}
    </div>
  );
}