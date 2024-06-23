//import express from "express";
//import { requireAuth } from "../middleware/requireAuth.js";
import * as deepl from 'deepl-node';


const translator = new deepl.Translator(process.env.DEEPL_API_KEY);

export const translateText=async (sourceLanguageText)=>{
       try {
        
        let newDocument = {
            text: sourceLanguageText,
        };
        console.log(sourceLanguageText);
       /*  let User = req.user;
        console.log("translate User is ", User);
        console.log(req.body);
        let sourceLanguage = User.nativeLanguage;
        let targetLanguage = User.foreignLanguage; */
        //TODO: convert sourceLanguage and targetLanguage to deepl language codes
        //https://developers.deepl.com/docs/resources/supported-languages#target-languages
        let result = await translator.translateText(newDocument.text, "EN", "DE"); 
        //res.send(result).status(200);
        return result.text
    }
    catch (err) {
        console.error(err);
        //res.status(500).send("Error translating " + err.message);
    }
}
