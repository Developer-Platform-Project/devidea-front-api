import passport from 'passport';
import configurePassportGithub from './github';
import configurePassportGoogle from './google';
import configurePassportNaver from './naver';

const configurePassport = () => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  configurePassportGoogle();
  configurePassportGithub();
  configurePassportNaver();
};

export default configurePassport;