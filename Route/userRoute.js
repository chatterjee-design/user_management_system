const express = require('express');
const router = express.Router();
const path = require('path'); 
const jwtAuth = require('../Middleware/middleWare');
const {signUp, signIn, getUser, logOut} = require('../UserController/userController')


router.post('/signUp', signUp)
router.post('/signIn', signIn)
router.get('/getUser', jwtAuth , getUser)
router.get('/logout', jwtAuth, logOut)

// Serve reg.html for the signup route
router.get('/signUp', (req, res) => {
    const regPath = path.join(__dirname, '../../Client/reg');
    res.sendFile(path.join(regPath, 'reg.html'));
  });
router.get('/signIn', (req, res) => {
    const regPath = path.join(__dirname, '../../Client/login');
    res.sendFile(path.join(regPath, 'login.html'));
  });

module.exports = router