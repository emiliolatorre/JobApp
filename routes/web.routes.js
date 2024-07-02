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
router.get("/dashboard", webController.getDashboard);

// Ruta para manejar la búsqueda por keyword
router.post('/search', async (req, res) => {
    try {
        const keyword = req.body.keyword || null;
        const updatedJobs = await jobService.readJobs(keyword);
        console.log(updatedJobs)
        res.status(200).render("home.pug", { jobs: updatedJobs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para manejar la búsqueda por skills
router.post('/searchbyskill', async (req, res) => {
    try {
        const skill = req.body.skill || null;
        const updatedJobs = await jobService.readJobsBySkill(skill);
        console.log(updatedJobs)
        res.status(200).render("home.pug", { jobs: updatedJobs });
    } catch (error) {
        console.error('Error searching jobs by skill:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
