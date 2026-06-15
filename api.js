import express from 'express';

// Chamada do express
const app = express();

// Objeto de teste
const objeto = [{nome: 'João', idade: 20}, 
    {nome: 'Maria', idade: 21}];

// Rota de teste
app.get('/', (req, res) => {
    res.json(objeto);
});
// req e res são objetos que representam a requisição e a resposta HTTP

// Porta de conexão
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

