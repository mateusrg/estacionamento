const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const port = 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

app.get('/', (req, res) => res.send('Hello, world!'));
const carroRoutes = require('./routes/carroRoutes');
const vagaRoutes = require('./routes/vagaRoutes');

app.use(carroRoutes);
app.use(vagaRoutes);