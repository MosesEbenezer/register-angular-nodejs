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
      success: true,
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
			return res.status(200).send(user);
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

  const userUpdateRequest = Object.keys(req.body)
  const allowedFields = [
  'first_name',
  'last_name',
  'user_name',
  'email',
  'phone',
  'street',
  'town',
  'state',
  'lga',
  'country'
  ]

  const isValidOperation = userUpdateRequest.every((requiredField) =>
    allowedFields.includes(requiredField),
  )

  if (isValidOperation) {
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
		).exec();

		if (!user) {
			return res.status(404).json({
				message: 'No user with this id found',
			});
		}

		await user.save();
		return res.json({
			success: true,
      message: 'user details successfully updated',
      user
		});
  }

	} catch (e) {
		return res.status(500).json({
			message: 'An error occured ' + e,
		});
	}
};

exports.deleteUser = async (req, res, next) => {
	try {
		const userID = req.params.id;

		const deletedUser = await UserModel.findByIdAndDelete({
			_id: userID,
		});

		if (deletedUser) {
			return res.status(200).json({
        success: true,
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
		let users = await UserModel.find().exec();

		let usersArray = [];

		users.forEach((users) => {
			usersArray.push(users);
    });
    
		return res.status(200).send(users);
	} catch (e) {
		return res.status(500).json({
			message: 'An error occured ' + e,
		});
	}
};
