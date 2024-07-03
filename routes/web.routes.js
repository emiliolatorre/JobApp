const webController = require('../controllers/web.controllers');
const jobService = require('../services/jobs.services');
const router = require('express').Router();

// GET http://localhost::3000/
router.get("/", webController.getHome);
router.get("/scraper", webController.getScraping);
router.get("/signup", webController.getSignup);
router.get("/login", webController.getLogin);
router.get("/favorites", webController.getFavorites);
router.get("/profile", webController.getProfile);
router.get("/users", webController.getUsers);
router.post("/user-editor", webController.getEditUser);
router.get("/dashboard", webController.getDashboard);
router.post("/job-editor", webController.getEditJob);

// Ruta para manejar la búsqueda por keyword
router.post('/search', webController.getHome);

// Ruta para manejar la búsqueda por skills
router.post('/searchbyskill', webController.getHomeBySkill);

module.exports = router;
