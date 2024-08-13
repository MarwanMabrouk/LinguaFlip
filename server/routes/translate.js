import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import * as deepl from "deepl-node";

import { sourceLanguages, targetLanguages } from "../routes/translateMap.js";

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
    console.log(req.body);
    let sourceLanguage = User.nativeLanguage;
    let targetLanguage = User.foreignLanguage;
    console.log("sourceLanguage is ", sourceLanguage);
    console.log("targetLanguage is ", targetLanguage);
    console.log(
      "Mapping is ",
      sourceLanguages[sourceLanguage],
      targetLanguages[targetLanguage],
    );
    //TODO: convert sourceLanguage and targetLanguage to deepl language codes
    //https://developers.deepl.com/docs/resources/supported-languages#target-languages
    let result = await translator.translateText(newDocument.text, null, "DE");
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error translating " + err.message);
  }
}
translateRoutes.post("/translate", translateText);
