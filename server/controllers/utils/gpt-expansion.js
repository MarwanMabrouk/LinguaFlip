import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

const chatModel = new ChatOpenAI({ model: "gpt-3.5-turbo" });

const promptTemplate = new PromptTemplate({
  template: `Given the following list of cards that translate phrases from a given source language to a given
               target language:
               {cards}
                Generate 5 new cards as json objects of the same structure. The new cards should have
                a similar theme to the provided cards and a similar linguistic level, however they should be different
                words . 
                Remember return your response as a javascript list of 5 cards of similar json format as the input
                and use the same target and source languages. The json objects should have the following structure:
               {{
                    "title": "string",
                    "sourceLanguage": "string",
                    "targetLanguage": "string"
                    }}
                    `,
  inputVariables: ["cards"],
});

const chain = promptTemplate.pipe(chatModel);

// Function to clean the JSON string
function cleanJsonString(jsonString) {
  // Remove newlines and extra spaces between JSON elements
  return jsonString
    .replace(/(\r\n|\n|\r)/gm, "") // Remove newlines
    .replace(/\s\s+/g, " ") // Replace multiple spaces with a single space
    .trim(); // Remove leading/trailing spaces
}

export async function getOpenAIResponse(cards) {
  try {
    console.log("get open ai response");
    const response = await chain.invoke({ cards });
    const cleanedJsonString = cleanJsonString(response.text);
    return JSON.parse(cleanedJsonString);
  } catch (error) {
    console.error("Error communicating with OpenAI API:", error);
    throw error;
  }
}
