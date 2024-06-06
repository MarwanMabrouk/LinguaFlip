const mongoose = require ('moongoose');
const bcrypt=require('bcrypt');

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

