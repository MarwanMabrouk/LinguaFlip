

import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import * as deepl from 'deepl-node';


export const translateRoutes = express.Router();
translateRoutes.use(requireAuth); // require auth 


const translator = new deepl.Translator(process.env.DEEPL_API_KEY);

async function translateText(req, res) {
    try {
        let newDocument = {
            text: req.body.text,
        };
        
        let User = req.user;
        console.log("translate User is ", User);
        let sourceLanguage = User.nativeLanguage;
        let targetLanguage = User.foreignLanguage;
        //TODO: convert sourceLanguage and targetLanguage to deepl language codes
        //https://developers.deepl.com/docs/resources/supported-languages#target-languages
        let result = await translator.translateText(newDocument.text, "EN", "DE"); 
        res.send(result).status(200);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error translating " + err.message);
    }
}
translateRoutes.post('/translate', translateText);