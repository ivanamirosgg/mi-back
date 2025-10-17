const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: '*' // para pruebas, luego puedes restringir a tu dominio
}));
app.use(express.json());

app.get('/action', (req, res) => {
  res.json({ ok: true, method: 'GET', mensaje: 'Hola desde GET en backend 🚀' });
});

app.post('/action', (req, res) => {
  const user = req.body.user || 'invitado';
  res.json({ ok: true, method: 'POST', mensaje: `Hola ${user} desde POST 👋` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Backend escuchando en puerto ${PORT}`));
