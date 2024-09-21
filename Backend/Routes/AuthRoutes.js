const express = require('express');
const Authrouter = express.Router();
const authController= require('../Controllers/AuthControllers.js');

Authrouter.post('/login',authController.login);
Authrouter.post('/logout',authController.logout);
Authrouter.post('/signup',authController.signup);

module.exports = Authrouter;