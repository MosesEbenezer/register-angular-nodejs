const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
  first_name: {type: String},
  last_name: {type: String},
  user_name: {type: String},
  email: {type: String},
  phone: {type: String},
  password: {type: String},
  street: {type: String},
  town: {type: String},
  state: {type: String},
  lga: {type: String},
  country: {type: String},

})


UserSchema.pre('save', function(next) {
    let user = this;

    if(!user.isModified('password')) return next();

    bcrypt.hash(user.password, null, null, function(err, hash) {
        if(err) return next(err);

        user.password = hash;
        next();
    })
})

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("userModel", UserSchema);