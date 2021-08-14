const router = require('express').Router();
const apptmentRoutes = require('./apptmentRoutes');
const userRoutes = require ('./userRoutes')


router.use('/apptment' , apptmentRoutes);
router.use('/user', userRoutes)



module.exports = router;