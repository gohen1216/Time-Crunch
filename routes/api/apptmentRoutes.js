const router = require('express').Router();
const { appointment } = require('../../models');
const withAuth = require('../../utils/auth');




//APPOINTMENT CREATION
router.post('/', withAuth, async (req, res) => {
  console.log('----^^-----')
  try {
      const appointmentData = await appointment.create({
        ...req.body,
       // user_id: req.session.user_id,
      });
      console.log(appointmentData)
      
      res.status(200).json(appointmentData);
    } catch (err) {
      res.status(400).json(err);
    }
});




// //A USER CAN SEE ALL APPOINTMENTS
// router.get('/', async (req, res) => {
//     try {
//       const appointmentData = await appointment.findAll({
//         attributes: ['appointment_id','appointmentName'],
//         // include: [

//         //   {
//         //   },
//         // ],
//       });
//       res.status(200).json('appointmentRoutes' + appointmentData);
//     } catch (err) {
//       res.status(500).json(err);
//     }
// });


//USER CAN FIND A SINGULAR APPT
router.get('/:appointment_id', async (req, res) => {
    try {
      const appointmentData = await  appointment.findByPk(req.params.appointment_id, {
        include: [{ model: user }]
      });
  
      if (!appointmentData) {
        res.status(404).json({ message: 'No appointment found with this id!' });
        return;
      }
  
      res.status(200).json(appointmentData);
    } catch (err) {
      res.status(500).json(err);
    }
});




//USER CAN UPDATE APPOINTMENT BASED ON ITS ID

router.put('/:appointment_id', withAuth,async (req, res) => {
    try {
      const appointmentData = await appointment.update(req.body, {
        where: {
          id: req.params.appointment_id,
          user_id: req.session.user_id,
        },
      });
      if (!appointmentData[0]) {
        res.status(404).json({ message: 'No appointment with this id!' });
        return;
      }
      res.status(200).json(appointmentData);
    } catch (err) {
      res.status(500).json(err);
    }
});

//USER HAS OPTION TO DELETE APPOINTMENT
router.delete('/:appointment_id', withAuth, async (req, res) => {
    try {
      const appointmentData = await appointment.destroy({
        where: {
          id: req.params.appointment_id,
          user_id: req.session.user_id,
        }
      });
  
      if (!appointmentData) {
        res.status(404).json({ message: 'No appointment  with this id!' });
        return;
      }
  
      res.status(200).json(appointmentData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;