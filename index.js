const express = require('express');
const cors = require('cors');

const app = express();

// ⚡ Habilitar CORS para tu frontend
app.use(cors({
  origin: '*' // para pruebas; en producción reemplaza '*' con la URL del frontend
}));
app.use(express.json());

// Endpoint GET
app.get('/action', (req, res) => {
  res.json({ ok: true, method: 'GET', mensaje: 'Hola desde GET en backend 🚀' });
});

// Endpoint POST
app.post('/action', (req, res) => {
  const user = req.body.user || 'invitado';
  res.json({ ok: true, method: 'POST', mensaje: `Hola ${user} desde POST 👋` });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend escuchando en puerto ${PORT}`));
