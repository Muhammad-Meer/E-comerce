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
  try {
    const { name, descriptioin, price, categary, stock } = req.body;
    let imageurl = '';

    if (req.file) {
      const result = await cloudnary.uploader.upload(req.file.path);
      imageurl = result.secure_url;
    }

    const newProduct = new produntmodel({
      name,
      descriptioin,
      price,
      categary,
      stock,
      image: imageurl
    });


    const savedprodect = await produntmodel.sve();
    res.status(201).json(savedprodect )

    await newProduct.save();
    res.status(201).json({ message: "Product created successfully", product: newProduct });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

const getproductsByid = async (req, res) => {
  try {
    const product = await produntmodel.findById(req.params.id)

    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: "product not found " })
    }

  } catch (error) {
    res.status(500).json({ message: "server error" })
  }
};

const updateprodeuct = async (req, res) => {
  try {
    const { name, descriptioin, price, categary, stock } = req.body;
    let imageurl = '';

    if (req.file) {
      const result = await cloudnary.uploader.upload(req.file.path);
      imageurl = result.secure_url;
    }

    const updateData = {
      name,
      descriptioin,
      price,
      categary,
      stock
    };

    if (imageurl) {
      updateData.image = imageurl;
    }

    const updatedProduct = await produntmodel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (updatedProduct) {
      res.json({ message: "Product updated successfully", product: updatedProduct });
    } else {
      res.status(404).json({ message: "product not found" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

const deleteproduct = async (req, res) => {
  try {
    const deletedProduct = await produntmodel.findByIdAndDelete(req.params.id);

    if (deletedProduct) {
      res.json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "product not found" });
    }

  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

module.exports = {
  getproducts,
  createproduct,
  getproductsByid,
  updateprodeuct,
  deleteproduct
};