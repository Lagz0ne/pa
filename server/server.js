import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import compress from 'compression';

import registrations from './route/registrationRoute';

const isProduction = process.env.NODE_ENV === 'production';
const app = express();

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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Registrations routes **/
app.use('/registration', registrations);

/** Default html hosting **/
app.use(express.static(__dirname + '/../build'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './www/index.html'));
});

app.listen(8080, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://0.0.0.0:8080');
});
