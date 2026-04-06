// src/components/ArchDiagram.jsx
import React, { useMemo, useState, useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Handle,
  Position,
  getBezierPath,
  EdgeLabelRenderer,
  BaseEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import "./ArchDiagram.css";

/* ── Estilos por tipo ── */
const NODE_TYPES_STYLE = {
  frontend: {
    color: "#38bdf8",
    bg: "rgba(56,189,248,0.08)",
    label: "Frontend",
  },
  backend: { color: "#4ade80", bg: "rgba(74,222,128,0.08)", label: "Backend" },
  database: { color: "#f59e0b", bg: "rgba(245,158,11,0.08)", label: "DB" },
  infra: { color: "#a78bfa", bg: "rgba(167,139,250,0.08)", label: "Infra" },
  cicd: { color: "#fb923c", bg: "rgba(251,146,60,0.08)", label: "CI/CD" },
  auth: { color: "#f43f5e", bg: "rgba(244,63,94,0.08)", label: "Auth" },
  compiler: {
    color: "#e879f9",
    bg: "rgba(232,121,249,0.08)",
    label: "Compiler",
  },
  storage: { color: "#22d3ee", bg: "rgba(34,211,238,0.08)", label: "Storage" },
  user: { color: "#94a3b8", bg: "rgba(148,163,184,0.08)", label: "Actor" },
  default: { color: "#2563eb", bg: "rgba(37,99,235,0.08)", label: "Service" },
};

/* ── Custom Edge ── */
const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
  style,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />
      {data?.label && (
        <EdgeLabelRenderer>
          <div
            className="arch-edge-label"
            style={{
              transform: `translate(-50%,-50%) translate(${labelX}px,${labelY}px)`,
            }}
          >
            {data.animated && <span className="arch-edge-dot" />}
            {data.label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

/* ── Modal de nodo ── */
const NodeModal = ({ node, onClose }) => {
  if (!node) return null;
  const s = NODE_TYPES_STYLE[node.data.nodeType] || NODE_TYPES_STYLE.default;
  return (
    <div className="arch-modal-overlay" onClick={onClose}>
      <div className="arch-modal" onClick={(e) => e.stopPropagation()}>
        <button className="arch-modal__close" onClick={onClose}>
          ✕
        </button>
        <div className="arch-modal__header" style={{ borderColor: s.color }}>
          <span className="arch-modal__icon">{node.data.icon}</span>
          <div>
            <span
              className="arch-modal__badge"
              style={{ color: s.color, borderColor: s.color }}
            >
              {s.label}
            </span>
            <h3 className="arch-modal__title">{node.data.label}</h3>
            {node.data.tech && (
              <p className="arch-modal__tech">{node.data.tech}</p>
            )}
          </div>
        </div>

        {node.data.desc && (
          <div className="arch-modal__section">
            <p className="arch-modal__section-label">¿Qué hace?</p>
            <p className="arch-modal__text">{node.data.desc}</p>
          </div>
        )}
        {node.data.how && (
          <div className="arch-modal__section">
            <p className="arch-modal__section-label">¿Cómo funciona?</p>
            <p className="arch-modal__text">{node.data.how}</p>
          </div>
        )}
        {node.data.why && (
          <div className="arch-modal__section">
            <p className="arch-modal__section-label">¿Por qué se eligió?</p>
            <p className="arch-modal__text">{node.data.why}</p>
          </div>
        )}
        {node.data.details && (
          <div className="arch-modal__section">
            <p className="arch-modal__section-label">Detalles técnicos</p>
            <ul className="arch-modal__list">
              {node.data.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Nodo genérico ── */
const ArchNodeInner = ({ data, onNodeClick }) => {
  const s = NODE_TYPES_STYLE[data.nodeType] || NODE_TYPES_STYLE.default;
  const hasModal = data.how || data.why || data.details;
  return (
    <div
      className={`arch-node ${hasModal ? "arch-node--clickable" : ""}`}
      style={{ "--node-color": s.color, "--node-bg": s.bg }}
      onClick={hasModal ? onNodeClick : undefined}
    >
      <Handle type="target" position={Position.Top} className="arch-handle" />
      <Handle type="target" position={Position.Left} className="arch-handle" />
      <Handle
        type="source"
        position={Position.Bottom}
        className="arch-handle"
      />
      <Handle type="source" position={Position.Right} className="arch-handle" />
      <div className="arch-node__header">
        <span className="arch-node__icon">{data.icon}</span>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {hasModal && <span className="arch-node__info-hint">info</span>}
          <span className="arch-node__type-badge">{s.label}</span>
        </div>
      </div>
      <p className="arch-node__name">{data.label}</p>
      {data.tech && <p className="arch-node__tech">{data.tech}</p>}
      {data.desc && <p className="arch-node__desc">{data.desc}</p>}
    </div>
  );
};

/* ── Grupo ── */
const GroupNode = ({ data }) => (
  <div
    className="arch-group"
    style={{ "--group-color": data.color || "#2563eb" }}
  >
    <div className="arch-group__label">
      {data.icon && <span>{data.icon}</span>}
      {data.label}
    </div>
  </div>
);

/* ── Componente principal ── */
export const ArchDiagram = ({ nodes: rawNodes = [], edges: rawEdges = [] }) => {
  const [selectedNode, setSelectedNode] = useState(null);

  // Wrappear ArchNode para pasar el setter
  const ArchNode = useCallback(
    ({ data, id }) => (
      <ArchNodeInner
        data={data}
        onNodeClick={() => setSelectedNode({ id, data })}
      />
    ),
    [],
  );

  const nodeTypes = useMemo(
    () => ({ arch: ArchNode, group: GroupNode }),
    [ArchNode],
  );
  const edgeTypes = useMemo(() => ({ custom: CustomEdge }), []);

  const nodes = useMemo(
    () =>
      rawNodes.map((n) => {
        if (n.type === "group") {
          return {
            ...n,
            style: {
              width: n.style?.width || 220,
              height: n.style?.height || 200,
              background: "transparent",
              border: "none",
              padding: 0,
            },
          };
        }
        return { ...n, type: "arch" };
      }),
    [rawNodes],
  );

  const edges = useMemo(
    () =>
      rawEdges.map((e) => ({
        ...e,
        type: "custom",
        style: {
          stroke: e.color || "#334155",
          strokeWidth: 1.5,
          strokeDasharray: e.animated ? "6 3" : "none",
        },
        markerEnd: {
          type: "ArrowClosed",
          color: e.color || "#334155",
          width: 14,
          height: 14,
        },
      })),
    [rawEdges],
  );

  return (
    <div className="arch-diagram-wrap">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.2}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#1e293b" gap={24} size={1} variant="dots" />
        <Controls className="arch-controls" showInteractive={false} />
        <MiniMap
          className="arch-minimap"
          nodeColor={(n) =>
            NODE_TYPES_STYLE[n.data?.nodeType]?.color || "#334155"
          }
          maskColor="rgba(0,0,0,0.6)"
          pannable
          zoomable
        />
      </ReactFlow>

      <NodeModal node={selectedNode} onClose={() => setSelectedNode(null)} />
    </div>
  );
};
