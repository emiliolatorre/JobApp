const { body, param, query } = require("express-validator");

const validateCreateFavorite = [
    body("email")
        .exists().withMessage("Email is required")
        .isEmail().withMessage("Email format wrong"),
    body("job_id")
        .exists().withMessage("Job_id is required")
        .isString().withMessage("Job_id should be string")
];

const validateReadFavorites = [
    query("email")
        .exists().withMessage("Email is required")
        .isEmail().withMessage("Email format wrong")
]

const validateDeleteFavorite = [
    query("email")
        .exists().withMessage("Email is required")
        .isEmail().withMessage("Email format wrong"),
    query("job_id")
        .exists().withMessage("Job_id is required")
        .isString().withMessage("Job_id should be string")
];

module.exports = {
    validateCreateFavorite,
    validateReadFavorites,
    validateDeleteFavorite
};