import express from "express";
import Product from "../models/productModel.js";

const productRouter = express.Router();

productRouter.get('/', async(req,res) => {
    const products = await Product.find();
    res.send(products);
})

const PAGE_SIZE = 2;

productRouter.get('/search', async(req,res) => {
    try {
        const { query } = req;
        const pageSize = query.pageSize || PAGE_SIZE;
        const page = query.page || 1;
        const category = query.category || '';
        const brand = query.brand || '';
        const price = query.price || '';
        const rating = query.rating || '';
        const order = query.sort || '';
        const searchQuery = query.query || '';

        console.log(query);

        const queryFilter = 
        searchQuery && searchQuery !== 'all'
        ? {
            name: {
                $regex: searchQuery,
                $options: 'i',
            }
        }
        : {};
        const categoryFilter = category && category !== 'all' ? { category } : {};
        const ratingFilter = 
        rating && rating !== 'all'
        ? {
            rating: {
                $gte: Number(rating),
            },
        }
        : {};

        const priceFilter =
            price && price !== 'all'
            ? {
                price: {
                    $gte: Number(price.split('-')[0]),
                    $lte: Number(price.split('-')[1]),
                },
            }
            : {};

        console.log(order);
        const sortOrder =
            order === 'featured'
            ? { featured: -1 }
            : order === 'lowest'
            ? { price: 1}
            : order === 'highest'
            ? { price: -1}
            : order === 'toprated'
            ? { rating: -1}
            : order === 'newest'
            ? { createdAt: -1}
            : { _id: -1};
        
        console.log(sortOrder);

        const products = await Product.find({
            ...queryFilter,
            ...categoryFilter,
            ...priceFilter,
            ...ratingFilter,
        })
            .sort(sortOrder)
            .skip(pageSize * (page - 1))
            .limit(pageSize);


        const countProducts = await Product.countDocuments({
            ...queryFilter,
            ...categoryFilter,
            ...priceFilter,
            ...ratingFilter,
        });
        res.send({
            products,
            countProducts,
            page,
            pages: Math.ceil(countProducts/ pageSize),
        }
        );
    } catch (error) {
        
    }

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