const mongoose = require("mongoose");

const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const methodOverride = require("method-override");

const Product = require("./models/products");

mongoose
    .connect("mongodb://localhost:27017/productFarm", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("MongoDB Error");
        console.log(err);
    });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); //to make post work
app.use(methodOverride("_method"));

app.get("/products", async (req, res) => {
    const products = await Product.find({});
    res.render("products/index", { products });
});

app.get("/products/new", (req, res) => {
    res.render("products/new");
});
app.post("/products", async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
});

app.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render("products/show", { product });
});

app.get("/products/:id/edit", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render("products/edit", { product });
});

app.put("/products/:id", async (req, res) => {
    const { id } = req.params;
    const newProduct = await Product.findByIdAndUpdate(id, req.body, {
        runValidators: true,
        new: true,
    });
    res.redirect(`/products/${newProduct.id}`);
});

app.delete("/products/:id", async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect("/products");
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
