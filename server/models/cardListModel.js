import mongoose from "mongoose";


export const cardListSchema=new mongoose.Schema(
    {
        topic:
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
        },
        cards:{type: [mongoose.Schema.Types.ObjectId], ref:'card',required: false}
    },
    {'collection':'cardLists'}
)

export const cardList = mongoose.model('cardList', cardListSchema);

