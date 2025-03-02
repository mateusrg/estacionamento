const connection = require('../config/db');

exports.createCarro = (req, res) => {
    const { placa, marca, modelo, cor, dataHoraEntrada, idVaga } = req.body;
    const query = 'INSERT INTO Carros (placa, marca, modelo, cor, dataHoraEntrada, idVaga) VALUES (?, ?, ?, ?, ?, ?)';
    const params = [placa, marca, modelo, cor, dataHoraEntrada, idVaga];

    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao cadastrar carro.' });
        }
        res.json({ success: true, message: 'Carro cadastrado!' });
    });
};

exports.getCarros = (req, res) => {
    const query = 'SELECT * FROM Carros C JOIN Vagas V ON C.idVaga = V.idVaga';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar os carros.' });
        }
        res.json({ success: true, message: 'Carros selecionados com sucesso!', data: results });
    });
};

exports.getCarroById = (req, res) => {
    const query = 'SELECT * FROM Carros WHERE idCarro = ?';
    const params = [req.params.id];
    connection.query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao buscar o carro.' });
        }
        res.json({ success: true, data: results[0] });
    });
};

exports.getCarrosByVaga = (req, res) => {
    const query = 'SELECT * FROM Carros C JOIN Vagas V ON C.idVaga = V.idVaga WHERE C.idVaga = ?';
    const params = [req.params.idVaga];
    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar os carros.' });
        }
        res.json({ success: true, data: results });
    });
};

exports.updateCarro = (req, res) => {
    const { placa, marca, modelo, cor, dataHoraEntrada, idVaga, idCarro } = req.body;
    const query = 'UPDATE Carros SET placa = ?, marca = ?, modelo = ?, cor = ?, dataHoraEntrada = ?, idVaga = ? WHERE idCarro = ?';
    const params = [placa, marca, modelo, cor, dataHoraEntrada, idVaga, idCarro];
    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao atualizar o carro.' });
        }
        res.json({ success: true, message: 'Carro atualizado com sucesso!' });
    });
};

exports.retirarCarro = (req, res) => {
    const query = 'UPDATE Carros SET dataHoraSaida = NOW() WHERE idCarro = ?';
    const params = [req.params.id];
    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao retirar o carro da vaga.' });
        }
        res.json({ success: true, message: 'Carro retirado da vaga com sucesso!' });
    });
};

exports.deleteCarro = (req, res) => {
    const query = 'DELETE FROM Carros WHERE idCarro = ?';
    const params = [req.params.id];
    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao deletar o carro.' });
        }
        res.json({ success: true, message: 'Carro deletado com sucesso!' });
    });
};