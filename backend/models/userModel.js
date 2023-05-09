const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.login = async function (email, password) {
  if (!email || !password ) {
    throw Error('All fields must be filled.')
  }

  const user = await this.findOne({email})

  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw Error('Invalid password')
  }

  return user;

}


// Static Method, called when this is called
// if you plan to use this keyword, must use a normal function not an arrow function
userSchema.statics.signup = async function (email, password) {
  // Check to see if email and password is filled
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  // // Check to see if email is legit
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid.");
  }
  // // Check to see if password is strong enough
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  // Check to see if email is taken
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already taken");
  }
  // bcrypt hashes user's password
  // salt is a random string of character that is added to a users password

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  

  return user;
};
module.exports = mongoose.model("User", userSchema);
