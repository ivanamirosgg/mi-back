// server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

// Configura CORS para permitir el frontend.
// Para producción, reemplaza '*' por la URL específica del frontend en Render.
app.use(cors({
  origin: '*' // O: 'https://TU-FRONTEND.onrender.com'
}));

let counter = 0;

app.post('/api/accion', (req, res) => {
  const name = (req.body && req.body.name) || 'invitado';
  counter++;
  res.json({
    message: `Hola ${name}, acción recibida correctamente.`,
    count: counter,
    timestamp: new Date().toISOString()
  });
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Backend escuchando en puerto ${port}`);
});
