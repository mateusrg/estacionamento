const connection = require('../config/db');

exports.createVaga = (req, res) => {
    const { setor, numeracao, eVagaEspecial } = req.body;
    const query = 'INSERT INTO Vagas (setor, numeracao, eVagaEspecial) VALUES (?, ?, ?)';
    const params = [setor, numeracao, eVagaEspecial];

    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao cadastrar vaga.' });
        }
        res.json({ success: true, message: 'Vaga cadastrada!' });
    });
};

exports.getVagas = (req, res) => {
    const query = 'SELECT V.*,  C.idCarro, C.placa, C.marca, C.modelo, C.cor, C.dataHoraEntrada, C.dataHoraSaida FROM Vagas V LEFT JOIN Carros C ON V.idVaga = C.idVaga AND C.dataHoraSaida IS NULL;';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar os vagas.' });
        }
        results.forEach(vaga => {
            vaga['eVagaEspecial'] = vaga['eVagaEspecial'][0] === 1;
        });
        res.json({ success: true, message: 'Vagas selecionadas com sucesso!', data: results });
    });
};

exports.updateVaga = (req, res) => {
    const { setor, numeracao, eVagaEspecial, idVaga } = req.body;
    const query = 'UPDATE Vagas SET setor = ?, numeracao = ?, eVagaEspecial = ? WHERE idVaga = ?';
    const params = [setor, numeracao, eVagaEspecial, idVaga];
    connection.query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao atualizar a vaga.' });
        }
        res.json({ success: true, message: 'Vaga atualizada com sucesso!' });
    });
};

exports.deleteVaga = (req, res) => {
    const query = 'DELETE FROM Vagas WHERE idVaga = ?';
    const params = [req.params.id];
    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao deletar a vaga.'});
        }
        res.json({ success: true, message: 'Vaga deletada com sucesso!'});
    });
};