const express = require('express')
const router = express.Router()
const {AuthController,LoginController,LogoutController, getUser} = require('../controller/authcontroller')


router.post('/register', AuthController )
router.post('/login', LoginController )
router.post('/logout', LogoutController )
router.get('/getuser', getUser )

module.exports = router
