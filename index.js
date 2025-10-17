// server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

// CORS: permitir solo tu frontend y permitir peticiones sin origin (curl/postman)
const WHITELIST = [
  'https://mi-frontt.onrender.com',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // requests from curl/postman
    if (WHITELIST.indexOf(origin) !== -1) return callback(null, true);
    return callback(new Error(`El origen ${origin} no está permitido por CORS`), false);
  },
  methods: ['GET','POST','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
};
app.use(cors(corsOptions));

// Logging simple
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl} - origin: ${req.get('origin') || 'no-origin'}`);
  next();
});

// Ruta raíz: información básica (útil para el profesor que abra el link principal)
app.get('/', (req, res) => {
  res.send(`
    <h2>Reingeniería - Backend</h2>
    <p>API disponible en:</p>
    <ul>
      <li><a href="/health">/health</a></li>
      <li><strong>POST</strong> /api/accion</li>
    </ul>
    <p>Si estás viendo "Cannot GET /" antes, sustituye este archivo por este y redeploy.</p>
  `);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString(), uptime: process.uptime() });
});

// API principal
let counter = 0;
app.post('/api/accion', (req, res) => {
  try {
    const name = req.body && typeof req.body.name === 'string' && req.body.name.trim().length > 0
      ? req.body.name.trim()
      : 'invitado';
    counter += 1;
    return res.json({
      message: `Hola ${name}, acción recibida correctamente.`,
      count: counter,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Error en /api/accion:', err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// 404 para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err && err.message ? err.message : err);
  if (err && err.message && err.message.startsWith('El origen')) {
    return res.status(403).json({ error: err.message });
  }
  res.status(500).json({ error: 'Error interno del servidor' });
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Backend escuchando en puerto ${port}`);
});
