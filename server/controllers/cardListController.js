import mongoose from 'mongoose';
import {userSchema} from '../models/userModel.js';
import { cardListSchema } from '../models/cardListModel.js';
import { cardSchema } from '../models/cardModel.js';

const User = mongoose.model('User', userSchema);
const CardList = mongoose.model('cardList', cardListSchema);
const Card=mongoose.model('card',cardSchema);



export const fetchUserCardLists= async (req,res)=>{
    console.log(req.user)
    try{
        console.log(fetchUserCardLists);
        const user_id =req.user;
        console.log(user_id);
        const user= await User.findOne({"_id":user_id}).
                         populate('cardLists').
                         exec(); 
        console.log(user.cardLists);
        res.status(200).json(user.cardLists);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

export const fetchCards= async (req,res)=>{
    try{
        console.log(req.params.id);
        const cardList_id =req.params.id;
        const result= await CardList.findOne({"_id":cardList_id}).
                         populate('cards').
                         exec(); 
        console.log(result.cards);
        res.status(200).json(result.cards);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

export const postCard= async(req,res)=>{
    try{
        const newCard=req.body
        const cardList_id=req.params.id;
    
        const card=new Card(newCard);
        await card.save();
        const cardList=await CardList.findOne({"_id":cardList_id}).
                              exec();
    
        cardList.cards=[card._id,...cardList.cards];
        await cardList.save();

        res.status(200).json({'message': 'card added succesfuly'});
    }       
    catch(error){
        res.status(400).json({error: error.message});
    }
}

export const postCardList= async(req,res)=>{
    try{
        const newCardList=req.body
        const user_id=req.user;
    
        const cardList=new CardList(newCardList);
        await cardList.save();
        const user=await User.findOne({"_id":user_id}).
                              exec();
    
        user.cardLists=[cardList._id,...user.cardLists];
        await user.save();
        
        res.status(200).json({'message': 'card added succesfuly'});
    }       
    catch(error){
        res.status(400).json({error: error.message});
    }
}
