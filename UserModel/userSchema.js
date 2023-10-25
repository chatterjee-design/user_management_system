const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "this filed is required"],
  },
  email: {
    type: String,
    required: [true, "this filed is required"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "this filed is required"],
    select: false,
  },
  bio: {
    type: String,
    required: [true, "this filed is required"],
  },
  username: {
    type: String,
    required: [true, "this filed is required"],
  },
});

// hashing passwords before saving them
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10)
  return next();
});

//create custome methods in mongoose
userSchema.methods = {
    jwtToken(){ //generate jwt token
        return JWT.sign(
            { id: this._id, email: this.email },//3 figures of jwt token id,mail,secret_key
            process.env.SECRET,
            { expiresIn: '24h' } // 24 hours
        )
    }
} 


const User = mongoose.model("USER", userSchema);
module.exports = User;
