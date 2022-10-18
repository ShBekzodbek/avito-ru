/** @format */

const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 250,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 12,
  },
  role: {
    type: String,
    enum: ["admin", "moderator", "user"],
    default: "user",
  },
});

userSchema.methods.toJSON = function(){
  let obj = this.toObject();
  delete obj._v;
  delete obj.id;
  return obj;
}

const User = model('User',userSchema);
module.exports = User;
