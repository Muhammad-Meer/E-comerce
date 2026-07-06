const express = require('express');
const {protect} = require('../middleware/auth.middleware');
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
    .post(protect, admin, upload.single('image'), createproduct);

router.route('/:id')
    .get(getproductsByid)
    .put(protect, admin, upload.single('image'), updateProduct)
    .delete(protect, admin, deleteproduct);

module.exports = router;