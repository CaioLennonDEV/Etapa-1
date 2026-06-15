import express from 'express';

// Chamada do express
const app = express();

// Porta de conexão
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

