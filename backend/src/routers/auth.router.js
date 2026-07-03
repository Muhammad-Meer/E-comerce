const express = require('express')
const router = express.Router()
const  protected = require('../middleware/auth.middleware')
const  admin = require('../middleware/admin.middleware')
const {AuthController,LoginController,LogoutController, getUser} = require('../controller/authcontroller')


router.post('/register', AuthController )
router.post('/login', LoginController )
router.get('/logout', LogoutController )
router.get('/getuser', protected, admin ,  getUser )

module.exports = router
