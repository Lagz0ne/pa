import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import compress from 'compression';
import passport from './passport';
import session from 'express-session';

import registrations from './route/registrationRoute';
import orders from './route/orderRoute';

const isProduction = process.env.NODE_ENV === 'production';
const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/www');

if (!isProduction) {
  const webpack = require('webpack');
  const config = require('../webpack.config');
  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    }
  }));

  app.use(require('webpack-hot-middleware')(compiler));
} else {
  /** Use compression in production **/
  app.use(compress());
}

/** Passport initialization **/
app.use(session({
  secret: 'tooDeep',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Registrations routes **/
app.use('/registration', registrations);
app.use('/order', orders);

/** authentication **/
app.get('/authenticate', passport.authenticate('google', { scope: ['profile'] }));
app.get('/logged',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  });


/** Default html hosting **/
app.use(express.static(__dirname + '/../build'));
app.get('*', (req, res) => {
  if (req.user) {
    res.render('index', {
      app: JSON.stringify({
        app: {
          user: {
            isLoggedIn: true,
            displayName: req.user.displayName
          }
        }
      })
    });
  } else {
    res.render('index', {
      app: "{}"
    });
  }
});

app.listen(8080, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://0.0.0.0:8080');
});
