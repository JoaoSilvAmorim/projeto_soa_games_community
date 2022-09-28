require('dotenv').config();
const app = require('./config/express')();
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 3000;
const db = require('./config/db');
const routes = require('./config/routes');

routes(app);

db.sync(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;