// src/views/AboutSection.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import VisitorCounter from "../components/VisitorCounter";
import { useSEO } from "../hooks/useSEO";
import "./AboutSection.css";

const CV_DRIVE_ID = "1Z7rinMrxAwtHzTYlIf9xqQBfB9F3umdf";
const CV_PREVIEW_URL = `https://drive.google.com/file/d/${CV_DRIVE_ID}/preview`;
const CV_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${CV_DRIVE_ID}`;

// ── Colores neon por grupo ──────────────────────────────────
const GROUP_COLOR = {
  Lenguajes: "#00f5ff",
  Frontend: "#4B8EFF",
  Backend: "#a78bfa",
  DevOps: "#fb923c",
  Datos: "#4ade80",
  Hardware: "#f472b6",
  Metodologías: "#ffe600",
};

const ICONS = {
  Java: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0 0-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.749-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0 0 .07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832 0 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.189-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0 0 .553.457 3.393.639" />
    </svg>
  ),
  JavaScript: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
    </svg>
  ),
  Python: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
    </svg>
  ),
  "C++": (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.34.293 1.848 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.003-.294-.1-.62-.268-.91zM12 19.11c-3.92 0-7.109-3.19-7.109-7.11 0-3.92 3.19-7.11 7.109-7.11a7.133 7.133 0 016.156 3.553l-3.076 1.78a3.567 3.567 0 00-3.08-1.78A3.56 3.56 0 008.444 12 3.56 3.56 0 0012 15.555a3.57 3.57 0 003.08-1.778l3.078 1.78A7.135 7.135 0 0112 19.11zm7.11-6.715h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79zm2.962 0h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79z" />
    </svg>
  ),
  SQL: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 4.477 2 7.5v9C2 19.523 6.477 22 12 22s10-2.477 10-5.5v-9C22 4.477 17.523 2 12 2zm0 2c4.993 0 8 2.022 8 3.5S16.993 11 12 11 4 8.978 4 7.5 7.007 4 12 4zm0 14c-4.993 0-8-2.022-8-3.5v-1.94C5.49 13.69 8.55 14.5 12 14.5s6.51-.81 8-1.94V14.5C20 15.978 16.993 18 12 18zm0-4c-4.993 0-8-2.022-8-3.5V8.56C5.49 9.69 8.55 10.5 12 10.5s6.51-.81 8-1.94V10.5C20 11.978 16.993 14 12 14z" />
    </svg>
  ),
  PHP: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 18.08c-6.63 0-12-2.72-12-6.08s5.37-6.08 12-6.08S24 8.64 24 12s-5.37 6.08-12 6.08zM5.09 13.92L6 14l.5-1.5L8 14l.09-2.17L5.09 10zm3.84 0l.91.08.5-1.5 1.5 1.5.09-2.17-2.91-1.83zm3.84 0l.91.08.5-1.5 1.5 1.5.09-2.17-2.91-1.83zM4.5 10.5h-1v3h1zm.75 0v3h1.5l.75-1.5-.75-1.5zm9.75 0h-1v3h1zm.75 0v3h1.5l.75-1.5-.75-1.5z" />
    </svg>
  ),
  Bash: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM8 7l4 4-4 4 1.5 1.5L15 11 9.5 5.5 8 7z" />
    </svg>
  ),
  React: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.23 12.004a2.236 2.236 0 01-2.235 2.236 2.236 2.236 0 01-2.236-2.236 2.236 2.236 0 012.235-2.236 2.236 2.236 0 012.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 00-1.092-.278zm-.005 1.09c.442 0 .751.111.96.225 1.132.652 1.25 3.07.48 6.177a23.7 23.7 0 00-2.913-.612 23.48 23.48 0 00-1.885-2.855c1.863-1.543 3.454-2.135 4.358-2.135z" />
    </svg>
  ),
  "React Native": (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 11.07A.93.93 0 1112 12.93.93.93 0 0112 11.07M12 2C6.47 2 2 6.5 2 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2m3.5 6c.27 0 .5.22.5.5s-.22.5-.5.5-.5-.22-.5-.5.22-.5.5-.5M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5m-3.5-9c.27 0 .5.22.5.5s-.22.5-.5.5-.5-.22-.5-.5.22-.5.5-.5z" />
    </svg>
  ),
  "HTML/CSS": (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
    </svg>
  ),
  Angular: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.931 12.645h4.138l-2.07-4.908m0-7.737L.68 3.982l1.726 14.771L12 24l9.596-5.242L23.32 3.984 11.999.001zm7.064 18.31h-2.638l-1.422-3.503H8.996L7.574 18.31H4.937L12 2.388l6.995 15.937z" />
    </svg>
  ),
  "Spring Boot": (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.59 5.166a10.619 10.619 0 01-1.404 2.832A11.168 11.168 0 0012.16.984C5.875.838.496 5.98.34 12.265a11.168 11.168 0 0010.363 11.392c5.27.5 10.02-2.832 11.345-7.932.09-.324.164-.654.22-.984h-5.255A5.985 5.985 0 0112 18.08a6.057 6.057 0 01-6.098-5.864A6.057 6.057 0 0112 6.352c1.704 0 3.24.71 4.352 1.84l-2.208 2.208a2.837 2.837 0 00-2.144-.984 2.898 2.898 0 00-2.895 2.895 2.898 2.898 0 002.895 2.895 2.837 2.837 0 002.764-2.144h-2.764V10.12h5.716c.06.336.092.68.092 1.032a8.184 8.184 0 01-.147 1.604h2.332c.484-1.436.616-2.984.316-4.508a7.617 7.617 0 00-.456-1.536z" />
    </svg>
  ),
  Django: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.146 0h3.924v18.166c-2.013.382-3.491.535-5.096.535-4.791 0-7.288-2.166-7.288-6.32 0-4.002 2.65-6.6 6.753-6.6.637 0 1.121.05 1.707.203zm0 9.143a3.894 3.894 0 00-1.325-.204c-1.988 0-3.134 1.223-3.134 3.364 0 2.09 1.096 3.236 3.109 3.236.433 0 .79-.025 1.35-.102V9.142zM21.314 6.06v11.109c0 3.828-.28 5.665-1.096 7.25-.766 1.53-1.785 2.497-3.875 3.567l-3.645-1.732c2.09-1.07 3.109-1.96 3.772-3.34.687-1.404.916-3.01.916-7.25v-9.6h3.928zm-3.927-6.06h3.924v4.012H17.387z" />
    </svg>
  ),
  Docker: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.186.186 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z" />
    </svg>
  ),
  Nginx: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L1.605 6v12L12 24l10.395-6V6zm0 1.41l9.172 5.295v9.142L12 21.59l-9.172-5.295V6.705zm.742 3.157v9.384l5.43-3.133V4.687zm-1.484.116L5.83 7.66v9.502l1.086.627V9.107l6.258 9.39.986-.57V4.566z" />
    </svg>
  ),
  "GitHub Actions": (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  "GitLab CI/CD": (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.845.904c-.435 0-.82.28-.955.692L.013 12.22c-.138.4-.005.84.323 1.1l11.36 8.25c.19.14.45.14.64 0l11.36-8.25c.328-.26.46-.7.322-1.1L20.11 1.596a1.004 1.004 0 00-.955-.692h-3.45l1.2 3.7H8.094l1.2-3.7H4.845z" />
    </svg>
  ),
  Jenkins: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2M9 9l1.5 1.5L9 12l1.5 1.5L9 15h6l-1.5-1.5L15 12l-1.5-1.5L15 9z" />
    </svg>
  ),
  AWS: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 01-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 01-.287-.375 6.18 6.18 0 01-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 01-.28.104.488.488 0 01-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 01.224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 011.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586z" />
    </svg>
  ),
  Terraform: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.35 8.293l-5.6 3.23v6.46l5.6-3.23V8.293zM8.65 11.523L3 8.293v6.46l5.65 3.23v-6.46zm7.9-7.816L11 6.937v6.46l5.55-3.21V3.707zm-8.1 0L3 6.937v6.46l5.45-3.21V3.707z" />
    </svg>
  ),
  MySQL: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3C7.59 3 4 4.79 4 7s3.59 4 8 4 8-1.79 8-4-3.59-4-8-4zM4 9v3c0 2.21 3.59 4 8 4s8-1.79 8-4V9c0 2.21-3.59 4-8 4S4 11.21 4 9zm0 5v3c0 2.21 3.59 4 8 4s8-1.79 8-4v-3c0 2.21-3.59 4-8 4s-8-1.79-8-4z" />
    </svg>
  ),
  "SQL Server": (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 4.477 2 7.5v9C2 19.523 6.477 22 12 22s10-2.477 10-5.5v-9C22 4.477 17.523 2 12 2zm0 2c4.993 0 8 2.022 8 3.5S16.993 11 12 11 4 8.978 4 7.5 7.007 4 12 4zm0 14c-4.993 0-8-2.022-8-3.5v-1.94C5.49 13.69 8.55 14.5 12 14.5s6.51-.81 8-1.94V14.5C20 15.978 16.993 18 12 18z" />
    </svg>
  ),
  Firebase: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.89 15.672L6.255.461A.542.542 0 017.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 00-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 001.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 00-.96 0L3.53 17.984z" />
    </svg>
  ),
  Arduino: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.27 15.836c-.96 0-1.77-.22-2.43-.65-.66-.44-1.14-1.03-1.44-1.78-.3-.75-.45-1.62-.45-2.61 0-.99.15-1.86.45-2.61.3-.75.78-1.34 1.44-1.77.66-.44 1.47-.65 2.43-.65s1.77.21 2.43.65c.66.43 1.14 1.02 1.44 1.77.3.75.45 1.62.45 2.61 0 .99-.15 1.86-.45 2.61-.3.75-.78 1.34-1.44 1.78-.66.43-1.47.65-2.43.65zm.01-1.39c.6 0 1.08-.14 1.44-.43.36-.29.62-.68.78-1.18.16-.5.24-1.07.24-1.71s-.08-1.21-.24-1.71c-.16-.5-.42-.89-.78-1.18-.36-.29-.84-.43-1.44-.43s-1.08.14-1.44.43c-.36.29-.62.68-.78 1.18-.16.5-.24 1.07-.24 1.71s.08 1.21.24 1.71c.16.5.42.89.78 1.18.36.29.84.43 1.44.43zM8.11 11.18H6.55v-1.36h1.56V8.26h1.36v1.56h1.56v1.36H9.47v1.56H8.11v-1.56z" />
    </svg>
  ),
  "RPi / Embedded": (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9V8h2v9zm4 0h-2V8h2v9z" />
    </svg>
  ),
  AutoCAD: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.5 2h-11A4.5 4.5 0 002 6.5v11A4.5 4.5 0 006.5 22h11a4.5 4.5 0 004.5-4.5v-11A4.5 4.5 0 0017.5 2zm-5.5 15l-5-10h2l3 6 3-6h2z" />
    </svg>
  ),
  "Mastercam 2D": (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  ANTLR4: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
    </svg>
  ),
  "UML (todos)": (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 3h7v7H3zm0 11h7v7H3zm11-11h7v7h-7zm0 11h7v7h-7z" />
    </svg>
  ),
  "RUP / SCRUM": (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm1-13h-2v6l5.25 3.15.75-1.23-4-2.37z" />
    </svg>
  ),
  "Patrones GOF": (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  "Arq. Software": (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z" />
    </svg>
  ),
  Git: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" />
    </svg>
  ),
};

// ── Datos de progreso temporal (abreviado para brevedad, mismo que original) ──
const TIMELINE_DATA = {
  Java: {
    desc: "OOP, estructuras de datos, APIs REST con Spring",
    points: [
      { year: "2018", level: 15, label: "Primer curso" },
      { year: "2019", level: 35, label: "POO avanzada" },
      { year: "2021", level: 50, label: "Spring básico" },
      { year: "2023", level: 55, label: "APIs REST" },
    ],
  },
  JavaScript: {
    desc: "Lenguaje principal en frontend y backend (Node)",
    points: [
      { year: "2019", level: 20, label: "DOM básico" },
      { year: "2020", level: 45, label: "ES6+ y async" },
      { year: "2021", level: 65, label: "React + Node" },
      { year: "2023", level: 80, label: "Stack completo" },
    ],
  },
  Python: {
    desc: "Scripts, automatización, Django y análisis de datos",
    points: [
      { year: "2019", level: 15, label: "Sintaxis" },
      { year: "2021", level: 35, label: "Scripts" },
      { year: "2022", level: 50, label: "Django / RPi" },
    ],
  },
  "C++": {
    desc: "Algoritmos, memoria dinámica y sistemas embebidos",
    points: [
      { year: "2018", level: 10, label: "Intro" },
      { year: "2019", level: 35, label: "Punteros/STL" },
      { year: "2021", level: 50, label: "Proyectos Lab" },
    ],
  },
  SQL: {
    desc: "Consultas complejas, diseño de BD y optimización",
    points: [
      { year: "2018", level: 15, label: "SELECT básico" },
      { year: "2020", level: 40, label: "Joins/Índices" },
      { year: "2022", level: 60, label: "Optimización" },
    ],
  },
  PHP: {
    desc: "Backend web con formularios y conexión a BD",
    points: [
      { year: "2019", level: 10, label: "Intro" },
      { year: "2020", level: 35, label: "Forms/BD" },
      { year: "2021", level: 45, label: "APIs básicas" },
    ],
  },
  Bash: {
    desc: "Scripts de automatización, cron y pipelines CI",
    points: [
      { year: "2020", level: 20, label: "Comandos" },
      { year: "2021", level: 45, label: "Scripts" },
      { year: "2023", level: 55, label: "CI Pipelines" },
    ],
  },
  React: {
    desc: "Hooks, Context, Router y arquitecturas SPA",
    points: [
      { year: "2020", level: 15, label: "Primeros pasos" },
      { year: "2021", level: 40, label: "Hooks/State" },
      { year: "2022", level: 60, label: "Router/Context" },
      { year: "2024", level: 70, label: "Performance" },
    ],
  },
  "React Native": {
    desc: "Apps móviles con Expo y APIs nativas",
    points: [
      { year: "2021", level: 15, label: "Expo básico" },
      { year: "2022", level: 35, label: "Navegación" },
      { year: "2023", level: 50, label: "APIs nativas" },
    ],
  },
  "HTML/CSS": {
    desc: "Diseño responsivo, Grid, Flexbox y animaciones",
    points: [
      { year: "2018", level: 30, label: "Básico" },
      { year: "2019", level: 55, label: "Flexbox" },
      { year: "2021", level: 75, label: "Grid/Animaciones" },
      { year: "2023", level: 90, label: "Avanzado" },
    ],
  },
  Angular: {
    desc: "Componentes, servicios y RxJS",
    points: [
      { year: "2022", level: 10, label: "Intro" },
      { year: "2023", level: 25, label: "Componentes" },
      { year: "2024", level: 30, label: "Services" },
    ],
  },
  "Spring Boot": {
    desc: "APIs REST, JPA y seguridad con Spring Security",
    points: [
      { year: "2021", level: 15, label: "Config" },
      { year: "2022", level: 40, label: "REST/JPA" },
      { year: "2024", level: 55, label: "Seguridad" },
    ],
  },
  Django: {
    desc: "ORM, vistas, autenticación y Django REST",
    points: [
      { year: "2021", level: 20, label: "MVT básico" },
      { year: "2022", level: 45, label: "ORM/Auth" },
      { year: "2023", level: 60, label: "DRF" },
    ],
  },
  Docker: {
    desc: "Contenedores, Compose y despliegues en producción",
    points: [
      { year: "2021", level: 15, label: "Hello World" },
      { year: "2022", level: 45, label: "Compose" },
      { year: "2023", level: 65, label: "Producción" },
      { year: "2024", level: 70, label: "Multi-stage" },
    ],
  },
  Nginx: {
    desc: "Proxy inverso, SSL y servir archivos estáticos",
    points: [
      { year: "2022", level: 20, label: "Config básica" },
      { year: "2023", level: 50, label: "Proxy/SSL" },
      { year: "2024", level: 60, label: "Load Balancer" },
    ],
  },
  "GitHub Actions": {
    desc: "CI/CD, workflows y despliegues automáticos",
    points: [
      { year: "2022", level: 20, label: "Primer CI" },
      { year: "2023", level: 50, label: "Workflows" },
      { year: "2024", level: 55, label: "CD automático" },
    ],
  },
  "GitLab CI/CD": {
    desc: "Pipelines, runners y variables de entorno",
    points: [
      { year: "2022", level: 15, label: "Pipelines" },
      { year: "2023", level: 40, label: "Runners" },
      { year: "2024", level: 50, label: "Deploy" },
    ],
  },
  Jenkins: {
    desc: "Automatización de builds y despliegues",
    points: [
      { year: "2023", level: 20, label: "Config" },
      { year: "2024", level: 50, label: "Pipelines" },
    ],
  },
  AWS: {
    desc: "EC2, S3, RDS y despliegues cloud básicos",
    points: [
      { year: "2023", level: 15, label: "EC2/S3" },
      { year: "2024", level: 40, label: "RDS/Lambda" },
    ],
  },
  Terraform: {
    desc: "Infraestructura como código con providers AWS",
    points: [
      { year: "2023", level: 15, label: "Providers" },
      { year: "2024", level: 40, label: "Módulos/State" },
    ],
  },
  MySQL: {
    desc: "Diseño, consultas complejas y optimización",
    points: [
      { year: "2018", level: 20, label: "Tablas básicas" },
      { year: "2020", level: 45, label: "Joins/Index" },
      { year: "2022", level: 60, label: "Optimización" },
    ],
  },
  "SQL Server": {
    desc: "T-SQL, procedimientos y reportes con SSMS",
    points: [
      { year: "2021", level: 15, label: "T-SQL" },
      { year: "2022", level: 35, label: "Procedures" },
      { year: "2023", level: 40, label: "Reporting" },
    ],
  },
  Firebase: {
    desc: "Firestore, Auth, Storage y Functions",
    points: [
      { year: "2021", level: 20, label: "Firestore" },
      { year: "2022", level: 50, label: "Auth/Storage" },
      { year: "2023", level: 65, label: "Functions" },
    ],
  },
  Arduino: {
    desc: "GPIO, sensores, comunicación serial e I2C",
    points: [
      { year: "2015", level: 10, label: "Primeros LEDs" },
      { year: "2018", level: 40, label: "Sensores" },
      { year: "2021", level: 60, label: "I2C/Serial" },
      { year: "2023", level: 70, label: "Proyectos IoT" },
    ],
  },
  "RPi / Embedded": {
    desc: "Linux embebido, GPIO con Python y Docker en ARM",
    points: [
      { year: "2020", level: 20, label: "Linux básico" },
      { year: "2022", level: 50, label: "GPIO/Python" },
      { year: "2024", level: 70, label: "Docker ARM" },
    ],
  },
  AutoCAD: {
    desc: "Diseño 2D, bloques, capas y planos técnicos",
    points: [
      { year: "2014", level: 20, label: "Taller" },
      { year: "2016", level: 55, label: "Planos técnicos" },
      { year: "2018", level: 70, label: "Bachiller" },
    ],
  },
  "Mastercam 2D": {
    desc: "Fresado y torneado con paths CNC",
    points: [
      { year: "2015", level: 15, label: "Intro CNC" },
      { year: "2016", level: 45, label: "Fresado" },
    ],
  },
  ANTLR4: {
    desc: "Gramáticas, lexer/parser y construcción de AST",
    points: [
      { year: "2022", level: 20, label: "Gramáticas" },
      { year: "2023", level: 50, label: "Visitors/AST" },
      { year: "2024", level: 60, label: "Intérpretes" },
    ],
  },
  "UML (todos)": {
    desc: "Todos los diagramas UML aplicados en proyectos reales",
    points: [
      { year: "2019", level: 20, label: "Clases básico" },
      { year: "2021", level: 55, label: "Secuencia/CU" },
      { year: "2023", level: 80, label: "ADS cátedra" },
      { year: "2024", level: 85, label: "Consultor" },
    ],
  },
  "RUP / SCRUM": {
    desc: "Artefactos RUP, sprints y gestión de proyectos",
    points: [
      { year: "2020", level: 15, label: "Intro" },
      { year: "2022", level: 50, label: "Artefactos RUP" },
      { year: "2024", level: 75, label: "Consultoría" },
    ],
  },
  "Patrones GOF": {
    desc: "Patrones creacionales, estructurales y de comportamiento",
    points: [
      { year: "2021", level: 20, label: "Intro" },
      { year: "2022", level: 45, label: "Creacionales" },
      { year: "2024", level: 65, label: "Aplicación real" },
    ],
  },
  "Arq. Software": {
    desc: "Capas, MVC, Clean Architecture y microservicios",
    points: [
      { year: "2021", level: 20, label: "MVC" },
      { year: "2022", level: 45, label: "Capas" },
      { year: "2024", level: 65, label: "Clean Arch" },
    ],
  },
  Git: {
    desc: "Branching, rebase, workflows y colaboración en equipo",
    points: [
      { year: "2019", level: 20, label: "Commits" },
      { year: "2020", level: 45, label: "Branching" },
      { year: "2022", level: 65, label: "Rebase/Tags" },
      { year: "2024", level: 70, label: "Workflows" },
    ],
  },
};

const TOPICS_DATA = {
  Java: [
    { t: "POO / Clases", v: 75 },
    { t: "Estructuras de datos", v: 65 },
    { t: "Apuntadores/Refs", v: 55 },
    { t: "Spring Boot", v: 55 },
    { t: "Manejo de errores", v: 60 },
    { t: "Testing (JUnit)", v: 45 },
  ],
  JavaScript: [
    { t: "ES6+ / Closures", v: 88 },
    { t: "DOM / Events", v: 85 },
    { t: "Async/Await", v: 82 },
    { t: "Prototipos", v: 70 },
    { t: "Node.js", v: 75 },
    { t: "Testing", v: 60 },
  ],
  Python: [
    { t: "Scripting/CLI", v: 75 },
    { t: "OOP", v: 65 },
    { t: "Decoradores", v: 55 },
    { t: "Django ORM", v: 62 },
    { t: "Automatización", v: 72 },
    { t: "Análisis básico", v: 45 },
  ],
  "C++": [
    { t: "Apuntadores", v: 65 },
    { t: "Memoria dinámica", v: 60 },
    { t: "STL", v: 58 },
    { t: "OOP", v: 65 },
    { t: "Algoritmos", v: 62 },
    { t: "Compilación", v: 52 },
  ],
  SQL: [
    { t: "SELECT / JOINs", v: 82 },
    { t: "Índices", v: 68 },
    { t: "Procedimientos", v: 58 },
    { t: "Diseño BD", v: 72 },
    { t: "Optimización", v: 62 },
    { t: "Transacciones", v: 60 },
  ],
  PHP: [
    { t: "Sintaxis base", v: 65 },
    { t: "Forms / Sessions", v: 58 },
    { t: "MySQL desde PHP", v: 55 },
    { t: "APIs básicas", v: 48 },
    { t: "Seguridad básica", v: 42 },
    { t: "OOP en PHP", v: 40 },
  ],
  Bash: [
    { t: "Scripts básicos", v: 72 },
    { t: "Pipes / Redirección", v: 70 },
    { t: "Cron jobs", v: 65 },
    { t: "SSH / SCP", v: 68 },
    { t: "Variables / Arrays", v: 70 },
    { t: "Automatización CI", v: 58 },
  ],
  React: [
    { t: "Hooks (useState…)", v: 88 },
    { t: "Context API", v: 75 },
    { t: "React Router", v: 78 },
    { t: "Formularios", v: 80 },
    { t: "Performance/Memo", v: 68 },
    { t: "Testing", v: 58 },
  ],
  "React Native": [
    { t: "Componentes", v: 68 },
    { t: "Navigation", v: 65 },
    { t: "Expo APIs", v: 72 },
    { t: "Estilos/StyleSheet", v: 65 },
    { t: "APIs del dispositivo", v: 55 },
    { t: "Publicación", v: 45 },
  ],
  "HTML/CSS": [
    { t: "Semántica HTML5", v: 95 },
    { t: "Flexbox", v: 92 },
    { t: "CSS Grid", v: 88 },
    { t: "Animaciones CSS", v: 78 },
    { t: "Responsivo/Media Q", v: 90 },
    { t: "Accesibilidad", v: 72 },
  ],
  Angular: [
    { t: "Componentes", v: 48 },
    { t: "Services / DI", v: 42 },
    { t: "RxJS básico", v: 35 },
    { t: "Routing", v: 42 },
    { t: "Reactive Forms", v: 40 },
    { t: "Pipes", v: 38 },
  ],
  "Spring Boot": [
    { t: "REST Controllers", v: 68 },
    { t: "JPA / Hibernate", v: 62 },
    { t: "Spring Security", v: 55 },
    { t: "Maven/Gradle", v: 60 },
    { t: "Config/Perfiles", v: 58 },
    { t: "Testing", v: 50 },
  ],
  Django: [
    { t: "ORM / Models", v: 72 },
    { t: "Views / Templates", v: 68 },
    { t: "Auth integrada", v: 70 },
    { t: "Django REST", v: 65 },
    { t: "Admin panel", v: 75 },
    { t: "Middleware", v: 55 },
  ],
  Docker: [
    { t: "Containers", v: 82 },
    { t: "Dockerfile", v: 80 },
    { t: "Docker Compose", v: 78 },
    { t: "Volumes / Redes", v: 72 },
    { t: "Multi-stage build", v: 65 },
    { t: "Registry / Hub", v: 62 },
  ],
  Nginx: [
    { t: "Config básica", v: 70 },
    { t: "Proxy inverso", v: 68 },
    { t: "SSL / HTTPS", v: 62 },
    { t: "Archivos estáticos", v: 75 },
    { t: "Load balancing", v: 55 },
    { t: "Logs / Debug", v: 60 },
  ],
  "GitHub Actions": [
    { t: "Workflows YAML", v: 72 },
    { t: "Jobs / Steps", v: 75 },
    { t: "Secrets/Env vars", v: 70 },
    { t: "CI (tests auto)", v: 68 },
    { t: "CD (deploy auto)", v: 62 },
    { t: "Matrix builds", v: 55 },
  ],
  "GitLab CI/CD": [
    { t: "Pipelines", v: 68 },
    { t: "Runners", v: 62 },
    { t: "Artefactos", v: 60 },
    { t: "Variables CI", v: 65 },
    { t: "Deploy stages", v: 55 },
    { t: "Monitoreo", v: 50 },
  ],
  Jenkins: [
    { t: "Pipelines", v: 62 },
    { t: "Plugins", v: 55 },
    { t: "Build triggers", v: 60 },
    { t: "Credenciales", v: 55 },
    { t: "Agentes", v: 50 },
    { t: "Notificaciones", v: 48 },
  ],
  AWS: [
    { t: "EC2", v: 52 },
    { t: "S3 / Storage", v: 62 },
    { t: "RDS", v: 48 },
    { t: "Lambda básico", v: 42 },
    { t: "IAM / Roles", v: 46 },
    { t: "VPC básico", v: 40 },
  ],
  Terraform: [
    { t: "Providers", v: 52 },
    { t: "Resources", v: 55 },
    { t: "Módulos", v: 46 },
    { t: "State / Backend", v: 55 },
    { t: "Variables", v: 52 },
    { t: "Outputs", v: 48 },
  ],
  MySQL: [
    { t: "Consultas SELECT", v: 78 },
    { t: "JOINs", v: 72 },
    { t: "Índices", v: 65 },
    { t: "Stored Procedures", v: 60 },
    { t: "Triggers", v: 55 },
    { t: "Optimización", v: 62 },
  ],
  "SQL Server": [
    { t: "T-SQL", v: 58 },
    { t: "SSMS", v: 52 },
    { t: "Stored Procedures", v: 48 },
    { t: "Jobs / Agente", v: 44 },
    { t: "Índices", v: 45 },
    { t: "Reporting básico", v: 40 },
  ],
  Firebase: [
    { t: "Firestore CRUD", v: 82 },
    { t: "Auth Google/Email", v: 78 },
    { t: "Storage", v: 72 },
    { t: "Functions", v: 62 },
    { t: "Hosting", v: 65 },
    { t: "Reglas seguridad", v: 58 },
  ],
  Arduino: [
    { t: "GPIO / Digital", v: 82 },
    { t: "Sensores analógicos", v: 78 },
    { t: "I2C / SPI", v: 68 },
    { t: "Interrupciones", v: 65 },
    { t: "Librerías externas", v: 72 },
    { t: "Comunicación serial", v: 70 },
  ],
  "RPi / Embedded": [
    { t: "Linux CLI", v: 78 },
    { t: "GPIO con Python", v: 72 },
    { t: "Sensores I2C", v: 68 },
    { t: "Docker en ARM", v: 65 },
    { t: "Networking", v: 70 },
    { t: "Servicios systemd", v: 62 },
  ],
  AutoCAD: [
    { t: "Dibujo 2D", v: 72 },
    { t: "Capas / Estilos", v: 68 },
    { t: "Bloques", v: 62 },
    { t: "Anotaciones", v: 65 },
    { t: "Impresión/Plot", v: 58 },
    { t: "3D básico", v: 38 },
  ],
  "Mastercam 2D": [
    { t: "Fresado contorno", v: 55 },
    { t: "Torneado", v: 48 },
    { t: "Paths de corte", v: 52 },
    { t: "Post-procesador", v: 42 },
    { t: "Simulación", v: 50 },
    { t: "Herramientas", v: 45 },
  ],
  ANTLR4: [
    { t: "Gramáticas (g4)", v: 72 },
    { t: "Lexer rules", v: 68 },
    { t: "Parser rules", v: 70 },
    { t: "Visitor pattern", v: 62 },
    { t: "AST", v: 65 },
    { t: "Intérpretes", v: 58 },
  ],
  "UML (todos)": [
    { t: "Clases", v: 92 },
    { t: "Casos de Uso", v: 90 },
    { t: "Secuencia", v: 88 },
    { t: "Actividad", v: 82 },
    { t: "Componentes", v: 78 },
    { t: "Estado", v: 80 },
  ],
  "RUP / SCRUM": [
    { t: "Artefactos RUP", v: 82 },
    { t: "Sprints", v: 78 },
    { t: "Planning", v: 75 },
    { t: "Retrospectiva", v: 72 },
    { t: "Roles Scrum", v: 75 },
    { t: "Documentación", v: 80 },
  ],
  "Patrones GOF": [
    { t: "Creacionales", v: 72 },
    { t: "Estructurales", v: 70 },
    { t: "Comportamiento", v: 68 },
    { t: "Aplicación real", v: 65 },
    { t: "Refactoring", v: 62 },
    { t: "Documentación", v: 68 },
  ],
  "Arq. Software": [
    { t: "Capas (N-tier)", v: 74 },
    { t: "MVC / MVP", v: 76 },
    { t: "Microservicios", v: 65 },
    { t: "Clean Architecture", v: 62 },
    { t: "Documentación", v: 70 },
    { t: "Patrones", v: 68 },
  ],
  Git: [
    { t: "Commits / Stage", v: 88 },
    { t: "Branching", v: 82 },
    { t: "Merge / Rebase", v: 78 },
    { t: "Tags / Releases", v: 72 },
    { t: "Git Flow", v: 75 },
    { t: "PR / Code review", v: 70 },
  ],
};

const STACK = [
  { name: "Java", level: 50, group: "Lenguajes" },
  { name: "JavaScript", level: 80, group: "Lenguajes" },
  { name: "Python", level: 50, group: "Lenguajes" },
  { name: "C++", level: 50, group: "Lenguajes" },
  { name: "SQL", level: 60, group: "Lenguajes" },
  { name: "PHP", level: 45, group: "Lenguajes" },
  { name: "Bash", level: 55, group: "Lenguajes" },
  { name: "React", level: 70, group: "Frontend" },
  { name: "React Native", level: 50, group: "Frontend" },
  { name: "HTML/CSS", level: 90, group: "Frontend" },
  { name: "Angular", level: 30, group: "Frontend" },
  { name: "Spring Boot", level: 55, group: "Backend" },
  { name: "Django", level: 60, group: "Backend" },
  { name: "Docker", level: 70, group: "DevOps" },
  { name: "Nginx", level: 60, group: "DevOps" },
  { name: "GitHub Actions", level: 55, group: "DevOps" },
  { name: "GitLab CI/CD", level: 50, group: "DevOps" },
  { name: "Jenkins", level: 50, group: "DevOps" },
  { name: "AWS", level: 40, group: "DevOps" },
  { name: "Terraform", level: 40, group: "DevOps" },
  { name: "MySQL", level: 60, group: "Datos" },
  { name: "SQL Server", level: 40, group: "Datos" },
  { name: "Firebase", level: 65, group: "Datos" },
  { name: "Arduino", level: 70, group: "Hardware" },
  { name: "RPi / Embedded", level: 70, group: "Hardware" },
  { name: "AutoCAD", level: 55, group: "Hardware" },
  { name: "Mastercam 2D", level: 45, group: "Hardware" },
  { name: "ANTLR4", level: 60, group: "Metodologías" },
  { name: "UML (todos)", level: 85, group: "Metodologías" },
  { name: "RUP / SCRUM", level: 75, group: "Metodologías" },
  { name: "Patrones GOF", level: 65, group: "Metodologías" },
  { name: "Arq. Software", level: 65, group: "Metodologías" },
  { name: "Git", level: 70, group: "Metodologías" },
];
const GROUPS = [
  "Lenguajes",
  "Frontend",
  "Backend",
  "DevOps",
  "Datos",
  "Hardware",
  "Metodologías",
];

const TIMELINE = [
  {
    year: "2014–2016",
    title: "Bachiller Industrial — Mecánica General",
    place: "Instituto Técnico Vocacional Dr. Imrich Fichmann",
    note: "Ahí aprendí que construir algo físico que funcione es diferente a dibujarlo en papel.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
      </svg>
    ),
  },
  {
    year: "2017",
    title: "Diplomado en Redes Digitales + Soporte IT",
    place: "BM Computación",
    note: "Reparación de laptops, celulares e impresoras. Premio honor al mérito.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
      </svg>
    ),
  },
  {
    year: "2018",
    title: "Inicio — Ing. Ciencias y Sistemas",
    place: "USAC · Guatemala",
    note: "También: Diplomado en Administración de Redes Digitales.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
      </svg>
    ),
  },
  {
    year: "2022",
    title: "Proyectos personales activos",
    place: "GitHub · youtube.com/@programandoconpepito",
    note: "Empieza el canal de YouTube sobre análisis y diseño de sistemas.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M10 8l6 4-6 4V8zm11-5H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14z" />
      </svg>
    ),
  },
  {
    year: "2024",
    title: "Auxiliar de cátedra — ADS 2",
    place: "USAC · Noveno semestre",
    note: "Impartir laboratorio, evaluar proyectos, explicar lo que entendí hasta que otros también lo entiendan.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4zm0 14l3-3.86 2.14 2.58 3-3.86L18 18H6z" />
      </svg>
    ),
  },
  {
    year: "Sep 2025",
    title: "Consultor independiente",
    place: "Guatemala",
    note: "Arquitectura UML, revisión metodológica (RUP/SCRUM), asesoría a proyectos de graduación.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M20 6h-2.18c.07-.44.18-.88.18-1.35C18 2.53 15.5 0 12.35 0c-1.7 0-3.25.76-4.35 2.02C6.9.76 5.35 0 3.65 0 .5 0-2 2.53-2 4.65c0 .47.11.91.18 1.35H-2v14h22V6zm-7.65-4c1.18 0 2.15.97 2.15 2.15 0 1.18-.97 2.15-2.15 2.15-1.18 0-2.15-.97-2.15-2.15C10.2 2.97 11.17 2 12.35 2zM3.65 2c1.18 0 2.15.97 2.15 2.15 0 1.18-.97 2.15-2.15 2.15C2.47 6.3 1.5 5.33 1.5 4.15 1.5 2.97 2.47 2 3.65 2zM2 18V8h8v10H2zm10 0V8h8v10h-8z" />
      </svg>
    ),
  },
  {
    year: "2025",
    title: "Cierre de pensum — Sistemas",
    place: "USAC",
    note: "El final de una etapa, el inicio de la siguiente.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
      </svg>
    ),
  },
  {
    year: "2026",
    title: "Inicio — Ing. Ambiental",
    place: "USAC",
    note: "La intersección que quiero explorar: IoT + ML aplicado a monitoreo ambiental real.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-8 2 2-3 6-4 6-4C13 3 9 7 17 8z" />
      </svg>
    ),
  },
];

const EDUCATION = [
  {
    year: "2018 — 2025",
    title: "Ingeniería en Ciencias y Sistemas",
    place: "Universidad de San Carlos de Guatemala · USAC",
    note: "Cierre de pensum. Auxiliar de ADS 2 (2024). Intercambio académico USAC → Universidad Modular Abierta, El Salvador.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z" />
      </svg>
    ),
    color: "#4B8EFF",
  },
  {
    year: "2026 — presente",
    title: "Ingeniería Ambiental",
    place: "Universidad de San Carlos de Guatemala · USAC",
    note: "En curso. Enfoque en la intersección IoT + monitoreo ambiental.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-8 2 2-3 6-4 6-4C13 3 9 7 17 8z" />
      </svg>
    ),
    color: "#4ade80",
  },
  {
    year: "2014 — 2016",
    title: "Bachiller Industrial — Mecánica General",
    place: "Instituto Técnico Vocacional Dr. Imrich Fichmann · Guatemala",
    note: "Manufactura, CAD, tornería. La base física de todo lo que vino después.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
      </svg>
    ),
    color: "#fb923c",
  },
];

const VALUES = [
  {
    glyph: "01",
    title: "Calcular antes de encender",
    body: "Cualquier decisión técnica sin datos previos es una apuesta, no ingeniería. La predicción va siempre antes del experimento.",
  },
  {
    glyph: "02",
    title: "Las derrotas enseñan más",
    body: "El LED quemado, el circuito mal calculado, el deploy que cayó: cada falla tiene más información que diez éxitos.",
  },
  {
    glyph: "03",
    title: "Construir desde cero cuando sea posible",
    body: "No por masoquismo, sino porque el que construyó entiende. Usar una caja negra es rápido; entenderla es duradero.",
  },
  {
    glyph: "04",
    title: "La basura es un recurso",
    body: "Un plotter de $5 con lectoras de CD. Una RPi5 como servidor. La limitación obliga a ser más ingeniero, no menos.",
  },
];

const LOGROS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm0-11.5v5.25l4.5 2.67-.75 1.23L11 13.25V7.5z" />
      </svg>
    ),
    color: "#4B8EFF",
    title: "Auxiliar de Cátedra — ADS 2",
    desc: "Laboratorio de Análisis y Diseño de Sistemas 2, USAC. Impartición, evaluación y asesoría directa a estudiantes en proyectos de laboratorio.",
    year: "2024",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
      </svg>
    ),
    color: "#4ade80",
    title: "Intercambio Académico Internacional",
    desc: "Movilidad estudiantil USAC Guatemala → Universidad Modular Abierta, El Salvador. Experiencia académica internacional.",
    year: "2023",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
      </svg>
    ),
    color: "#f472b6",
    title: "Premios de Oratoria y Declamación",
    desc: "Reconocimientos en comunicación técnica efectiva. Habilidad aplicada en docencia universitaria y presentaciones académicas.",
    year: "2016–2018",
  },
];

const CV_PROJECTS = [
  {
    tag: "Compiladores",
    title: "Compilador / Analizador Sintáctico",
    desc: "Desarrollo de analizador léxico y sintáctico para generación de árboles de sintaxis abstracta (AST).",
    stack: ["Java", "ANTLR4"],
    neon: "#00f5ff",
    link: "https://github.com/Mau-Noj",
  },
  {
    tag: "DevOps",
    title: "Gestión de Proyectos con Taiga",
    desc: "Orquestación de entorno local de gestión de proyectos mediante Docker Compose con Nginx como proxy.",
    stack: ["Docker", "Nginx", "Linux"],
    neon: "#fb923c",
    link: "https://github.com/Mau-Noj",
  },
  {
    tag: "Web App",
    title: "Portfolio Profesional",
    desc: "Aplicación web responsiva con despliegue automatizado. Actualmente en producción en mauricionoj.com.",
    stack: ["React", "Vite", "Firebase"],
    neon: "#4B8EFF",
    link: "https://mauricionoj.com",
  },
];

const CHAPTER_SECTIONS = [
  {
    key: "filosofia",
    title: "Filosofía de trabajo",
    color: "#d4420a",
    body: "Calcular antes de encender. Las derrotas enseñan más que los éxitos. Construir desde cero porque quien construyó entiende. La limitación obliga a ser más ingeniero, no menos.",
  },
  {
    key: "stack",
    title: "Stack técnico",
    color: "#00f5ff",
    body: "Más de 30 tecnologías organizadas por área. Haz click en cada tarjeta para ver el gráfico de evolución real y los temas dominados.",
  },
  {
    key: "trayectoria",
    title: "Trayectoria",
    color: "#4ade80",
    body: "Del taller de mecánica a la consultoría de arquitectura de software. Un camino no lineal que conecta hardware, software y docencia.",
  },
  {
    key: "educacion",
    title: "Educación formal",
    color: "#a78bfa",
    body: "Dos ingenierías en USAC más formación técnica continua. La combinación de sistemas + ambiental define el foco: tecnología con impacto real.",
  },
  {
    key: "logros",
    title: "Logros y distinciones",
    color: "#f472b6",
    body: "Auxiliar de cátedra, intercambio internacional y reconocimientos en comunicación técnica.",
  },
  {
    key: "proyectos",
    title: "Proyectos destacados",
    color: "#fb923c",
    body: "Compiladores, DevOps, y el propio portafolio. Proyectos que aplican lo aprendido en contextos reales.",
  },
];

const PERSONAL_TABS = [
  {
    id: "musica",
    label: "Música",
    color: "#ff3cac",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
      </svg>
    ),
    title: "Gustos Musicales",
    body: [
      "La música clásica es mi modo concentración — Bach o Chopin cuando escribo código o estudio.",
      "Pero cuando me relajo, la cumbia y la marimba ganan. Soy guatemalteco, ¿qué esperabas?",
      "También escucho rock en español, metal progresivo y bandas sonoras de videojuegos.",
    ],
    tags: ["Clásica", "Cumbia", "Rock", "Marimba"],
  },
  {
    id: "libros",
    label: "Libros",
    color: "#00f5ff",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zM21 18.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" />
      </svg>
    ),
    title: "Lectura",
    body: [
      "Técnico cuando quiero profundizar — Clean Code, The Pragmatic Programmer.",
      "También ciencia ficción: Asimov, Arthur C. Clarke. Me gusta imaginar el futuro.",
    ],
    tags: ["Técnico", "Sci-Fi", "Asimov"],
  },
  {
    id: "hardware",
    label: "Hardware",
    color: "#39ff14",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 9V7h-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zm-4 10H4V5h14v14z" />
      </svg>
    ),
    title: "Hardware Libre",
    body: [
      "Tengo una RPi5 como servidor casero. Antes construí un plotter con lectoras de CD usadas — costó $5.",
      "Un circuito quemado es un reto, no basura.",
    ],
    tags: ["RPi", "Arduino", "DIY", "Repair"],
  },
  {
    id: "cafe",
    label: "Café",
    color: "#fb923c",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z" />
      </svg>
    ),
    title: "Café",
    body: [
      "El café es combustible y ritual. Guatemala tiene algunos de los mejores granos del mundo.",
      "Lo prefiero negro, sin azúcar. Si tiene que ser largo y fuerte para sobrevivir un debug de 3am, mejor.",
    ],
    tags: ["Negro", "Guatemalteco", "3am debug"],
  },
  {
    id: "ambiente",
    label: "Ambiente",
    color: "#4ade80",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-8 2 2-3 6-4 6-4C13 3 9 7 17 8z" />
      </svg>
    ),
    title: "Medio Ambiente",
    body: [
      "Curso Ingeniería Ambiental no solo por título — creo que la tecnología tiene una deuda con el planeta.",
      "Me interesa el monitoreo ambiental con IoT: sensores de calidad del aire, agua, temperatura.",
    ],
    tags: ["IoT", "Sensores", "Datos reales"],
  },
  {
    id: "ensenar",
    label: "Enseñar",
    color: "#a78bfa",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
      </svg>
    ),
    title: "Enseñar",
    body: [
      "Fui auxiliar de cátedra y me quedé con ganas de más. Explicar algo difícil hasta que el otro lo entienda es una de las mejores sensaciones.",
      "Por eso el canal de YouTube — no para seguidores, sino para que alguien diga: ahh, ahora sí entendí.",
    ],
    tags: ["YouTube", "Cátedra", "UML"],
  },
];

// ── Nombre neon ─────────────────────────────────────────────
const NeonLine = ({ text, color }) => (
  <span className="about__name-line" style={{ color, "--nl-color": color }}>
    {text}
  </span>
);

// ── Ring Chart animado ──────────────────────────────────────
const RingChart = ({ pct, color, size = 64 }) => {
  const svgRef = useRef(null),
    circleRef = useRef(null);
  const [display, setDisplay] = useState(0);
  const r = (size - 10) / 2,
    circ = 2 * Math.PI * r;
  useEffect(() => {
    const svg = svgRef.current,
      el = circleRef.current;
    if (!svg || !el) return;
    el.style.transition = "none";
    el.style.strokeDasharray = `0 ${circ}`;
    setDisplay(0);
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            el.style.transition =
              "stroke-dasharray 1.4s cubic-bezier(0.4,0,0.2,1)";
            el.style.strokeDasharray = `${(pct / 100) * circ} ${circ}`;
            const start = performance.now();
            const tick = (now) => {
              const p = Math.min((now - start) / 1400, 1);
              setDisplay(Math.round((1 - Math.pow(1 - p, 2)) * pct));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }),
        );
      },
      { threshold: 0.25 },
    );
    obs.observe(svg);
    return () => obs.disconnect();
  }, [pct, circ]);
  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="as-ring"
      style={{ overflow: "visible", flexShrink: 0 }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        strokeWidth="5"
        className="as-ring-track"
      />
      <circle
        ref={circleRef}
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={`0 ${circ}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ filter: `drop-shadow(0 0 6px ${color})` }}
      />
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fill={color}
        fontSize="11"
        fontFamily="'JetBrains Mono', monospace"
        fontWeight="700"
      >
        {display}%
      </text>
    </svg>
  );
};

