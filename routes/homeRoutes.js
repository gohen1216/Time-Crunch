const router = require('express').Router();
const { appointment, user } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try 
    {
      const appointmentData = await appointment.findAll({
        attributes: ['visitReason', 'appointment_id','appointmentName'],
        // include: [

        //   {
        //   },
        // ],
      });
      const appointments = appointmentData.map((appointment)=> appointment.get({ plain: true }));
      console.log(appointments)
      res.render('homepage', { 
        appointments, 
        //logged_in: req.session.logged_in 
      });
    
    } catch (err) 
    
    {
      console.log(err)
      res.status(500).json(err);
    }
});

router.get('/appointment', async function (req,res){ 
  try 
    {
      const appointmentData = await appointment.findAll({
        attributes: ['visitReason', 'appointment_id','appointmentName'],
        
      });
      const appointments = appointmentData.map((appointment)=> appointment.get({ plain: true }));
      res.render('appointment', {
      appointments,
        //logged_in: req.session.logged_in
      });
    } catch (err) 
    
    {
      console.log(err)
      res.status(500).json(err);
    }
});

router.get('/appointment/:appointment_id', async (req, res) => {
    try {
      const appointmentData = await appointment.findByPk(req.params.appointment_id, {
        include: [
          {
            model: user,
            attributes: ['name'],//fix later
          },
        ],
      });
  
      const Appointment = appointmentData.get({ plain: true });
  
      res.render('appointment', {
        ...Appointment,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
});



router.get('/user/:user_id', withAuth, async (req, res) => {
    try {
      
      const userData = await user.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model:appointment }],
      });
  
      const User = userData.get({ plain: true });
  
      res.render('user', {
        ...User,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
});
  
// router.get('/login', (req, res) => {
//     // If the user is already logged in, redirect the request to another route
//     if (req.session.logged_in) {
//       res.redirect('/homepage');
//       return;
//     }
  
//     res.render('login');
// });




router.get('/login', async function (req,res){ 
  try 
    {
      const loginData = await user.findAll({
        attributes: ['username', 'email' , 'password'],
        
   });
      const login = loginData.map((login)=> login.get({ plain: true }));
      res.render('login', {
      appointments,
        //logged_in: req.session.logged_in
      });
    } catch (err) 
    
    {
      console.log(err)
      res.status(500).json(err);
    }
});
module.exports = router;
  

