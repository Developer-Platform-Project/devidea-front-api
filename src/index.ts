require('dotenv').config();
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { createServer } from 'http';
import path from 'path';
import configurePassport from './passport';
import oauthRouter from './routers/oauthRouter';
import uploadRouter from './routers/uploadRouter';

const PORT = process.env.PORT || 4000;

const app = express();
const server = createServer(app);

if (process.env.NODE_ENV === 'development') app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
if (process.env.NODE_ENV === 'production') app.use(express.static(path.resolve(__dirname, 'public')));

configurePassport();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '..', 'upload'));
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}${file.originalname.substring(file.originalname.lastIndexOf('.'))}`);
  }
});
const upload = multer({ storage });
app.use('/auth', oauthRouter());
app.use('/upload', uploadRouter(upload));

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });
}

server.listen(PORT, () => {
  console.log(`> http://localhost:${PORT}`);
});