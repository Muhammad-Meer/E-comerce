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
    const { name, price, stock } = req.body;
    const description = req.body.description || req.body.descriptioin;
    const category = req.body.category || req.body.categary;
    let imageurl = '';

    if (req.file) {
      const result = await cloudnary.uploader.upload(req.file.path);
      imageurl = result.secure_url;
    }

    const newProduct = new produntmodel({
      name,
      description,
      price,
      category,
      stock,
      imageUrl: imageurl
    });

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
    console.log(req.params.id)

    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: "product not found " })
    }

  } catch (error) {
    res.status(500).json({ message: "server error" })
  }
};

const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;

        // Pehle product ko find karo
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Fields update karo (agar naya value aaya ho tabhi update ho)
        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = price;
        if (category) product.category = category;
        if (stock) product.stock = stock;

        // Agar nai image aayi hai to upload karo
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            product.image = result.secure_url;   
        }

        // Database mein save karo
        await product.save();

        res.json({
            message: "Product updated successfully",
            product: product
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
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
  updateProduct,
  deleteproduct
};
