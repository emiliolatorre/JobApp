const Job = require('../models/jobs.model');

const createJob = async (title, description, skills, client_location, url, source, status) => {
        try {
            // Busca el trabajo existente por título y descripción
            const existingJob = await Job.findOne({ title, description });
            if (existingJob) {
                // Si existe en mongodb, actualiza el trabajo
                existingJob.skills = skills;
                existingJob.client_location = client_location;
                existingJob.url = url;
                existingJob.source = source;
                existingJob.status = status;
                return await existingJob.save();
            } else {
                // Si no existe en mongodb, crea una nuevo
                const job = new Job({
                    title,
                    description,
                    skills,
                    client_location,
                    url,
                    source,
                    status
                });

                const result = await job.save();
                console.log(result);
                return result;
            }
        } catch (error) {
            console.log('Error creating job:', error);
        }
    };
// createJob('Twitter embed from website shared to twitter','having issue with embedding correctly an image into our twitter share . see screenhots where image is missing, quick and easy task, looking forward to hearing from you', 'Twitter/X, HTML, JavaScript', 'Spain', 'hola.com', 'scraping', 'true');

// const readJobs = async () => {
//     try {
//         const jobs = await Job
//             .find()
//             .select('title description skills client_location url source status -_id -__v')
//         console.log(jobs);
//         return jobs;
//     } catch (error) {
//         console.log('Error listing jobs:', error);
//     }
// };
// readJobs();

// READ 2.0
const readJobs = async (keyword) => {
    try {
        let filter = {};
        
        if (keyword) {
            filter = {
                $or: [
                    { title: { $regex: keyword, $options: 'i' } }, 
                    { description: { $regex: keyword, $options: 'i' } },
                    { client_location: { $regex: keyword, $options: 'i' } },
                    { skills: { $regex: keyword, $options: 'i' } }
                ]
            };
        }
        
        const jobs = await Job.find(filter)
            .select('title description skills client_location url source status -_id')
            .limit(10); // Limitar a los primeros 10 resultados
        
        return jobs;
    } catch (error) {
        console.log('Error listing jobs:', error);
    }
};

// Filtro por skills
const readJobsBySkill = async (skill) => {
    try {
        let filter = {};

        if (skill) {
            filter = {
                skills: { $regex: skill, $options: 'i' }
            };
        }

        const jobs = await Job.find(filter)
            .select('title description skills client_location url source status -_id')
            .limit(10); // Limitar a los primeros 10 resultados
        
        return jobs;
    } catch (error) {
        console.log('Error searching jobs by skill:', error);
    }
};

// Filtro por objectId
const readJobsByID = async (_id) => {
    const jobsFiltered = [];
    try {
        _id.forEach( async (ID) => {
            
        
        // Verificar si el _id es válido y convertirlo a un ObjectId si es necesario
        if (!mongoose.Types.ObjectId.isValid(ID)) {
            throw new Error('Invalid ID format');
        }

        // Crear un filtro para buscar exactamente por _id
        const filter = { _id: mongoose.Types.ObjectId(ID) };

        const job = await Job.find(filter)
            .select('title description skills client_location url source status -_id')
            .limit(10); // Limitar a los primeros 10 resultados
            jobsFiltered.push(job)
        });
        return jobsFiltered;
    } catch (error) {
        console.log('Error searching jobs by skill:', error);
    }
};

const updateJob = async (filter, update) => {
    try {
        const modifiedJob = await Job
            .findOneAndUpdate(filter, update, {
                new: true
            });
        console.log(modifiedJob);
        return modifiedJob;
    } catch (error) {
        console.log('Cannot update job, error:', error)
    }
};
// updateJob({title: 'Twitter embed from website shared to twitter'},
// {
//     title: "Experienced Virtual Assistant for Creating Shopify Landing/Product Pages",
//     description: "We are looking for an experienced virtual assistant who can help us create stunning landing and product pages on Shopify for our multiple e-commerce brands.",
//     skills: "Shopify, Web Design, Data Entry",
//     client_location: "United States",
//     url: 'hola.com',
//     source: 'scraping',
//     status: false
// });

const deleteJob = async (filter) => {
    try {
        const removedJob = await Job
            .deleteOne({ 'title': filter });
        console.log(removedJob);
        return removedJob;
    } catch (error) {
        console.log('Error deleting job:', error);
    }
};
//deleteJob("Experienced Virtual Assistant for Creating Shopify Landing/Product Pages");

module.exports = {
    createJob,
    readJobs,
    readJobsBySkill,
    readJobsByID,
    updateJob,
    deleteJob
};