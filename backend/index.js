const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { count } = require("console");

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  credentials: true // Allow credentials (if needed)
}));

// Database Connection with MongoDB
mongoose.connect("mongodb+srv://ks973111:ks80308030@cluster0.l7ct9.mongodb.net/e-commerce");

// API Creation

app.get("/", (req, res)=>{
  res.send("Express App is Running")
})

// Image Storage Engine

const storage = multer.diskStorage({
  destination: './uploads/images',
  filename: (req, file, cb)=>{
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({storage: storage})

// Creating Upload Endpoint for images
app.use('/images', express.static('uploads/images'))

app.post("/images", upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Image upload failed. No file was provided.",
    });
  }

  res.status(201).json({
    success: true,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
  });
});


// Schema for Creating Products
const Product = mongoose.model("Product", {
  name:{
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
})

// Helper function to validate and convert id
function validateAndConvertId(id, res) {
  // Validate the format of the id
  if (!ObjectId.isValid(id)) {
    res.status(400).json({
      success: false,
      message: "Invalid product ID format",
    });
    return null; // Return null if invalid
  }

  // Convert to ObjectId and return
  return ObjectId.createFromHexString(id);
}


//Create a new product
app.post('/products', async (req, res) => {
  try {
    const { name, image, category, new_price, old_price } = req.body;

    // Create and Save New Product (ID automatically handled by MongoDB)
    const product = new Product({
      name,
      image,
      category,
      new_price,
      old_price,
    });

    console.log(product);
    await product.save();
    console.log("Saved");

    // Return the Created Product with a 201 Created Status
    return res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete a product
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate and convert id
    const objectId = validateAndConvertId(id, res);
    if (!objectId) {
      console.log(`Invalid ID format provided: ${id}`);
      return; // Exiting here if objectId is null
    }

    const deletedProduct = await Product.findByIdAndDelete(objectId);

    if (!deletedProduct) {
      console.log(`Product not found with ID: ${id}`);
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    console.log(`Product with ID ${id} deleted successfully.`);
    // Return the deleted product
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      deletedProduct,
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the product. Please try again later.",
    });
  }
});


// List all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    console.log("All Products Fetched")

    // Return the products
    return res.status(200).json({
      success: true,
      count: products.length,
      products
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
});

// Read a product
app.get('/products/:id', async (req, res) => {
  try {
    const {id} = req.params;

    // Validate and convert id
    const objectId = validateAndConvertId(id, res);
    if (!objectId) return; // Exiting here if objectId is null

    const product = await Product.findById(objectId);

    // If product not found, return 404
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Return the found product
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Update a product
app.put('/products/:id', async (req, res) => {
  try {
    const {id} = req.params;

    // Validate and convert id
    const objectId = validateAndConvertId(id, res);
    if (!objectId) return; // Exiting here if objectId is null

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,            // Return the updated document
      runValidators: true,  // Validate updated fields
    });

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      updatedProduct,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


app.listen(port, (error)=>{
  if (!error) {
    console.log("Server Running on Port " + port)
  }
  else {
    console.log("Error: " + error)
  }
})
