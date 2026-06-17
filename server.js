import express from 'express';
import apiv1 from './routes/v1/ideias.js';
import apiv2 from './routes/v2/ideias.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Use /v1/ideias ou /v2/ideias');
});

app.use('/v1', apiv1);  // monta /v1/ideias
app.use('/v2', apiv2);  // monta /v2/ideias

app.listen(3000, () => console.log('Servidor na porta 3000'));