// requiring the db module executes it
require('./db');

import UserController from './lib/user/UserController';
import AuthController from './lib/auth/AuthController';

import express from 'express';
const app = express();

// health check api for liveness probe
app.get('/health', (_, res) => res.send('Still alive.'));

app.use('/users', UserController);

app.use('/auth', AuthController);

export default app;
