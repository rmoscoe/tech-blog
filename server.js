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
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const auth = require("./utils/auth");
 
const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SECRET,
  cookie: {
    maxAge: 86400
  },
  store: new SequelizeStore({
    db: sequelize,
  }),
  resave: false,
  saveUninitialized: false,
};
app.use(session(sess));

// const hbs = exphbs.create({ helpers });
const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

app.use(routes);

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});