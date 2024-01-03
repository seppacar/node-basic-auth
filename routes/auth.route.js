const authController = require('../controllers/auth.controller')
const authRouter = require("express").Router();

authRouter.route("/login").post(authController.login); // User login route

authRouter.route("/register").post(authController.register); // User signup route

module.exports = authRouter;
