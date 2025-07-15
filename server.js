const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Ruta para guardar IP
app.post('/guardar-ip', (req, res) => {
  const { ip } = req.body;
  if (!ip) return res.status(400).send('No se recibió IP');

  const linea = `${new Date().toISOString()} - IP: ${ip}\n`;
  fs.appendFile('ips.txt', linea, (err) => {
    if (err) {
      console.error('Error al guardar IP:', err);
      return res.status(500).send('Error al guardar IP');
    }
    res.send('IP guardada correctamente');
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
