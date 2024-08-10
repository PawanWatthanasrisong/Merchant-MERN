import express from "express";
import Product from "../models/productModel.js";

const productRouter = express.Router();

productRouter.get('/', async(req,res) => {
    const products = await Product.find();
    res.send(products);
})

productRouter.get(`/slug/:slug`, async (req,res) => {
    const product = await Product.findOne({slug: req.params.slug});
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found'});
    }
})

productRouter.get('/categories', async(req,res) => {
    try {
        const categories = await Product.find().distinct('category');
        console.log(categories);
        res.send(categories);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal Sever Error'});
    }
})

productRouter.get(`/:id`, async (req,res) => {
    try {
        const product =  await Product.findById(req.params.id);
        console.log(product);
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ message: 'Product Not Found'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal Sever Error'});
    }

});



export default productRouter;