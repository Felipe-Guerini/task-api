const { Pool } = require("pg"); // Embora não usado diretamente aqui, é bom tê-lo para contexto

// Função para listar todos os registros
const getItems = async (req, res) => {
  try {
    const result = await req.app.locals.pool.query("SELECT * FROM tarefas");
    res.json(result.rows);
  } catch (err) {
    // Logar o erro para depuração (opcional, mas recomendado)
    console.error("Erro ao listar tarefas:", err);
    res
      .status(500)
      .json({ error: "Erro interno do servidor ao listar tarefas." });
  }
};

// Função para buscar um registro específico
const getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await req.app.locals.pool.query(
      "SELECT * FROM tarefas WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Registro não encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(`Erro ao buscar tarefa com ID ${id}:`, err);
    res
      .status(500)
      .json({ error: "Erro interno do servidor ao buscar tarefa." });
  }
};

// Função para criar um novo registro
const createItem = async (req, res) => {
  const { titulo, descricao, status, usuario_id } = req.body;
  try {
    // Validação de campos obrigatórios
    if (!titulo || !status) {
      return res
        .status(400)
        .json({ message: 'Campos "titulo" e "status" são obrigatórios.' });
    }

    const result = await req.app.locals.pool.query(
      "INSERT INTO tarefas (titulo, descricao, status, usuario_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [titulo, descricao, status, usuario_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao criar tarefa:", err);
    res
      .status(500)
      .json({ error: "Erro interno do servidor ao criar tarefa." });
  }
};

// Função para atualizar um registro
const updateItem = async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, status, usuario_id } = req.body; // Inclui usuario_id caso queira atualizar também

  try {
    // Validação de campos obrigatórios para atualização (se for o caso)
    // Se titulo ou status forem opcionais na atualização, remova esta validação
    if (!titulo && !descricao && !status && !usuario_id) {
      // Verifica se pelo menos um campo foi fornecido para atualização
      return res
        .status(400)
        .json({ message: "Nenhum campo para atualização foi fornecido." });
    }

    // Construção dinâmica da query para permitir atualização parcial
    let query = "UPDATE tarefas SET";
    const queryParams = [];
    let paramIndex = 1;

    if (titulo !== undefined) {
      query += ` titulo = $${paramIndex++},`;
      queryParams.push(titulo);
    }
    if (descricao !== undefined) {
      query += ` descricao = $${paramIndex++},`;
      queryParams.push(descricao);
    }
    if (status !== undefined) {
      query += ` status = $${paramIndex++},`;
      queryParams.push(status);
    }
    if (usuario_id !== undefined) {
      // Adicionado suporte para atualização de usuario_id
      query += ` usuario_id = $${paramIndex++},`;
      queryParams.push(usuario_id);
    }

    // Remover a última vírgula e adicionar a cláusula WHERE
    query = query.slice(0, -1); // Remove a última ','
    query += ` WHERE id = $${paramIndex++} RETURNING *`;
    queryParams.push(id);

    const result = await req.app.locals.pool.query(query, queryParams);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Registro não encontrado para atualização." });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(`Erro ao atualizar tarefa com ID ${id}:`, err);
    res
      .status(500)
      .json({ error: "Erro interno do servidor ao atualizar tarefa." });
  }
};

// Função para deletar um registro
const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await req.app.locals.pool.query(
      "DELETE FROM tarefas WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Registro não encontrado para exclusão." });
    }
    res.status(204).send(); // 204 No Content - Sucesso na exclusão sem corpo de resposta
  } catch (err) {
    console.error(`Erro ao deletar tarefa com ID ${id}:`, err);
    res
      .status(500)
      .json({ error: "Erro interno do servidor ao deletar tarefa." });
  }
};

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
