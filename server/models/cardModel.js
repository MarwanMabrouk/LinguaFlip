import mongoose from "mongoose";


export const cardSchema=new mongoose.Schema(
    {
        title:
        {
            type: String,
            required: true
        },
        sourceLanguage:
        {
            type: String,
            required: true
        },
        targetLanguage:
        {
            type: String,
            required: true
        }
    },
    
    {'collection':'cards'}
)

export const card = mongoose.model('card', cardSchema);