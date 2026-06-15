import express from 'express';

// Chamada do express
const app = express();
app.use(express.json());
// Middleware para parsear o corpo da requisição como JSON
// Objeto de teste
const ideias = [{id: 1, nome_ideia: 'Ideia 1', descricao: 'Descrição 1', status: 'Status 1'},    
    {id: 2, nome_ideia: 'Ideia 2', descricao: 'Descrição 2', status: 'Status 2'},
    {id: 3, nome_ideia: 'Ideia 3', descricao: 'Descrição 3', status: 'Status 3'}];

// Rota de teste
app.get('/', (req, res) => {
    res.send("Bem vindo a minha api de ideias, use /ideias na url para ver as ideias");
});
// req e res são objetos que representam a requisição e a resposta HTTP

// Buscando todas as ideias
app.get('/ideias', (req, res) => {
    res.json(ideias);
});

// Buscando uma ideia específica
app.get('/ideias/:id', (req, res) => {       // Number(req.params.id) é para converter o id para um número
    const ideia = ideias.find(ideia => ideia.id === Number(req.params.id));
    res.json(ideia);
});

// Criando uma nova ideia
app.post('/ideias', (req, res) => {
    ideias.push({id: ideias.length + 1, nome_ideia: req.body.nome_ideia, descricao: req.body.descricao, status: req.body.status});
    res.json(ideias);
});

// Atualizando uma ideia específica
app.put('/ideias/:id', (req, res) => {
    const ideia = ideias.find(ideia => ideia.id === Number(req.params.id));
    ideia.nome_ideia = req.body.nome_ideia;
    ideia.descricao = req.body.descricao;
    ideia.status = req.body.status;
    res.json(ideia);
});

// Deletando uma ideia específica
app.delete('/ideias/:id', (req, res) => {
    const ideia = ideias.find(ideia => ideia.id === Number(req.params.id));
    ideias.splice(ideias.indexOf(ideia), 1);   // splice é para remover o elemento da lista
    res.json(ideias);
});

// Porta de conexão
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

