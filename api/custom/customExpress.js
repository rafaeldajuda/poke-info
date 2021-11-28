const express = require('express');
const routes = require('../router');
const middlewares = require('./middlewares');

module.exports = () => {
    const app = express();

    //MIDDLEWARES
    app.use((req, res, next) => {
        middlewares.validateContentType(req, res, next);
    });
    app.use(express.json());

    app.use((req, res, next) => {
        middlewares.headerAccept(req, res, next);
    });

    //ROUTES
    routes(app);

    return app;
}
