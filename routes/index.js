const router = require("express").Router();

//Import routes
const authRouter = require('./auth.route')

// Mount each set of routes on the router
router.use('/auth', authRouter)

module.exports = router // Export the router instance for use in the application