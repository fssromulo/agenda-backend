module.exports = {
	findTodasAgendasPorMes: `
        (
            SELECT
                h.id AS id_horario,
                CONcat(h.data_evento, " ", MIN(h.hora_inicio)) AS start,
                CONcat(h.data_evento, " ", MAX(h.hora_fim)) AS end,
                a.id AS id_atividade,
                a.nome AS title,
                a.descricao,
                IF(a.id IS NOT NULL, "horario-reservado", "horario-disponivel") class
            FROM
                horarios h
                INNER JOIN atividade a ON ( a.id = h.id_atividade )
            WHERE
               	MONTH("2021-03-28") <= MONTH(h.data_evento) AND
	            YEAR("2021-03-28") <= YEAR(h.data_evento)
            GROUP BY
                h.data_evento, a.id
            ORDER BY
                h.data_evento ASC, h.hora_inicio ASC
        )
        UNION ALL
        (
            SELECT
                h.id AS id_horario,
                CONcat(h.data_evento, " ", h.hora_inicio) AS start,
                CONcat(h.data_evento, " ", h.hora_fim) AS end,
                null AS id_atividade,
                "Disponível" AS title,
                "" AS descricao,
                "horario-disponivel" class
            FROM
                horarios h

            WHERE
                MONTH("2021-03-28") <= MONTH(h.data_evento) AND
                YEAR("2021-03-28") <= YEAR(h.data_evento)
                and h.id_atividade IS null
            ORDER BY
                h.data_evento ASC, h.hora_inicio ASC
        )
		`,

	insert: `
		INSERT INTO
			atividade
		 SET
			?
	`,

	updateHorarios: `
        UPDATE
            horarios
        SET
            $$campos$$
        WHERE
            $$condicoes$$ `,
};
