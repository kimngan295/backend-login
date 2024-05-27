import express from 'express';
import { routeUser } from './userRoute.js';

const router = express.Router();

export const initAPIRoute = async (app) => {
    routeUser(router);
    app.use('/', router);
};