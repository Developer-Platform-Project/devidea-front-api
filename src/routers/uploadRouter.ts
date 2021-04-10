import { Router } from 'express';
import { Multer } from 'multer';

const uploadRouter = (upload: Multer) => {
  const router = Router();

  router.post('/profile', upload.single('profile-img'), (req, res) => {
    res.json({ result: true });
  });

  return router;
};

export default uploadRouter;