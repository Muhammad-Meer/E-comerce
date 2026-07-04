const express = require('express');
const protected = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');

const { 
    getproducts, 
    createproduct, 
    getproductsByid, 
    updateProduct, 
    deleteproduct 
} = require('../controller/product.controller');

const upload = require('../config/multer');   // ← Yeh line important hai

const router = express.Router();

router.route('/')
    .get(getproducts)
    .post(protected, admin, upload.single('image'), createproduct);

router.route('/:id')
    .get(getproductsByid)
    .put(protected, admin, upload.single('image'), updateProduct)
    .delete(protected, admin, deleteproduct);

module.exports = router;