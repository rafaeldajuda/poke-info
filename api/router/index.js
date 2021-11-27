const pokeRoutes = require('./pokeRoutes');

module.exports = app => {
    app.get('/', (req, res) => {
        return res.status(200).json({ msg: 'ok' });
    });

    app.use('/api/v1', pokeRoutes);
}