import express from 'express';
import { loginUser } from '../controllers/loginController.js';
import { registerUser } from '../controllers/registerController.js';

export const routeUser = (router) => {
    router.post('/login', loginUser)
    router.post('/register', registerUser)
}

