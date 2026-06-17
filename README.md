# API REST de Ideias

API HTTP para gerenciamento de ideias, construída com Express 5 e versionamento de rotas (`/v1`, `/v2`). Os dados são mantidos em memória — sem persistência em banco.

## Stack

| Tecnologia | Versão |
|------------|--------|
| Node.js    | ESM (`"type": "module"`) |
| Express    | ^5.2.1 |
| Yarn       | 4.14.1 |

## Estrutura do projeto

```
.
├── server.js              # Bootstrap do servidor e montagem das rotas
└── routes/
    ├── v1/ideias.js       # Endpoints v1 — dataset padrão
    └── v2/ideias.js       # Endpoints v2 — dataset alternativo (prefixo TESTE)
```

## Execução

```bash
yarn install
node server.js
```

Servidor disponível em `http://localhost:3000`.

Com hot-reload (Node `--watch`):

```bash
node --watch server.js
```

## Versionamento

As duas versões expõem a mesma interface REST, com datasets distintos em memória:

| Versão | Base URL | Observação |
|--------|----------|------------|
| v1 | `/v1/ideias` | Nomes: `Ideia 1`, `Ideia 2`, … |
| v2 | `/v2/ideias` | Nomes: `TESTE 1`, `TESTE 2`, … |

A rota raiz (`GET /`) retorna instruções de uso das versões disponíveis.

## Modelo de dados

```json
{
  "id": 1,
  "nome_ideia": "string",
  "descricao": "string",
  "status": "string"
}
```

| Campo | Tipo | Obrigatório (POST) |
|-------|------|--------------------|
| `id` | `number` | Gerado automaticamente |
| `nome_ideia` | `string` | Sim |
| `descricao` | `string` | Sim |
| `status` | `string` | Sim |

## Endpoints

Substitua `{base}` por `/v1` ou `/v2`.

### `GET {base}/ideias`

Lista todas as ideias.

**Resposta:** `200 OK` — array de objetos.

```bash
curl http://localhost:3000/v1/ideias
```

### `GET {base}/ideias/:id`

Retorna uma ideia pelo `id`.

| Status | Corpo |
|--------|-------|
| `200` | Objeto da ideia |
| `404` | `{ "error": "Ideia não encontrada" }` |

```bash
curl http://localhost:3000/v1/ideias/1
```

### `POST {base}/ideias`

Cria uma nova ideia. Requer `Content-Type: application/json`.

**Body:**

```json
{
  "nome_ideia": "Nova ideia",
  "descricao": "Descrição",
  "status": "rascunho"
}
```

| Status | Corpo |
|--------|-------|
| `201` | Objeto criado (com `id` atribuído) |
| `400` | `{ "error": "nome_ideia, descricao e status são obrigatórios" }` |

```bash
curl -X POST http://localhost:3000/v1/ideias \
  -H "Content-Type: application/json" \
  -d '{"nome_ideia":"Nova ideia","descricao":"Descrição","status":"rascunho"}'
```

### `PUT {base}/ideias/:id`

Atualiza todos os campos de uma ideia existente.

| Status | Corpo |
|--------|-------|
| `200` | Objeto atualizado |
| `404` | `{ "error": "Ideia não encontrada" }` |

```bash
curl -X PUT http://localhost:3000/v1/ideias/1 \
  -H "Content-Type: application/json" \
  -d '{"nome_ideia":"Ideia atualizada","descricao":"Nova descrição","status":"ativo"}'
```

### `DELETE {base}/ideias/:id`

Remove uma ideia.

| Status | Corpo |
|--------|-------|
| `200` | `"Ideia deletada"` |
| `404` | `{ "error": "Ideia não encontrada" }` |

```bash
curl -X DELETE http://localhost:3000/v1/ideias/1
```

## Comportamento e limitações

- **Armazenamento em memória:** reiniciar o processo restaura o dataset inicial de cada versão.
- **IDs sequenciais:** novos registros recebem `id = length + 1` do array atual; exclusões não reutilizam IDs.
- **PUT parcial:** campos ausentes no body são sobrescritos com `undefined` — envie o objeto completo.
- **Middleware:** `express.json()` habilitado globalmente para parsing de JSON no body.

## Logs

Cada handler registra no stdout o status HTTP e a operação executada (ex.: `Status: 200 - Ideias listadas`).
