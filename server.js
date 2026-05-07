const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.post('/salvar', (req, res) => {
  const dados = {
    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    ...req.body
  };

  console.log(dados);

  fs.appendFileSync(
    'logs.txt',
    JSON.stringify(dados) + '\n'
  );

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});