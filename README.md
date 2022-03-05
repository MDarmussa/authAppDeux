By Mohammad Darmussa / March 5/2022

Goal:
- Sequelize ORM / create our database
- Express (create routes)
- create views and connecting our ejs templates to the routes
- create authentican security and tracking cookies

set up: 

- run: npx express-generator --ejs --git authAppDeux
 click yes

- run npm install //that install dependencies for json

- run: npm i pg sequelize bcrypt jsonwebtoken dotenv

- on bin/www change the port and the console
- on package.json, add script for "dev": "nodemon ./bin/www"
- create instance in elephantsql.com
- run: npx sequelize-cli init //create models/migration/seeders
- on config /  config.json , add 
     "username": "icirksed",
    "password": "bt43cc8j1db8fG2WvhUvIUBdFYWuMYqO",
     "host": "hansken.db.elephantsql.com",
     "dialect": "postgres"

- create a new favorite, then copy the url in URL from elephantSQL, add the host on postico and nickname.

- run: npx sequelize-cli model:generate --name User --attributes "username:string, password:string, email:string"
- run:npx sequelize-cli db:migrate //migrate it to our database

- create the route and the setting in user.js
     const bcrypt = require('bcrypt');
     require('dotenv').config()
     const saltRounds = bcrypt.genSaltSync(Number(process.env.SALT_FACTOR)) // process.env.SALT_FACTOR this will read the valuable in .env


- create a register route in user.js.  to run (npm run dev)

- on postico, http://localhost:3333/users/register
   -  choose body, raw, JSON.
   - {
          "username":"Mohamed",
          "password":"password",
          "email":"Mohamed@gmail.com"
     }
- we should receive back down on postico, 
          {
    "id": 2,
    "username": "Mohamed"
     }    // that's based on res.json on user.JSON (register route)


- create a new route for login on user.js
   .....etc

- create views (login.ejs / register.ejs / profile.ejs)
- add some stuff in error.ejs
- add connection on index.js and connect all routes as we need
- create (middleware) folder for our password token and add a file in it(isValidToken.js) then create the valid token and decode it for cookies.
- customize our message in profile.ejs to welcome the entered user by:
     - require the User to have access to the model. line 6 in index.js
     - add params for the is in line 26 / index.js
     - render the name in line 33 / index.js
     - redirect the user.id  for the profile in line 55/users.js







 links used
 - https://digitalcrafts.instructure.com/courses/172/pages/reading-sequelize-orm?module_item_id=12056
 - https://www.elephantsql.com/
