import { Router } from 'express';
const router = Router();

// Objeto de teste
const ideias = [{id: 1, nome_ideia: 'TESTE 1', descricao: 'Descrição 1', status: 'Status 1'},    
    {id: 2, nome_ideia: 'TESTE 2', descricao: 'Descrição 2', status: 'Status 2'},
    {id: 3, nome_ideia: 'TESTE 3', descricao: 'Descrição 3', status: 'Status 3'}];

// req e res são objetos que representam a requisição e a resposta HTTP

// Buscando todas as ideias
router.get('/ideias', (req, res) => {
    console.log('Status: 200 - Ideias listadas');
    return res.status(200).json(ideias);
});

// Buscando uma ideia específica
router.get('/ideias/:id', (req, res) => {       // Number(req.params.id) é para converter o id para um número
    const ideia = ideias.find(ideia => ideia.id === Number(req.params.id));
    if (!ideia) {
        console.log('Status: 404 - Ideia não encontrada');
        return res.status(404).json({ error: 'Ideia não encontrada' });
    }
    console.log('Status: 200 - Ideia encontrada');
    return res.status(200).json(ideia);
});

// Criando uma nova ideia
router.post('/ideias', (req, res) => {
    const { nome_ideia, descricao, status } = req.body;

    if (!nome_ideia || !descricao || !status) { // if (!nome_ideia || !descricao || !status) é para verificar se os campos obrigatórios estão faltando
        console.log('Status: 400 - Campos obrigatórios faltando');
        return res.status(400).json({ error: 'nome_ideia, descricao e status são obrigatórios' });
    }
    const novaIdeia = {id: ideias.length + 1, nome_ideia, descricao, status}; // id: ideias.length + 1 é para adicionar o id da nova ideia
    ideias.push(novaIdeia);
    console.log('Status: 201 - Ideia criada');
    return res.status(201).json(novaIdeia);
});

// Atualizando uma ideia específica
router.put('/ideias/:id', (req, res) => {
    const ideia = ideias.find(ideia => ideia.id === Number(req.params.id));

    if (!ideia) {
        console.log('Status: 404 - Ideia não encontrada');
        return res.status(404).json({ error: 'Ideia não encontrada' });
    }

    ideia.nome_ideia = req.body.nome_ideia;
    ideia.descricao = req.body.descricao;
    ideia.status = req.body.status;
    console.log('Status: 200 - Ideia atualizada');
    return res.status(200).json(ideia);
});

// Deletando uma ideia específica
router.delete('/ideias/:id', (req, res) => {
    const ideia = ideias.find(ideia => ideia.id === Number(req.params.id));

    if (!ideia) {
        console.log('Status: 404 - Ideia não encontrada');
        return res.status(404).json({ error: 'Ideia não encontrada' });
    }

    ideias.splice(ideias.indexOf(ideia), 1);
    console.log('Status: 200 - Ideia deletada');
    return res.status(200).json('Ideia deletada');
});

export default router;