import { Router } from 'express';
import passport from 'passport';

const oauthRouter = () => {
  const router = Router();
  
  router.get('/google', passport.authenticate('google'));
  
  router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    console.log(req.user);
    res.json(req.user);
  });

  router.get('/github', passport.authenticate('github'));

  router.get('/github/callback', passport.authenticate('github'), (req, res) => {
    console.log(req.user);
    res.json(req.user);
  });

  router.get('/naver', passport.authenticate('naver'));

  router.get('/naver/callback', passport.authenticate('naver'), (req, res) => {
    console.log(req.user);
    res.json(req.user);
  });

  return router;
};

export default oauthRouter;