var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
require('dotenv').config();
const isValidToken = require('../middleware/isValidToken')
const {User} = require('../models') //require the message for profile.ejs


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});




router.get('/profile/:id', isValidToken, async (req, res, next) => {
  const {id} = req.params;

  const user = await User.findOne({
    where: {
      id:id
    }
  })
  res.render('profile', { name: user.username });
});




module.exports = router;
