import express from "express";
import User from '../models/userModel.js';
import bcrypt from 'bcrypt'
import { generateToken } from "../util.js";
import Order from "../models/orderModel.js";
import { isAuth } from "../util.js";

const orderRouter = express.Router();

orderRouter.post('/', isAuth, async(req,res) => {
    try {
        const newOrder = new Order({
            orderItems: req.body.orderItems.map((x) => ({...x, product: x._id})),
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
        });

        const order = await newOrder.save();
        res.status(201).send({ message: 'New Order Created', order});
    } catch (error) {
        console.log(error);
    }
})

orderRouter.get('/:id', isAuth, async(req,res) => {
    try{
        console.log('here');
        const order =  await Order.findById(req.params.id);
        if (order) {
            res.send(order);
        } else {
            res.status(404).send({ message: 'Order Not Found'});
        }
    } catch (error) {
        console.log(error);
    }
})

orderRouter.put('/:id/pay', isAuth, async(req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order){
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            };
        
            const updatedOrder = await order.save();
            res.send({ message: 'Order Paid', order: updatedOrder })
        } else {
            res.status(404).send({ message: 'Order Not Found'});
        }
    } catch (error) {
        
    }

});

export default orderRouter;
