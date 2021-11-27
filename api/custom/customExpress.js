const express = require('express');
const config = require('config');
const routes = require('../router');

module.exports = () => {
    const app = express();
    app.use(express.json());

    //MIDDLEWARES

    //ROUTES
    routes(app);

    return app;
}
