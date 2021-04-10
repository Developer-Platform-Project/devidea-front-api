require('dotenv').config();
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import { createServer } from 'http';
import path from 'path';
import configurePassport from './passport';
import oauthRouter from './routers/oauthRouter';

const PORT = process.env.PORT || 4000;

const app = express();
const server = createServer(app);

configurePassport();

if (process.env.NODE_ENV === 'development') app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
if (process.env.NODE_ENV === 'production') app.use(express.static(path.resolve(__dirname, 'public')));

app.use('/auth', oauthRouter());

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });
}

server.listen(PORT, () => {
  console.log(`> http://localhost:${PORT}`);
});