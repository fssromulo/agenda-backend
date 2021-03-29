const express = require("express");
const routes = express.Router();

const AgendaController = require("./app/controllers/AgendaController");

routes.get("/agendas", AgendaController.getTodasAgendasPorMes);
routes.post("/agendas", AgendaController.insertAgendas);

module.exports = routes;
