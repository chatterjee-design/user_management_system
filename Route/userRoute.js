const express = require('express');
const router = express.Router();
const jwtAuth = require('../Middleware/middleWare');
const {signUp, signIn, getUser, logOut} = require('../UserController/userController')


router.post('/signUp', signUp)
router.post('/signIn', signIn)
router.get('/getUser', jwtAuth , getUser)
router.get('/logout', jwtAuth, logOut)

module.exports = router