// ── Gráfico de línea temporal SVG ──────────────────────────
const LineChart = ({ points, color, width = 260, height = 110 }) => {
  const pad = { t: 14, r: 14, b: 28, l: 28 };
  const W = width - pad.l - pad.r,
    H = height - pad.t - pad.b,
    n = points.length;
  if (n < 2) return null;
  const xs = points.map((_, i) => pad.l + (i / (n - 1)) * W);
  const ys = points.map((p) => pad.t + H - (p.level / 100) * H);
  const path = points
    .map((_, i) => {
      if (i === 0) return `M ${xs[0]} ${ys[0]}`;
      const cpx = (xs[i - 1] + xs[i]) / 2;
      return `C ${cpx} ${ys[i - 1]}, ${cpx} ${ys[i]}, ${xs[i]} ${ys[i]}`;
    })
    .join(" ");
  const area = path + ` L ${xs[n - 1]} ${pad.t + H} L ${xs[0]} ${pad.t + H} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {[25, 50, 75, 100].map((gl) => {
        const gy = pad.t + H - (gl / 100) * H;
        return (
          <g key={gl}>
            <line
              x1={pad.l}
              y1={gy}
              x2={pad.l + W}
              y2={gy}
              stroke={color}
              strokeOpacity="0.1"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <text
              x={pad.l - 4}
              y={gy + 1}
              textAnchor="end"
              fontSize="6"
              fontFamily="'JetBrains Mono',monospace"
              fill={color}
              fillOpacity="0.45"
            >
              {gl}
            </text>
          </g>
        );
      })}
      <path d={area} fill={color} fillOpacity="0.12" />
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
      {points.map((p, i) => (
        <g key={i}>
          <circle
            cx={xs[i]}
            cy={ys[i]}
            r="4"
            fill={color}
            style={{ filter: `drop-shadow(0 0 4px ${color})` }}
          />
          <text
            x={xs[i]}
            y={pad.t + H + 10}
            textAnchor="middle"
            fontSize="6.5"
            fontFamily="'JetBrains Mono',monospace"
            fill={color}
            fillOpacity="0.7"
          >
            {p.year}
          </text>
          {p.label && (
            <text
              x={xs[i]}
              y={ys[i] - 8}
              textAnchor="middle"
              fontSize="6"
              fontFamily="'JetBrains Mono',monospace"
              fill={color}
              fillOpacity="0.85"
            >
              {p.label}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
};

// ── Carta con volteo — modal centrado ──────────────────────
const SkillModal = ({ skill, color, onClose }) => {
  const [flipped, setFlipped] = useState(false);
  const tlData = TIMELINE_DATA[skill.name],
    topics = TOPICS_DATA[skill.name],
    icon = ICONS[skill.name];
  if (!tlData) return null;
  const last = tlData.points[tlData.points.length - 1];
  return (
    <div className="sp-overlay" onClick={onClose}>
      <div className="sp-card-scene" onClick={(e) => e.stopPropagation()}>
        <div
          className={`sp-card${flipped ? " sp-card--flipped" : ""}`}
          style={{ "--sp-color": color }}
        >
          <div className="sp-face sp-face--front">
            <div className="sp-face-bar" />
            <button
              className="sp-close-btn"
              onClick={onClose}
              aria-label="Cerrar"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="sp-header">
              <div className="sp-icon" style={{ color }}>
                {icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="sp-name" style={{ color }}>
                  {skill.name}
                </div>
                <div className="sp-desc">{tlData.desc}</div>
              </div>
              <span
                className="sp-level-badge"
                style={{
                  color,
                  borderColor: `${color}44`,
                  background: `${color}18`,
                }}
              >
                {skill.level}%
              </span>
            </div>
            <div className="sp-chart-label">
              <span>Evolución desde {tlData.points[0].year}</span>
              <span style={{ color, fontWeight: 700 }}>{last.level}% hoy</span>
            </div>
            <LineChart
              points={tlData.points}
              color={color}
              width={310}
              height={130}
            />
            <button className="sp-flip-btn" onClick={() => setFlipped(true)}>
              Temas que domino{" "}
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="sp-face sp-face--back">
            <div className="sp-face-bar" />
            <button
              className="sp-close-btn"
              onClick={onClose}
              aria-label="Cerrar"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="sp-header" style={{ marginBottom: "0.5rem" }}>
              <div className="sp-icon" style={{ color }}>
                {icon}
              </div>
              <div className="sp-name" style={{ color }}>
                {skill.name} · Temas
              </div>
            </div>
            <div className="sp-topics">
              {(topics || []).map((tp, i) => (
                <div key={i} className="sp-topic-row">
                  <span className="sp-topic-label">{tp.t}</span>
                  <div className="sp-topic-track">
                    <div
                      className="sp-topic-fill"
                      style={{
                        "--tw": `${tp.v}%`,
                        "--tc": color,
                        animationDelay: `${i * 0.06}s`,
                      }}
                    />
                  </div>
                  <span className="sp-topic-pct" style={{ color }}>
                    {tp.v}%
                  </span>
                </div>
              ))}
            </div>
            <button className="sp-flip-btn" onClick={() => setFlipped(false)}>
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>{" "}
              Ver evolución
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── CV Modal ────────────────────────────────────────────────
const CVModal = ({ onClose }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className="sp-overlay"
      onClick={onClose}
      style={{ alignItems: "flex-start", paddingTop: "2rem" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(860px, 96vw)",
          background: "var(--paper, #0e1117)",
          border: "1.5px solid #4B8EFF44",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 40px -8px #4B8EFF55",
          display: "flex",
          flexDirection: "column",
          maxHeight: "90vh",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.75rem 1.1rem",
            background: "rgba(75,142,255,0.08)",
            borderBottom: "1px solid #4B8EFF22",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}
          >
            <div style={{ display: "flex", gap: 5 }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#ff5f57",
                  display: "block",
                }}
              />
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#febc2e",
                  display: "block",
                }}
              />
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#28c840",
                  display: "block",
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.1em",
                color: "#7a7f8e",
              }}
            >
              CV_Brandon_Mauricio_Noj_Romero.pdf
            </span>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <a
              href={CV_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.55rem",
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#4B8EFF",
                background: "rgba(75,142,255,0.12)",
                border: "1px solid rgba(75,142,255,0.35)",
                borderRadius: "6px",
                padding: "0.38rem 0.85rem",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(75,142,255,0.22)";
                e.currentTarget.style.boxShadow =
                  "0 0 14px rgba(75,142,255,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(75,142,255,0.12)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Descargar
            </a>
            <button
              onClick={onClose}
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.18s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.18)";
                e.currentTarget.style.transform = "rotate(90deg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                e.currentTarget.style.transform = "none";
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
        {/* Visor */}
        <div style={{ position: "relative", flex: 1, minHeight: "70vh" }}>
          {!loaded && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                background: "var(--paper2, #111110)",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  border: "3px solid rgba(75,142,255,0.2)",
                  borderTopColor: "#4B8EFF",
                  borderRadius: "50%",
                  animation: "cvSpin 0.8s linear infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.62rem",
                  color: "#5a5a50",
                  letterSpacing: "0.1em",
                }}
              >
                Cargando CV...
              </span>
            </div>
          )}
          <iframe
            src={CV_PREVIEW_URL}
            title="CV Mauricio Noj"
            onLoad={() => setLoaded(true)}
            style={{
              width: "100%",
              height: "100%",
              minHeight: "70vh",
              border: "none",
              display: "block",
            }}
            allow="autoplay"
          />
        </div>
      </div>
      <style>{`@keyframes cvSpin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

const ChapterDivider = ({ title, color, icon, children }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="ch-sep-wrap">
      <button
        className={`ch-sep${open ? " ch-sep--open" : ""}`}
        style={{ "--ch-color": color }}
        onClick={() => setOpen(!open)}
      >
        <div className="ch-line-l" />
        <div className="ch-title-wrap">
          <div className="ch-icon">{icon}</div>
          <span className="ch-text">{title}</span>
          <svg
            className="ch-arrow"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
        <div className="ch-line-r" />
      </button>
      {children && (
        <div className={`ch-content${open ? " ch-content--open" : ""}`}>
          <p className="ch-content-inner">{children}</p>
        </div>
      )}
    </div>
  );
};

