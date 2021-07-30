const mongoose = require("mongoose");

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

const seedProducts = [
    {
        name: "Fairy Eggplant",
        price: 1.0,
        category: "vegatable",
    },
    {
        name: "Organic Goddess Melon",
        price: 4.99,
        category: "fruit",
    },
    {
        name: "Apple",
        price: 9.99,
        category: "fruit",
    },
];

Product.insertMany(seedProducts)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
