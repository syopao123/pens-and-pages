const Product = require("../models/Product");
const { errorHandler } = require("../auth");

module.exports.getAll = (req,res) => {
	return Product.find()
	.then(products => res.status(200).send(products))
	.catch(err => errorHandler(err, req, res));
}

module.exports.getAllActive = (req,res) => {
	return Product.find({isActive : true})
	.then(products => res.status(200).send(products))
	.catch(err => errorHandler(err, req, res));
}

module.exports.addProduct = (req,res) => {
	let newProduct = new Product({
		name: req.body.name,
		description: req.body.description,
		price: req.body.price
	});

	return newProduct.save()
	.then((product) => res.status(201).send(product))
	.catch(err => errorHandler(err, req, res));
}

module.exports.getProduct = (req,res) => {
	return Product.findById(req.params.productId)
	.then(product  => res.status(200).send(product))
	.catch(err => errorHandler(err, req, res)); 
}

module.exports.updateProduct = (req, res) => {
	let updatedProduct = {
		name: req.body.name,
		description: req.body.description,
		price: req.body.price
	}

	return Product.findByIdAndUpdate(req.params.productId, updatedProduct)
	.then((product) => {
		if(product){
			res.status(200).send({ 
				success: true,
				message: 'Product updated successfully',
			})
		} else {
			res.status(404).send({ error: "Product not found" })
		}
	}
	)
	.catch(err => errorHandler(err, req, res));
}

module.exports.archiveProduct = (req, res) => {
	let updateActiveField = {
		isActive : false
	}

	return Product.findByIdAndUpdate(req.params.productId, updateActiveField)
	.then((archivedProduct) => {

		if(archivedProduct){
			if(!archivedProduct.isActive) {
				return res.status(200).send({
					message: 'Product already archived',
					archivedProduct: archivedProduct
				})
			}
	
			return res.status(200).send({
				success: true,
				message: 'Product archived successfully'
			})
		} else{
			return res.status(404).send({
				error: 'Product not found'
			})
		}
	})
	.catch(err => errorHandler(err, req, res));
}

module.exports.activateProduct = (req, res) => {
	let updateActiveField = {
		isActive : true
	}

	return Product.findByIdAndUpdate(req.params.productId, updateActiveField)
	.then((activateProduct) => {

		if(activateProduct) {
			if(activateProduct.isActive) {
				return res.status(200).send({
					message: 'Product already active',
					activateProduct: activateProduct
				})
			}
				return res.status(200).send({
					success: true,
					message: 'Product activated successfully'
				})
			
		}
		else {
			return res.status(404).send({
				error: 'Product not found'
			})
		}
	})
	.catch(err => errorHandler(err, req, res));
}

module.exports.searchByProductName = (req,res) => {
	return Product.find({name: req.body.name})
	.then((product)  => res.status(200).send(product))
	.catch(err => errorHandler(err, req, res));
}

module.exports.searchByProductPrice = (req,res) => {
	return Product.find({
		price: {
		  	$gte: req.body.minPrice, 
		  	$lte: req.body.maxPrice,
		}
	})
	.then((products)  => res.status(200).send(products))
	.catch(err => errorHandler(err, req, res));
}