module.exports = {
	updateHorarios: `
        UPDATE
            horarios
        SET
            $$campos$$
        WHERE
            $$condicoes$$ `,
};
