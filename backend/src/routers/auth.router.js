const express = require('express')
const router = express.Router()
const {AuthController,LoginController,LogoutController} = require('../controller/authcontroller')


router.post('/register', AuthController )
router.post('/login', LoginController )
router.post('/logout', LogoutController )

module.exports = router
