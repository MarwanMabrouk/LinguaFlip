import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import { cardListSchema, cardList } from "./cardListModel.js";

// i have install the validator package npm install validator

const Schema = mongoose.Schema;

export const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  nativeLanguage: {
    type: String,
    required: true,
  },
  foreignLanguage: {
    type: String,
    required: true,
  },
  apiCount: {
    type: Number,
    required: false,
  },
  cardLists: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "cardList",
    required: false,
  },
});

// static signup method
userSchema.statics.signup = async function (
  email,
  password,
  nativeLanguage,
  foreignLanguage,
) {
  // validation
  // first meake sure that we have a value in email and password

  if (!email || !password || !nativeLanguage || !foreignLanguage) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  // if(!validator.isStrongPassword(password)){
  //     throw Error('Password is not strong enough');
  // }

  // check if they user already exists in the db

  const exists = await this.findOne({ email });

  if (exists) {
    // we will throw an error that will be caught when this function is called
    throw Error("Email already in use");
  }

  // hash the password. I have installed the package bcrypt. npm install bcrypt

  // generate the salt
  // 10 how long it is

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // store the email and password in the db

  const user = await this.create({
    email,
    password: hash,
    nativeLanguage,
    foreignLanguage,
  });
  return user;
};

// static login method

userSchema.statics.login = async function (email, password) {
  // validation
  // first meake sure that we have a value in email and password

  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  // find the user in the db with the email

  const user = await this.findOne({ email });

  if (!user) {
    // we will throw an error that will be caught when this function is called
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};

// module.exports = mongoose.model('User', userSchema);

/* 
Using JSON Web Tokens is one way to manage authentication between frontend and backend of a web app
It involves making a special token called json web token on the server when a user sends a successful
signup or login request to the server.
So the server handles that requests and if it's okay with the credentials then it will create a json web 
token for that user and it will then send that token back to the client
The presence of that token on the browser would signify to the frontend application that we are currently
logged in or authenticated.

A toke is composed of:
- Header: contains the algorith used for the JWT
- Payload: contains non-sensitive user data (e.g.:user id)
- Signature: used to verify the token by the server
*/
