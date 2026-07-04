const produntmodel = require('../models/produnt.model')
const cloudnary = require('../config/cloudnary')

const getproducts = async (req, res) => {
  try {
    const products = await produntmodel.find({});
    res.json(products)

  } catch (error) {
    res.status(500).json({ message: "server error" })
  }
};

const createproduct = async (req, res) => {
  const {name , descriptioin , price , categary , stock } =  req.body
  let imageurl = '';
  if(req.file) {
    const result = await cloudnary.uploader.upload(req.file.path)
    imageurl = result.secure_url
  }
};

const getproductsByid = async (req, res) => {
  try {
    const product = await produntmodel.findById(req.params.id)

    if (product) {
      res.json(product)
    }

    else {
      res.status(404).json({ message: "product not found " })
    }

  } catch (error) {
    res.status(500).json({ message: "server error" })
  }
};

const updateprodeuct = async (req, res) => {
};

const deleteproduct = async (req, res) => {
};

module.exports = {
  getproducts,
  createproduct,
  getproductsByid,
  updateprodeuct,
  deleteproduct
};
