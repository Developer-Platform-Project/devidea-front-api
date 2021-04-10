import { Router } from 'express';
import { Multer } from 'multer';

const uploadRouter = (upload: Multer) => {
  const router = Router();

  router.post('/profile', upload.single('profile-img'), (req, res) => {
    const { filename } = req.file;
    res.json({ result: true, filename });
  });

  return router;
};

export default uploadRouter;