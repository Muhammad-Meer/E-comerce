const express = require('express')
const  protected = require('../middleware/auth.middleware')
const  admin = require('../middleware/admin.middleware')
const {getproducts ,createproduct , getproductsByid , updateprodeuct , deleteproduct } = require('../controller/product.controller')


const router = express.Router()
router.route('/').get(getproducts).post(protected , admin , createproduct)

router.route('/:id').get(getproductsByid).put(protected , admin , updateprodeuct).delete(protected, admin , deleteproduct)







module.exports = router
