const webController = require('../controllers/web.controllers');
const jobService = require('../services/jobs.services');
const router = require('express').Router();
const protectedRoutes = require('../middlewares/verifiedToken');
const protectedRoutesAdmin = require('../middlewares/verifiedTokenAdmin');

// GET http://localhost::3000/
router.get("/", protectedRoutes, webController.getHome);
router.get("/scraper", protectedRoutesAdmin, webController.getScraping);
router.get("/signup", protectedRoutes, webController.getSignup);
router.get("/login", protectedRoutes, webController.getLogin);
router.get("/favorites", protectedRoutes, webController.getFavorites);
router.get("/profile", protectedRoutes, webController.getProfile);
router.get("/users", protectedRoutesAdmin, webController.getUsers);
router.get("/dashboard", protectedRoutesAdmin, webController.getDashboard);

// Ruta para manejar la búsqueda por keyword
router.post('/search', webController.getHome);

// Ruta para manejar la búsqueda por skills
router.post('/searchbyskill', webController.getHomeBySkill);

module.exports = router;
