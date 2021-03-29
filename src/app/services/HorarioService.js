const MainModel = require("../models/mainModel");
const HorarioQuery = require("../models/querys/HorarioQuery");

const HorarioService = {
	async updateHorarios(arrFieldsToUpdate, arrConditions) {
		return await MainModel.update({
			ds_query: HorarioQuery.updateHorarios,
			arrFieldsToUpdate,
			arrConditions,
		});
	},
};

module.exports = HorarioService;
