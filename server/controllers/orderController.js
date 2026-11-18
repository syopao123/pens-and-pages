const Order = require("../models/Order");
const Cart = require("../models/Cart");
const { errorHandler } = require("../auth");

module.exports.checkout = (req, res) => {
	Cart.findOne({userId: req.user.id})
	.then(cart => {

		if (!cart) {
            return res.status(404).send({ error: "No Items to Checkout" })
        }

		if (cart.cartItems.length < 1) {
            return res.status(404).send({ error: "No Items to Checkout" })
        }

		let newOrder = new Order({
			userId: req.user.id,
			productsOrdered: cart.cartItems,
			totalPrice: cart.totalPrice
		})

		Cart.findByIdAndDelete(cart._id.toString()).then(cart => {
			newOrder.save()
			.then((user) => res.status(201).send({message: "Ordered Successfully"}))
			.catch(err => errorHandler(err, req, res));
		})
   
	})
	.catch(err => errorHandler(err, req, res));
}

module.exports.getMyOrders = (req,res) => {
	return Order.find({userId: req.user.id})
	.then(orders => {
		if(orders.length > 0){
			return res.status(200).send({orders})
		} else {
			return res.status(404).send({ error:"No Orders Found" })
		}
	})
	.catch(err => errorHandler(err, req, res));
}

module.exports.getAllOrders = (req,res) => {
	return Order.find()
	.then(orders => res.status(200).send({orders}))
	.catch(err => errorHandler(err, req, res));
}