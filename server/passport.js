import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';

import config from './config';

passport.use(new Strategy({
    clientID: '590847770851-36cim4omoc6qo3rhk76a1s197gfhqh5s.apps.googleusercontent.com',
    clientSecret: 'ws776gLn1lqjhnu69pzSegN7',
    callbackURL: 'http://pulse.work:8080/logged'
  }, (accessToken, refreshToken, profile, done) => {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return done(null, profile);
  }));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

export default passport;
