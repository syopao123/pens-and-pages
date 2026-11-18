const User = require("../models/User");
const bcrypt = require("bcryptjs");
const auth = require("../auth");

let salt = bcrypt.genSaltSync(10);

module.exports.registerUser = (req,res) => {
	if (!req.body.email.includes("@")) {
		return res.status(400).send({ error: "Email invalid" });
	} else if (req.body.mobileNo.length !== 11) {
		return res.status(400).send({ error: "Mobile number invalid" });
	} else if (req.body.password.length < 8) {
		return res.status(400).send({ error: "Password must be atleast 8 characters" });
	} else {
		let newUser = new User({
			firstName : req.body.firstName,
			lastName : req.body.lastName,
			email : req.body.email,
			mobileNo : req.body.mobileNo,
			password : bcrypt.hashSync(req.body.password, 10)
		})
		newUser.save()
		.then((user) => res.status(201).send({ message: "Registered Successfully" }))
		.catch(err => errorHandler(err, req, res));
	}
};

module.exports.loginUser = (req, res) => {
	if(req.body.email.includes("@")) {
		User.findOne({ email : req.body.email })
		.then(result => {
			if(result == null){
				return res.status(404).send({ error: "No Email Found" });
			} else {
				const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);
				
				if (isPasswordCorrect) {
					return res.status(200).send({ access : auth.createAccessToken(result)})
				} else {
					return res.status(401).send({ error: "Email and password do not match" });
				}
			}
		})
		.catch(err => errorHandler(err, req, res));
	} else {
		return res.status(400).send({ error: "Invalid Email" })
	}
};

module.exports.getProfile = (req, res) => {
	const userId = req.user.id;

	return User.findById(userId)
	.then(user => {
		if (!user) {
			return res.status(404).send({ error: 'User not found' });
		}

		user.password = undefined;
		return res.status(200).send({ user });
	})
	.catch(err => errorHandler(err, req, res));
};

module.exports.resetPassword = async (req, res) => {
	const userId = req.user.id;
	const { newPassword } = req.body;

	try {
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

		await User.findByIdAndUpdate(userId, { password: hashedPassword });

		res.status(200).send({ message: 'Password reset successfully' });
	} catch (err) {
		errorHandler(err, req, res);
	}
};

module.exports.setAsAdmin = (req,res) => {
	return User.findById(req.params.id)
	.then(result => {
		if(result === null){
			return res.status(404).send({ error: "User not Found"});
		} else {
			result.isAdmin = true;
			return result.save()
			.then((updatedUser) => res.status(200).send({updatedUser}))
			.catch(err => errorHandler(err, req, res));
		}
	})
	.catch(err => errorHandler(err, req, res));
}