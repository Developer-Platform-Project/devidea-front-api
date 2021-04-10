import passport from 'passport';
import { Strategy as NaverStrategy } from 'passport-naver';
import { SHA256 } from 'crypto-js';

const configurePassportNaver = () => {
  const { NAVER_CLIENT_ID, NAVER_CLIENT_SECRET } = process.env;

  passport.use(new NaverStrategy({
    clientID: NAVER_CLIENT_ID,
    clientSecret: NAVER_CLIENT_SECRET,
    callbackURL: '/auth/naver/callback'
  },
    (accessToken, refreshToken, profile, cb) => {
      console.log('accessToken:', accessToken);
      console.log('refreshToken:', refreshToken);
      console.log('profile:', profile);
      const user = {
        provider: profile.provider,
        id: SHA256(`NAVER${profile.id}`).toString(),
        email: profile.emails[0].value
      };
      return cb(null, user);
    }
  ));
};

export default configurePassportNaver;