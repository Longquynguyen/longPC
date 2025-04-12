const userRoutes = require('./users.routes');

function routes(app) {
    app.post('/api/register', userRoutes);
    app.post('/api/login', userRoutes);
}

module.exports = routes;
