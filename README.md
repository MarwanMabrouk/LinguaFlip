# LinguaFlip 🗺️🈯🔤

LinguaFlip helps you elevate your language learning with interactive flashcards, AI-driven word recommendations.

<p align="center">
  <img src="assets\LinguaFlip.png" alt="Logo" width="200" height="200">

<p align="center">  
  <a href="https://linguaflip.app/">
   Deployed Website - https://linguaflip.app/
  </a>

## Description

LinguaFlip is a web application whose main purpose is improving vocabulary skills when leraning a new language by creating list of words related to a topic.

When registering in the application, users must select the language that they are aimed to learn as well as their native language. Then, the purpose is creating list of vocalulary related to a specific topic, so as to learn new words also in a context and words which are correlated. To check if users have actually learnt the words, the play feature is developed as a short quiz in which the user will go over all the words of a selected topic and will write the translation of each word in a restricted time.

Also, an AI extension is implemented in order to allow users to expand their list. Therefore, ChatGPT AI will expand your list to get new vocabulary related to the topic.

## Features

The main features that are developed are the following:

- Selection of languages between the 30 languages that are supported
  <p align="center">
    <img src="assets\signup.png" >
- Creation of vocabulary lists based on topic
   <p align="center">
    <img src="assets\cardLists.png" >
  <p align="center">
    <img src="assets\addCardList.png" width="384" height="201">
- Creation of flashcards
  <p align="center">
    <img src="assets\carListTopic.png" width="750" height="400">
- Translation feature with DeepL API
- Expand card lists by using ChatGPT API

## Tech Stack

For developing the application the MERN Stack has been used:

**Frontend :** React, MaterialUI \
**Backend :** ExpressJS \
**Database :** MongoDB\
**Deployment :** DigitalOcean

## Usage

Clone the project

```bash
  git clone https://github.com/MarwanMabrouk/LinguaFlip.git
  cd LinguaFlip
```

Install dependencies

```bash
  npm install
```

Start both backend & frontend

```bash
  npm run start
```

## Environment Variables

### Use provided Secret Keys
1. You need to copy the config.env file to inside of server directory 
2. You need to copy the .env file to inside of client directory

### Create your own Secret Keys

inside the server directory create a file called config.env and add the following:

```bash
  PORT=5050
  ATLAS_URI=your_mongo_uri
  SECRET=your_jwt_secret
  DEEPL_API_KEY=your_deepl_api_key
  DEEPL_ENDPOINT=your_deepl_endpoint
  OPENAI_API_KEY=your_openai_api_key
```

inside the client directory create a file called .env and add the following:

```bash
  VITE_API_URL=http://localhost:5050
```
## Authors



 <p align="center">
  WebTech Wizards Team
 <p align="center"> 
  <img src="assets\Team_logo.jpg" alt="Logo" width="200" height="200"> 

- [@smarrod02](https://github.com/smarrod02)
- [@mohabdelmagied](https://github.com/mohabdelmagied)
- [@MarwanMabrouk](https://github.com/MarwanMabrouk)
