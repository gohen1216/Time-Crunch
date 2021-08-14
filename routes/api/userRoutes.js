const router = require('express').Router();
const user = require('../../models/user');

//const bcrypt = require('bcrypt');

// CREATE A USER  AKA SIGN UP
router.post('/', async (req, res) => {
  try {
      const userData = await user.create(req.body);
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
      
        res.status(200).json(userData);
    });
    
    
  } catch (err) {
    res.status(400).json(err);
  }
});



// GET A SINGLE USER
router.get('/:id', async (req, res) => {
    try {
      const userData = await user.findByPk(req.params.user_id);
      if (!userData) {
        res.status(404).json({ message: 'No user with this id!' });
        return;
        }
      
    res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
});

//UPDATE USERS

router.put('/:id', async (req, res) => {
    try {
      const userData = await user.update(req.body, {
        where: {
          id: req.params.user_id,
        },
        individualHooks:true
      });
      if (!userData[0]) {
        res.status(404).json({ message: 'No user with this id !' });
        return;
      }
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
});
// delete a user
router.delete('/:id', async (req, res) => {
    try {
      const userData = await user.destroy({
        where: {
          id: req.params.user_id,
        },
      });
  
      if (!userData) {
        res.status(404).json({ message: 'No user found with that id!' });
        return;
      }
  
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
});
  


//lOG IN ROUTE FUNCTION

router.post('/login', async (req, res) => {
  try {
    const userData = await user.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res.status(404).json({ message: 'Login failed. Please try again  !' });
      return;
    }
    const validPassword = await userData.checkPassword(
      req.body.password,
      
    );
    if (!validPassword) {
      res.status(400).json({ message: 'Login failed. Please try again  !' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

    res.json(200)({ user: userData, message: 'Successfully logged in!' });
  } );
  
} catch (err) {
    res.status(500).json(err);
  }
});


//lOG OUT FUNCTION

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});






module.exports = router;
