const Cart = require("../models/Cart");
const { errorHandler } = require("../auth");

module.exports.getCart = (req, res) => {
    return Cart.findOne({userId: req.user.id })
    .then((cart) => res.status(200).send({ cart }))
    .catch(err => errorHandler(err, req, res));
}

module.exports.addToCart = (req, res) => {

    const { productId, quantity, subtotal, price } = req.body;

    const numericSubtotal = parseFloat(subtotal);
    if (isNaN(numericSubtotal) || numericSubtotal <= 0) {
        return res.status(400).json({ error: 'Invalid subtotal value' });
    }

    const numericQuantity = parseInt(quantity, 10);
    if (isNaN(numericQuantity) || numericQuantity <= 0) {
        return res.status(400).json({ error: 'Invalid quantity value' });
    }

    return Cart.findOne({ userId: req.user.id })
    .then((cart) => {
        
        if (!cart) {
            cart = new Cart({
                userId: req.user.id,
                cartItems: [],
                totalPrice: 0,
            });
        }

        const existingCartItemIndex = cart.cartItems.findIndex(
            (item) => item.productId === productId
        );

        if (existingCartItemIndex !== -1) {
            const existingItem = cart.cartItems[existingCartItemIndex];
            existingItem.quantity += numericQuantity;
            existingItem.subtotal = parseFloat(existingItem.subtotal) + numericSubtotal;
        } else {
            cart.cartItems.push({
                productId,
                quantity: numericQuantity,
                subtotal: numericSubtotal
            });
        }

        cart.totalPrice = parseFloat(cart.totalPrice) + numericSubtotal;

        return cart.save()
        .then((updatedCart) => {
            const responseCart = {
                userId: updatedCart.userId,
                cartItems: updatedCart.cartItems,
                totalPrice: updatedCart.totalPrice,
                _id: updatedCart._id,
                __v: updatedCart.__v,
            };

            res.status(201).send({
                message: 'Item added to cart successfully',
                cart: responseCart,
            });
        })
        .catch(err => errorHandler(err, req, res));
    })
    .catch(err => errorHandler(err, req, res));
};

module.exports.updateQuantity = (req, res) => {

    const { productId, newQuantity } = req.body;

    return Cart.findOne({ userId: req.user.id })
    .then((cart) => {
        if (!cart) {
            return res.status(404).send({ message: 'Cart not found' });
        }

        const itemIndex = cart.cartItems.findIndex(
            (item) => item.productId === productId
        );

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        const currentQuantity = cart.cartItems[itemIndex].quantity;
        const itemPrice = cart.cartItems[itemIndex].subtotal / currentQuantity;

        cart.cartItems[itemIndex].quantity = newQuantity;

        cart.cartItems[itemIndex].subtotal = itemPrice * newQuantity;
        cart.totalPrice = cart.cartItems.reduce(
            (total, item) => total + item.subtotal,
            0
        );

        return cart.save()
        .then(updatedCart => res.status(200).send({ 
            message: 'Item quantity updated successfully', 
            updatedCart: updatedCart 
        }))
        .catch(err => errorHandler(err, req, res));
    })
    .catch(err => errorHandler(err, req, res));
};

module.exports.removeFromCart = (req, res) => {

    const productId = req.params.productId;

    return Cart.findOne({userId: req.user.id })
    .then((cart) => {

        if (!cart) {
            return res.status(404).send({ message: 'Cart not found' });
        }

        const itemIndex = cart.cartItems.findIndex(
            (item) => item.productId === productId
        );

        if (itemIndex === -1) {
            return res.status(404).send({ message: 'Item not found in cart' });
        }

        const itemSubtotal = cart.cartItems[itemIndex].subtotal;

        cart.cartItems.splice(itemIndex, 1);

        cart.totalPrice -= itemSubtotal;
        return cart.save()
        .then(updatedCart => res.status(200).send({ 
            message: 'Item removed from cart successfully', 
            updatedCart: updatedCart 
        }))
        .catch(err => errorHandler(err, req, res));
    })
    .catch(err => errorHandler(err, req, res));
}

module.exports.clearCart = (req, res) => {
    
    const userId = req.user.id;

    Cart.findOne({ userId })
    .then((cart) => {
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.cartItems = [];
        cart.totalPrice = 0;

        return cart.save()
        .then(updatedCart => res.status(200).send({ 
            message: 'Cart cleared successfully', 
            cart: updatedCart 
        }))
        .catch(err => errorHandler(err, req, res));
    })
    .catch(err => errorHandler(err, req, res));
}