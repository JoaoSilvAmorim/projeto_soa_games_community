const express = require('express');
const cors = require('cors');
const multer = require('multer');

module.exports = () => {
    const app = express();
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(multer().array());

    return app;
}