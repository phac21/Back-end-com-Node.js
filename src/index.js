const express = require("express");
const { uuid } = require("uuidv4");

const app = express();
app.use(express.json());

/**
 * Metodos HTTP:
 *  get: busca informações do back-end
 *  post: cria uma informação no back-end
 * put: altera uma informação no back-end
 * delete: deleta uma informação no back-end
 */
/**
 * Query params filtros e paginação (?title=react)
 * Route params Identificar recursos (Atualizar/deletar)
 * Request params Conteúdo na hora criar ou editar um recurso (JSON)
 */
/**
 * Middleware:
 * Interceptador de requisições.
 * Pode interromper requisições ou alterar dados das requisições.
 * 
 */


const projects = [];

app.get("/projects", (request, response) => {
  const { title } = request.query;

  const results = title
    ? projects.filter(project.title.includes(title))
    : projects;

  return response.json(results);
});
app.post("/projects", (request, response) => {
  const { title, owner } = request.body;
  const project = { id: uuid(), title, owner };

  projects.push(project);

  return response.json(project);
});

/**
 * http://localhost:3333/projects/2
 */

app.put("/projects/:id", (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "Project not found" });
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete("/projects/:id", (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "Project not found" });
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send();
});

app.listen(3333, () => {
  console.log("✔ Back-end started!");
});
