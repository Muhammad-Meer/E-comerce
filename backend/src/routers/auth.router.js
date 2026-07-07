const express = require('express')
const router = express.Router()
const  {protect} = require('../middleware/auth.middleware')
const  {admin} = require('../middleware/admin.middleware')
const {AuthController,LoginController,LogoutController, getUser , verifyotp} = require('../controller/authcontroller')


router.post('/register', AuthController )
router.post('/login', LoginController )
router.get('/logout', LogoutController )
router.get('/getuser', protect, admin ,  getUser )
router.get('/verify-otp', verifyotp)

module.exports = router
