const jobsController = require('../controllers/jobs.controllers');
const jobService = require('../services/jobs.services');
const router = require('express').Router();
const { validateCreateJob, validateUpdateJob, validateDeleteJob } = require("../validators/jobs.validators");

// POST http://localhost:3000/api/jobs
router.post('/', validateCreateJob, jobsController.createJobController);
// GET http://localhost:3000/api/jobs --> All Jobs
router.get('/', jobsController.readJobsController);
// PUT http://localhost:3000/api/jobs?title='Twitter embed from website shared to twitter'
router.put('/', validateUpdateJob, jobsController.updateJobController);
// DELETE http://localhost:3000/api/jobs?title='Twitter embed from website shared to twitter'
router.delete('/', validateDeleteJob, jobsController.deleteJobController);

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