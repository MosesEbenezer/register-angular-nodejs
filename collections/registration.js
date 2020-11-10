const router = require('express').Router();
// const jwt = require('jsonwebtoken');
// const { check, body, validationResult } = require('express-validator');
// const validator = require('validator');

const UserModel = require('../models/userModel');

exports.register = async (req, res, next) => {
	try {
		let user = new UserModel();

		user.first_name = req.body.first_name;
		user.last_name = req.body.last_name;
		user.user_name = req.body.user_name;
		user.email = req.body.email;
		user.phone = req.body.phone;
		user.password = req.body.password;
		user.street = req.body.street;
		user.town = req.body.town;
		user.state = req.body.state;
		user.lga = req.body.lga;
		user.country = req.body.country;

		const existinguser = await UserModel.findOne({
			email: req.body.email,
		}).exec();

		if (existinguser) {
			return res.status(409).json({
				message: 'This user has already been registered',
			});
		}

		await user.save();

		return res.status(200).json({
			measage: 'User successfully saved',
		});
	} catch (e) {
		return res.status(500).json({
			message: 'An error occured ' + e,
		});
	}
};

exports.findUser = async (req, res, next) => {
	try {
		const email = req.params.email;

		const user = await UserModel.findOne({
			email: email,
		});

		if (user) {
			return res.status(200).json({
				message: 'User found',
				data: {
					user,
				},
			});
		} else {
			return res.status(404).json({
				message: 'No user with this email found',
			});
		}
	} catch (e) {
		return res.status(500).json({
			message: 'An error occured ' + e,
		});
	}
};

exports.updateUser = async (req, res, next) => {

	try {

  const userID = req.params.userID

  const user = await UserModel.findOne({
    _id: userID
  }).exec()

  if(!user) {
    return res.status(404).json({
      message: 'No user with this id found',
    });
  }

		if (req.body.first_name) user.first_name = req.body.first_name;
		if (req.body.last_name)	user.last_name = req.body.last_name;
		if (req.body.email) user.email = req.body.email;
		if (req.body.phone)	user.phone = req.body.phone;
		if (req.body.password) user.password = req.body.password;
		if (req.body.street) user.street = req.body.street;
		if (req.body.town) user.town = req.body.town;
		if (req.body.state) user.state = req.body.state;
		if (req.body.lga) user.lga = req.body.lga;
		if (req.body.country) user.country = req.body.country;

		await user.save();
		res.json({
			success: true,
			message: 'user details successfully updated',
		});
	} catch (e) {
		return res.status(500).json({
			message: 'An error occured ' + e,
		});
	}
};

exports.deleteUser = async (req, res, next) => {
	try {
		const userID = req.params.userID;

		const deletedUser = await UserModel.findByIdAndDelete({
			_id: userID,
		});

		if (deletedUser) {
			return res.status(200).json({
				message: 'User successfully deleted',
			});
		}
	} catch (e) {
		return res.status(500).json({
			message: 'An error occured ' + e,
		});
	}
};

exports.getAllRegisteredUsers = async (req, res, next) => {
	try {
		const users = await UserModel.find().exec();

		let usersArray = [];

		users.forEach((user) => {
			usersArray.push(user);
		});

		return res.status(200).json({
			data: {
				usersArray,
			},
		});
	} catch (e) {
		return res.status(500).json({
			message: 'An error occured ' + e,
		});
	}
};
