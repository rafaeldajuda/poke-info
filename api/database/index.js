const mongoose = require('mongoose');
const config = require('config');

const baseUrl = config.get('database.url');
const port = config.get('database.port');
const database = config.get('database.database');
const username = config.get('database.username');
const password = config.get('database.password');


mongoose.connect(`mongodb://${baseUrl}/${database}`, {
    auth: {
        username: username,
        password: password,
    },
    authSource: 'admin',
    useUnifiedTopology: true,
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;

module.exports = mongoose;