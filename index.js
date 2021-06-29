const express = require('express');
const mongoose = require('mongoose');
const expressHBS= require('express-handlebars');
const jwt = require('jsonwebtoken');
// аналогом config file можно использовать process.env
const config = require("./config.json");
const mainRoutes = require('./routes/main.router');

const app = express();
const hbs = expressHBS.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'client');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(mainRoutes);

async function start() {
  try {
    await mongoose.connect(config.mongoUrl, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    app.listen(config.PORT, ()=>{
      console.log('app has been started on port:', config.PORT)
    })
  } catch (e) {
    console.log('ERROR:', e)
  }
}

start()

