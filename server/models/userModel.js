const mongoose = require ('moongoose');
const bcrypt=require('bcrypt');
const validator = require('validator');
// i have install the validator package npm install validator

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    surname:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        uniques:true
    },
    password:{
        type:String,
        required:true
    }
});

// static signup method
userSchema.statics.signup = async function(email, password) {

    // validation
    // first meake sure that we have a value in email and password

    if(!email || !password){
        throw Error('All fields must be filled');
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid');
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough');
    }

    // check if they user already exists in the db

    const exists = await this.findOne({email});

    if(exists){ // we will throw an error that will be caught when this function is called
        throw Error('Email already in use');
    }

    // hash the password. I have installed the package bcrypt. npm install bcrypt

    // generate the salt
    // 10 how long it is

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // store the email and password in the db

    const user = await this.create({email, password: hash});
    return user;


}

module.exports = mongoose.model('User', userSchema);