const PersonalTabs = () => {
  const [active, setActive] = useState(null);
  const tabRefs = useRef({});
  const getCardTop = (id) => {
    const el = tabRefs.current[id];
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const cardH = 290,
      navH = 115,
      winH = window.innerHeight;
    let top = rect.top + rect.height / 2 - cardH / 2;
    return Math.max(navH, Math.min(top, winH - cardH - 8));
  };
  const activeTab = PERSONAL_TABS.find((t) => t.id === active);
  return (
    <div className="ptabs-wrap">
      {PERSONAL_TABS.map((t) => (
        <div
          key={t.id}
          ref={(el) => (tabRefs.current[t.id] = el)}
          className={`ptab${active === t.id ? " ptab--on" : ""}`}
          style={{ "--ptc": t.color }}
          onMouseEnter={() => setActive(t.id)}
          onMouseLeave={() => setActive(null)}
        >
          <div className="ptab-peel">
            <div className="ptab-icon">{t.icon}</div>
            <span className="ptab-label">{t.label}</span>
          </div>
        </div>
      ))}
      {activeTab && (
        <div
          className="ptab-card ptab-card--visible"
          style={{ "--ptc": activeTab.color, top: `${getCardTop(active)}px` }}
          onMouseEnter={() => setActive(active)}
          onMouseLeave={() => setActive(null)}
        >
          <div className="ptab-card-bar" />
          <div className="ptab-card-head">
            <div className="ptab-card-icon">{activeTab.icon}</div>
            <span className="ptab-card-title">{activeTab.title}</span>
          </div>
          <div className="ptab-card-body">
            {activeTab.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="ptab-card-tags">
            {activeTab.tags.map((tg) => (
              <span key={tg} className="ptab-tag">
                {tg}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ── ChapterDivider icon helper ──────────────────────────────
const ChIcon = ({ d }) => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d={d} />
  </svg>
);

// ── Componente principal ────────────────────────────────────
export const AboutSection = () => {
  useSEO({
    title: "Sobre mí",
    description:
      "Conoce mi trayectoria, stack técnico y filosofía como desarrollador full-stack e instructor universitario en USAC.",
    url: "https://mauricionoj.com/sobre-mi",
  });
  const [activeGroup, setActiveGroup] = useState("Todos");
  const [modal, setModal] = useState(null);
  const [cvOpen, setCvOpen] = useState(false);
  const filtered =
    activeGroup === "Todos"
      ? STACK
      : STACK.filter((s) => s.group === activeGroup);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") {
        setModal(null);
        setCvOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modal || cvOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modal, cvOpen]);

  return (
    <>
      <div className="about-wrap">
        <div className="about">
          {/* ════ HERO ════ */}
          <section className="about__hero">
            <div className="about__avatar" aria-hidden="true">
              <div className="about__avatar-ring" />
              <div className="about__avatar-ring about__avatar-ring--2" />
              <span className="about__avatar-initials">MN</span>
              <div className="about__avatar-dot" />
            </div>
            <div className="about__hero-text">
              <p className="about__kicker">— sobre mí</p>
              <h1 className="about__name about__name--neon">
                <NeonLine text="Brandon Mauricio" color="#00f5ff" />
                <NeonLine text="Noj Romero" color="#39ff14" />
              </h1>
              <p className="about__role">
                Ing. Ciencias y Sistemas (cierre) · Ing. Ambiental · USAC
              </p>
              <p className="about__bio">
                Dicen que quien enseña aprende dos veces, y esa curiosidad es la
                que me mueve. Mi camino como{" "}
                <span
                  style={{ color: "#00f5ff", textShadow: "0 0 12px #00f5ff88" }}
                >
                  ingeniero en Ciencias y Sistemas
                </span>{" "}
                me ha permitido crecer como{" "}
                <span
                  style={{ color: "#a78bfa", textShadow: "0 0 12px #a78bfa88" }}
                >
                  consultor técnico
                </span>
                ,{" "}
                <span
                  style={{ color: "#a78bfa", textShadow: "0 0 12px #a78bfa88" }}
                >
                  auxiliar de cátedra
                </span>{" "}
                y{" "}
                <span
                  style={{ color: "#a78bfa", textShadow: "0 0 12px #a78bfa88" }}
                >
                  creador de contenido
                </span>
                . Pero no me detengo ahí: creo profundamente en el potencial de
                los{" "}
                <span
                  style={{ color: "#f472b6", textShadow: "0 0 12px #f472b688" }}
                >
                  sistemas embebidos
                </span>{" "}
                para transformar nuestro entorno, y por eso curso mi segunda
                ingeniería en el área{" "}
                <span
                  style={{ color: "#4ade80", textShadow: "0 0 12px #4ade8088" }}
                >
                  ambiental
                </span>
                . Ya sea frente a una consola, en una clase o diseñando
                hardware, mi meta es la misma: crear{" "}
                <span
                  style={{ color: "#ffe600", textShadow: "0 0 12px #ffe60088" }}
                >
                  tecnología con sentido
                </span>{" "}
                y compartir cada paso del proceso.
              </p>
              <div className="about__links">
                <a
                  href="https://github.com/Mau-Noj"
                  target="_blank"
                  rel="noopener"
                  className="about__link"
                >
                  <span className="about__link-icon">⌥</span> GitHub
                </a>
                <a
                  href="https://www.youtube.com/@programandoconpepito"
                  target="_blank"
                  rel="noopener"
                  className="about__link about__link--yt"
                >
                  <span className="about__link-icon">▶</span> YouTube
                </a>
                <a
                  href="mailto:brandonromero1964@gmail.com"
                  className="about__link"
                >
                  <span className="about__link-icon">✉</span> Email
                </a>
                <a
                  href="https://www.linkedin.com/in/brandon-mauricio-noj-romero-38b4701b6/"
                  target="_blank"
                  rel="noopener"
                  className="about__link"
                >
                  <span className="about__link-icon">in</span> LinkedIn
                </a>
                {/* ── NUEVO: botón CV ── */}
                <button
                  onClick={() => setCvOpen(true)}
                  className="about__link about__link--cv"
                  style={{ cursor: "pointer", background: "transparent" }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  Ver CV
                </button>
              </div>
            </div>
          </section>

          {/* ════ FILOSOFÍA ════ */}
          <ChapterDivider
            title="Filosofía de trabajo"
            color="#d4420a"
            icon={
              <ChIcon d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            }
          >
            Calcular antes de encender. Las derrotas enseñan más que los éxitos.
            Construir desde cero porque quien construyó entiende. La limitación
            obliga a ser más ingeniero, no menos.
          </ChapterDivider>
          <section className="about__section">
            <p className="about__section-label">Filosofía de trabajo</p>
            <div className="about__values">
              {VALUES.map((v) => (
                <article key={v.glyph} className="about__value">
                  <span className="about__value-glyph">{v.glyph}</span>
                  <div>
                    <h3 className="about__value-title">{v.title}</h3>
                    <p className="about__value-body">{v.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ════ STACK ════ */}
          <ChapterDivider
            title="Stack técnico"
            color="#00f5ff"
            icon={
              <ChIcon d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
            }
          >
            Más de 30 tecnologías organizadas por área. Haz click en cada
            tarjeta para ver el gráfico de evolución real y los temas dominados.
          </ChapterDivider>
          <section className="about__section">
            <p className="about__section-label">Stack técnico</p>
            <p className="about__stack-hint">
              Haz click en una tarjeta para ver el análisis detallado
            </p>
            <div className="about__stack-filters">
              {["Todos", ...GROUPS].map((g) => {
                const c = GROUP_COLOR[g],
                  on = activeGroup === g;
                return (
                  <button
                    key={g}
                    className={`about__sf${on ? " about__sf--on" : ""}`}
                    style={
                      on
                        ? {
                            background: c,
                            borderColor: c,
                            color: "#000",
                            boxShadow: `0 0 16px ${c}99`,
                          }
                        : { "--sf-color": c || "#d4420a" }
                    }
                    onClick={() => setActiveGroup(g)}
                  >
                    {g}
                  </button>
                );
              })}
            </div>
            <div className="about__stack-grid">
              {filtered.map((s) => {
                const color = GROUP_COLOR[s.group] || "#d4420a";
                const isActive = modal?.skill?.name === s.name;
                return (
                  <div
                    key={s.name}
                    className={`about__skill${isActive ? " about__skill--hovered" : ""}`}
                    style={{ "--skill-neon": color, cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setModal(isActive ? null : { skill: s, color });
                    }}
                  >
                    <div className="about__skill-ring-row">
                      <div className="about__skill-info">
                        <div className="about__skill-icon" style={{ color }}>
                          {ICONS[s.name]}
                        </div>
                        <span className="about__skill-name">{s.name}</span>
                        <span
                          className="about__skill-group-badge"
                          style={{
                            color,
                            borderColor: `${color}55`,
                            background: `${color}22`,
                          }}
                        >
                          {s.group}
                        </span>
                      </div>
                      <RingChart pct={s.level} color={color} size={64} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ════ TIMELINE ════ */}
          <ChapterDivider
            title="Trayectoria"
            color="#4ade80"
            icon={
              <ChIcon d="M13 2.05v2.02c3.95.49 7 3.85 7 7.93 0 3.21-1.81 6-4.72 7.28L13 17v5l5-3-1.22-1.22C19.91 16.07 22 12.21 22 12c0-5.18-3.95-9.45-9-9.95zM11 2.05C5.95 2.55 2 6.82 2 12c0 4.21 2.09 8.07 5.22 10.28L8 17l-2.28 2.06C2.81 18 1 15.21 1 12c0-4.08 3.05-7.44 7-7.93V2.05z" />
            }
          >
            Del taller de mecánica a la consultoría de arquitectura de software.
            Un camino no lineal que conecta hardware, software y docencia.
          </ChapterDivider>
          <section className="about__section">
            <p className="about__section-label">Trayectoria</p>
            <div className="about__timeline">
              {TIMELINE.map((t, i) => (
                <div key={i} className="about__tl-item">
                  <div className="about__tl-left">
                    <span className="about__tl-year">{t.year}</span>
                  </div>
                  <div className="about__tl-connector">
                    <div className="about__tl-dot">
                      <span className="about__tl-dot-icon">{t.icon}</span>
                    </div>
                    {i < TIMELINE.length - 1 && (
                      <div className="about__tl-line" />
                    )}
                  </div>
                  <div className="about__tl-right">
                    <h3 className="about__tl-title">{t.title}</h3>
                    <p className="about__tl-place">{t.place}</p>
                    <p className="about__tl-note">{t.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ════ EDUCACIÓN ════ */}
          <ChapterDivider
            title="Educación formal"
            color="#a78bfa"
            icon={
              <ChIcon d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
            }
          >
            Dos ingenierías en USAC más formación técnica continua. La
            combinación de sistemas + ambiental define el foco: tecnología con
            impacto real.
          </ChapterDivider>
          <section className="about__section">
            <p className="about__section-label">Educación formal</p>
            <div className="about__edu">
              {EDUCATION.map((e, i) => (
                <div
                  key={i}
                  className="about__edu-card"
                  style={{ "--edu-color": e.color }}
                >
                  <div
                    className="about__edu-icon-wrap"
                    style={{ color: e.color }}
                  >
                    {e.icon}
                  </div>
                  <span className="about__edu-year" style={{ color: e.color }}>
                    {e.year}
                  </span>
                  <h3 className="about__edu-title">{e.title}</h3>
                  <p className="about__edu-place">{e.place}</p>
                  <p className="about__edu-note">{e.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ════ LOGROS ════ */}
          <ChapterDivider
            title="Logros y distinciones"
            color="#f472b6"
            icon={
              <ChIcon d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            }
          >
            Auxiliar de cátedra, intercambio internacional y reconocimientos en
            comunicación técnica.
          </ChapterDivider>
          <section className="about__section">
            <p className="about__section-label">Logros y distinciones</p>
            <div className="about__logros-grid">
              {LOGROS.map((l, i) => (
                <div
                  key={i}
                  className="about__logro-card"
                  style={{ "--logro-color": l.color }}
                >
                  <div className="about__logro-top">
                    <div
                      className="about__logro-icon"
                      style={{ color: l.color }}
                    >
                      {l.icon}
                    </div>
                    <span
                      className="about__logro-year"
                      style={{ color: l.color }}
                    >
                      {l.year}
                    </span>
                  </div>
                  <h3 className="about__logro-title">{l.title}</h3>
                  <p className="about__logro-desc">{l.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ════ PROYECTOS ════ */}
          <ChapterDivider
            title="Proyectos destacados"
            color="#fb923c"
            icon={
              <ChIcon d="M3 3h7v7H3zm0 11h7v7H3zm11-11h7v7h-7zm0 11h7v7h-7z" />
            }
          >
            Compiladores, DevOps, y el propio portafolio. Proyectos que aplican
            lo aprendido en contextos reales.
          </ChapterDivider>
          <section className="about__section">
            <p className="about__section-label">Proyectos destacados</p>
            <div className="about__cv-projects">
              {CV_PROJECTS.map(({ tag, title, desc, stack, neon, link }) => (
                <a
                  key={title}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about__cv-card"
                  style={{ "--pneon": neon }}
                >
                  <div className="about__cv-card-top">
                    <span className="about__cv-tag">{tag}</span>
                    <svg
                      className="about__cv-arrow"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                  <h3 className="about__cv-title">{title}</h3>
                  <p className="about__cv-desc">{desc}</p>
                  <div className="about__cv-stack">
                    {stack.map((t) => (
                      <span key={t} className="about__cv-tech">
                        {t}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* ════ CV CTA BANNER ════ */}
          <section className="about__cv-banner">
            <div className="about__cv-banner-glow" />
            <div className="about__cv-banner-content">
              <div>
                <p className="about__cv-banner-label">Currículum Vitae</p>
                <h3 className="about__cv-banner-title">
                  ¿Quieres ver el CV completo?
                </h3>
                <p className="about__cv-banner-sub">
                  Experiencia, educación y habilidades en un solo documento.
                </p>
              </div>
              <div className="about__cv-banner-actions">
                <button
                  onClick={() => setCvOpen(true)}
                  className="about__cv-btn-view"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Ver CV
                </button>
                <a
                  href={CV_DOWNLOAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about__cv-btn-dl"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Descargar PDF
                </a>
              </div>
            </div>
          </section>

          {/* ════ FOOTER ════ */}
          <footer className="about__footer">
            <p className="about__footer-quote">
              "Aprendemos más de nuestras derrotas que de nuestras victorias."
            </p>
            <p className="about__footer-sub">
              Brandon Mauricio Noj Romero · Guatemala · mauricionoj.com
            </p>
            <VisitorCounter />
          </footer>
        </div>
      </div>

      {modal && (
        <SkillModal
          skill={modal.skill}
          color={modal.color}
          onClose={() => setModal(null)}
        />
      )}
      {cvOpen && <CVModal onClose={() => setCvOpen(false)} />}
      <PersonalTabs />
    </>
  );
};
