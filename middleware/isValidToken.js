
const jwt = require('jsonwebtoken')
require('dotenv').config()


const isValidToken = (req, res, next) => {
     const token = req.cookies["token"]
     console.log('This is token: ', token )

     if(token) {
       jwt.verify(
         token,
         process.env.SECRET_KEY,
         function(err, decoded) {
           if(decoded) {
             console.log('This is my payload with my token', decoded)
            //  res.json(decoded) / payload means json
             next()
           } else {
             res.redirect('/error')
            //  error is the error.ejs
           }
         }
       ) 
     } else {
       res.redirect('/error')
     }
   }

module.exports = isValidToken;