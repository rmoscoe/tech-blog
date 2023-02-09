const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const mysql = require("mysql2/promise");
const Sequelize = require("sequelize");
const routes = require('./controllers');
const sequelize = require('./config/connection');
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const connect = require("connect-session-sequelize")(session.Store);
 
const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
};
app.use(session(sess));

// const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});