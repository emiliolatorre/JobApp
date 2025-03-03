const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express(); // Initialize server
const port = 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Import Middlewares
const morgan = require('./middlewares/morgan');

// Middlewares
app.use(morgan(':method :url :status - :response-time ms :body'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public')); // Serve static files
app.use(express.json()); // Habilito recepción de JSON en servidor

// Routes
const webRoutes = require("./routes/web.routes");
const jobsRoutes = require("./routes/jobs.routes");
const usersRoutes = require("./routes/users.routes");
const favoritesRoutes = require("./routes/favorites.routes");

// View engine setup
app.set('view engine', 'pug');
app.set('views', './views');

// API Routes
app.use('/', webRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/user', usersRoutes);
app.use('/api/favorites', favoritesRoutes);

const server = app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});

module.exports = server;