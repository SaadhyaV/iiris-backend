import express          from 'express';

import Auth             from './auth'

export const RootController             = { route: '/',                 controller: express.Router().get('/', (req, res)=> res.send('HOME'))};

export const AuthController             = { route: '/auth',             controller: Auth};
// export const AuthController             = { route: '/auth',             controller: Auth};
