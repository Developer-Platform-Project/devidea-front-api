import passport from 'passport';
import { Strategy as GitgubStrategy } from 'passport-github2';
import { SHA256 } from 'crypto-js';

const configurePassportGithub = () => {
  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

  passport.use(new GitgubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/callback',
    scope: [ 'user:email' ]
  },
    (accessToken, refreshToken, profile, cb) => {
      console.log('accessToken:', accessToken);
      console.log('refreshToken:', refreshToken);
      console.log('profile:', profile);
      const user = {
        provider: profile.provider,
        id: SHA256(`GITHUB${profile.id}`).toString(),
        email: profile.emails[0].value
      };
      return cb(null, user);
    }
  ));
};

export default configurePassportGithub;