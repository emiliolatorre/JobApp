const { body, param, query } = require("express-validator");

const validateCreateUser = [
    body("name")
        .exists().withMessage("Name of users is required")
        .isString().withMessage("Name should be string"),
    body("email")
        .exists().withMessage("User email is required")
        .isEmail().withMessage("Valid email is required"),
    body("password")
        .exists().withMessage("User password is required")
        .isString().withMessage("Password should be string")
        .isLength({ min: 8 })
];

const validateGetUsersByEmail = [
    query('email')
        .notEmpty().withMessage("Email should exist to get by email")
        .isEmail().withMessage("Wrong email format")
]

const validateUpdateUser = [
    body("name")
        .optional()
        .isString().withMessage("Name should be string"),
    body("email")
        .optional()
        .isEmail().withMessage("Valid email is required"),
    body("password")
        .optional()
        .isString().withMessage("Password should be string"),
    body("role")
        .optional()
        .isString().withMessage("Role should be string"),
    body("old_email")
        .optional()
        .isEmail().withMessage("Valid Old email is required"),
    body("logged")
        .optional()
        .isBoolean({ strict: true }).withMessage("Logged has to be boolean"),
    body("last_logged_date")
        .optional()
    // .isDate().withMessage("Last Logged Date should be date")
];

const validateDeleteUser = [
    query('email')
        .notEmpty().withMessage("Email should exist to delete an user")
        .isEmail().withMessage("Valid email is required")
];

module.exports = {
    validateCreateUser,
    validateGetUsersByEmail,
    validateUpdateUser,
    validateDeleteUser
};