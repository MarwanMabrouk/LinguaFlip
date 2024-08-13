//import express from "express";
//import { requireAuth } from "../middleware/requireAuth.js";
import * as deepl from 'deepl-node';
import {sourceLanguages, targetLanguages} from './translateMap.js';

const translator = new deepl.Translator(process.env.DEEPL_API_KEY);

export const translateText=async (sourceLanguageText,nativeLanguage,foreignLanguage)=>{
       try {
        
        let newDocument = {
            text: sourceLanguageText,
            nativeLanguage: nativeLanguage,
            foreignLanguage: foreignLanguage
        };
        console.log(sourceLanguageText);
        //get user
        let sourceLanguage = newDocument.nativeLanguage;
        let targetLanguage = newDocument.foreignLanguage;

        let result = await translator.translateText(newDocument.text, "EN", targetLanguages[targetLanguage]); 
        //res.send(result).status(200);
        return result.text
    }
    catch (err) {
        console.error(err);
        //res.status(500).send("Error translating " + err.message);
    }
}
