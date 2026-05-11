import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  // Escenario: 10 personas navegando constantemente por 5 minutos
  vus: 10, 
  duration: '5m',
  thresholds: {
    http_req_duration: ['p(95)<150'], // Bajo carga normal, esperamos < 150ms
  },
};

export default function () {
  const res = http.get('http://127.0.0.1:5000');
  check(res, { 'status es 200': (r) => r.status === 200 });
  // Un usuario real lee la página por unos segundos
  sleep(Math.random() * 3 + 2); 
}
