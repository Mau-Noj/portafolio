import { useEffect, useState } from "react";

export default function VisitorCounter() {
  const [count, setCount] = useState(null);

useEffect(() => {
  // Solo contar una vez por sesión (evita doble conteo en React StrictMode)
  if (sessionStorage.getItem("mnr_counted")) {
    const stored = parseInt(localStorage.getItem("mnr_visits") || "0", 10);
    setTimeout(() => setCount(stored), 400);
    return;
  }

  const stored = parseInt(localStorage.getItem("mnr_visits") || "0", 10);
  const updated = stored + 1;
  localStorage.setItem("mnr_visits", updated);
  sessionStorage.setItem("mnr_counted", "1");
  setTimeout(() => setCount(updated), 400);
}, []);
  return (
    <span className="about__visit-counter">
      <span className="about__visit-dot" aria-hidden="true" />
      {count === null
        ? "···"
        : `${count.toLocaleString()} visita${count !== 1 ? "s" : ""}`}
    </span>
  );
}