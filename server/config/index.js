const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  module.exports = require('./config.production');
} else {
  module.exports = require('./config');
}
