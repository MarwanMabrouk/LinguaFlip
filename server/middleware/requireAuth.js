import jwt from 'jsonwebtoken';
import {userSchema} from '../models/userModel.js';
import mongoose from 'mongoose';

const User = mongoose.model('User', userSchema);
export const requireAuth= async (req, res, next) =>{
    // verify that the user is authenticated
    const {authorization }= req.headers;
    if(!authorization){
        return res.status(401).json({error:'Authorization token required'});
    }

    const token = authorization;
    // verify token 

    try{
        const {_id} = jwt.verify(token, process.env.SECRET);

        req.user = await User.findOne({_id}).select('_id');
        next();
    }catch (error){
        console.log(error);
        res.status(401).json({error: 'Request is not authorized'+error});
    }
}

// Import it later in routes/record
// const requireAuth = require ('../middleware/requireAuth.js')

// after the declaration of the router = express.Router() we have to put ->
// router.use(requireAuth);

// to protect everything that there is below

