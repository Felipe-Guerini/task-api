# API de Tarefas

## Resumo

Esta API permite a gestão de tarefas, associadas a usuários. Cada usuário pode ter várias tarefas. A API possui operações para listar, buscar, criar, atualizar e excluir tarefas.

## Tecnologias

- **Node.js** com **Express.js**
- **PostgreSQL** (via Neon.tech)
- `dotenv` para variáveis de ambiente
- `pg` como driver PostgreSQL

## Configuração e Execução

### 1. Pré-requisitos

- Node.js 
- Postman ou Insomnia 
- Conta Neon.tech 

### 2. Configuração do Projeto

1.  Clone o repositório ou navegue até a pasta do projeto:
    ```bash
    git clone 
    cd task-api
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```

### 3. Configuração do Banco de Dados

1.  **Crie um projeto no Neon.tech** e obtenha sua **"Connection string" completa** no painel (na seção "Connect").
2.  No arquivo `src/app.js`, configure o `Pool` usando esta string diretamente:
    ```javascript
    
    const pool = new Pool({
      connectionString: "COLE_SUA_CONNECTION_STRING_COMPLETA_DO_NEON_AQUI",
    });
    ```
    - **Importante:** Remova ou comente outras configurações de `user`, `host`, `password`, etc., pois a `connectionString` já as contém.
3.  **Crie as tabelas** executando o conteúdo de `create_tables.sql` no "SQL Editor" do Neon.tech:
    ```sql
    -- Exemplo:
    -- CREATE TABLE usuarios (...);
    -- CREATE TABLE tarefas (...);
    ```
4.  **Opcional:** Insira alguns dados de usuário via SQL para testes:
    ```sql
    INSERT INTO usuarios (nome, email) VALUES ('Ana Paula', 'ana.paula@example.com');
    ```

### 4. Iniciar a API

1.  No terminal, no diretório raiz do projeto:
    ```bash
    npm start
    ```
2.  Aguarde a mensagem: `Server is running on port 3000`.

## Testando a API

Use Postman ou Insomnia para testar os endpoints. A URL base é `http://localhost:3000/api`.

- **`GET /items`**: Lista todas as tarefas.
- **`GET /items/:id`**: Busca uma tarefa específica.
- **`POST /items`**: Cria uma nova tarefa (enviar JSON no corpo: `{ "titulo": "...", "status": "...", "usuario_id": null }`).
- **`PUT /items/:id`**: Atualiza uma tarefa existente (enviar JSON no corpo).
- **`DELETE /items/:id`**: Deleta uma tarefa.

## Estrutura do Projeto

- `src/controllers/`: Lógica de negócio dos endpoints.
- `src/routes/`: Definição das rotas da API.
- `src/app.js`: Configuração principal do servidor.
- `.env`: Variáveis de ambiente.
- `create_tables.sql`: Script de criação das tabelas.

