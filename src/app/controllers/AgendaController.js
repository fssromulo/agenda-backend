const AgendaService = require("../services/AgendaService");
const HorarioService = require("../services/HorarioService");

const AgendaController = {
	getTodasAgendasPorMes: async (req, res) => {
		try {
			const arrAgendas = await AgendaService.getTodasAgendasPorMes();
			return res.status(200).json(arrAgendas);
		} catch (error) {
			console.log("Error to load all the agendas[AgendaController]", error);
			return res.status(500).json({ error: "Error to load all the agendas[AgendaController]" });
		}
	},

	async insertAgendas(req, res) {
		try {
			const arrAgendaToSave = req.body || null;
			if (!arrAgendaToSave) {
				return res.status(400).json({ error: "You need to pass the a body." });
			}

			for (let objAgendaToSave of arrAgendaToSave) {
				const objAtividade = {
					id: null,
					id_atividade_origem: null,
					nome: objAgendaToSave.title,
					descricao: objAgendaToSave.eventDetail,
				};

				objAtividadeReturn = await AgendaService.insertAgendas(objAtividade);
				const idAtividade = objAtividadeReturn.insertId;

				const arrFieldsToUpdate = { id_atividade: idAtividade };
				const arrConditions = {
					hora_inicio: objAgendaToSave.startTime,
					hora_fim: objAgendaToSave.endTime,
					data_evento: objAgendaToSave.eventDate,
				};

				objHorarioUpdate = await HorarioService.updateHorarios(arrFieldsToUpdate, arrConditions);
			}
			return res.json();
		} catch (error) {
			console.log("Error to save/update ID [AgendaController]", error);
			return res.status(500).json({ error: "Error to save/update ID [AgendaController]" });
		}
	},
};

module.exports = AgendaController;
