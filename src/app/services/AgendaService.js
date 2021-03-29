const MainModel = require("../models/mainModel");
const AgendaQuery = require("../models/querys/AgendaQuery");

const AgendaService = {
	async getTodasAgendasPorMes(dataAgenda) {
		try {
			let ds_query = AgendaQuery.findTodasAgendasPorMes;
			let arrWhereConditions = [];

			const objQuery = {
				ds_query,
				objFields: {},
				arrWhereConditions,
			};

			return await MainModel.findAll(objQuery);
		} catch (error) {
			const msg_error = `Error to load agendas, ${error}`;
			return res.status(500).json({ msg: msg_error });
		}
	},

	async insertAgendas(objPersonToInsert) {
		return await MainModel.insert(
			{
				ds_query: AgendaQuery.insert,
				arrFieldsToInsert: objPersonToInsert,
			},
			false
		);
	},

	async updateHorarios(arrFieldsToUpdate, arrConditions) {
		return await MainModel.update({
			ds_query: AgendaQuery.updateHorarios,
			arrFieldsToUpdate,
			arrConditions,
		});
	},
};

module.exports = AgendaService;
