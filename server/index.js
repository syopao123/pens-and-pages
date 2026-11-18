const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");

require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGODB_STRING);
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'))

const corsOptions = {
	origin: ['http://localhost:8000', 'http://localhost:5173'],
	credentials: true, 
	optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.use(express.json());

app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/cart", cartRoutes);

if(require.main === module) {
	app.listen(process.env.PORT || 3000, () => {
	    console.log(`API is now online on port ${ process.env.PORT || 3000 }`)
	});
}

module.exports = { app, mongoose };
