const produntmodel = require('../models/produnt.model')
const cloudnary = require('../config/cloudnary')

const getproducts = async (req, res) => {
  try {
    
  } catch (error) {
    const products = await produntmodel.find({});
    res.json(products)
    
  }
};

const createproduct = async (req, res) => {
};

const getproductsByid = async (req, res) => {
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
