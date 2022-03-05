var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
require('dotenv').config()
const saltRounds = bcrypt.genSaltSync(Number(process.env.SALT_FACTOR)) // process.env.SALT_FACTOR this will read the valuable in .env
const {User} = require('../models') //that target the user in model/user.js
const jwt = require('jsonwebtoken'); //protecting the profile and give a cookie


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST users registering. */
router.post('/register', async (req,res) => {
  const {username, password, email} = req.body; //shortcut for req.body.username req.body.password req.body.email
  const hash = bcrypt.hashSync(password, saltRounds)

  const user = await User.create({ //User is defined up, and it's a model in model/user.js
    username: username,
    password : hash,
    email: email
  })  //in order to use await, must define it by getting User from model/user.js
  res.json({
    id: user.id,
    username: user.username
  }) //res.json will send our data to the database as json. 

})

/* POST users login. */
router.post('/login', async (req,res) => {
  const {username, password} = req.body; //shortcut for req.body.username req.body.password req.body.email

  const user = await User.findOne({ 
    where: {
      username:username
    }
  });

  if(user){
    //takes our user input password from req.body, uses bcrypt to hash it 
    //and check that hash is the same as the already hashed password in our DB
    const comparePass = bcrypt.compareSync(password, user.password) //user.password coming from const user line 35, but password coming from line 33, means req.body.password.
    if (comparePass ===true) {
      const token = jwt.sign(
        {
        data: user.username,
      },
      process.env.SECRET_KEY,
      {expiresIn: '1h'}
      );
      res.cookie("token", token)
    res.redirect(`/profile/${user.id}`);
    } else {
      res.send('Sorry, wrong password')
    }
  } else {
    res.send("Sorry, no user found");
  }
});

module.exports = router;
