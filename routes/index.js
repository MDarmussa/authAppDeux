var express = require('express');
// const jwt = require('jsonwebtoken');
var router = express.Router();
require('dotenv').config();
const isValidToken = require('../middleware/isValidToken')
const {User} = require('../models') //require the message for profile.ejs
const axios = require('axios');

/* GET data from  remote API. */
// const getBreeds = async () => {
//   try {
//     return await axios.get('https://dog.ceo/api/breeds/list/all')
//   } catch (error) {
//     console.error(error)
//   }
// }

// const countBreeds = async () => {
//   const breeds = await getBreeds()

//   if (breeds.data.message) {
//     console.log(`Got ${Object.entries(breeds.data.message).length} breeds`)
//   }
// }
// countBreeds()

router.get("/", async function (req, res, next) {
	var config = {
		method: "get",
		url: "https://nashvillecats-814a1-default-rtdb.firebaseio.com/books/-MxbBA3fSa6AGhhlVXNR.json",
		headers: {},
	};

	const book = await axios(config)
		.then(function (response) {
			return response.data;
		})
		.catch(function (error) {
			console.log(error);
		});
	console.log(book);

	res.render("index", { title: "Express", book });
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
  // res.render('profile')
});




module.exports = router;
