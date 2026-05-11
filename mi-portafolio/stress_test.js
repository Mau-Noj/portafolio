import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 50 }, // Rampa de subida: de 0 a 20 usuarios
    { duration: '2m', target: 100 },  // Meseta: se mantiene con 20 usuarios
    { duration: '1m', target: 0 },  // Rampa de bajada: vuelve a 0
  ],
  thresholds: {
    // Definimos que el 95% de las peticiones deben ser menores a 100ms (en local)
    http_req_duration: ['p(95)<100'], 
    http_req_failed: ['rate<0.01'],   // Que falle menos del 1%
  },
};

export default function () {
  const res = http.get('http://127.0.0.1:5000');
  
  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  // El sleep es vital para simular comportamiento humano y no saturar el socket
  sleep(1); 
}
