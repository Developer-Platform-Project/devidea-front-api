import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { SHA256 } from 'crypto-js';

const configurePassportGoogle = () => {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    scope: [ 'profile', 'email' ]
  },
    (accessToken, refreshToken, profile, cb) => {
      console.log('accessToken:', accessToken);
      console.log('refreshToken:', refreshToken);
      console.log('profile:', profile);
      const user = {
        provider: profile.provider,
        id: SHA256(`GOOGLE${profile.id}`).toString(),
        email: profile.emails[0].value
      };
      return cb(null, user);
    }
  ));
};

export default configurePassportGoogle;