const express = require('express');
const app = express();

const axios = require('axios');

app.use(express.json());
var cors = require('cors');
app.use(cors());

const path = require('path');

// MongoDB 연동
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb+srv://dnwn3027:suwon1234@stone.jf0hj90.mongodb.net/?retryWrites=true&w=majority',function(err,client){
  app.listen(8080,function(){
    console.log('listening on 8080');
  });
})


// 파파고 API 연동
const clientId = 'exJJisjHTM4Hro9BlAc8';
const clientSecret = 'EoC1NjPiy3';
// 번역할 텍스트와 언어 코드들
//const textToTranslate = 'Hello, world!';
const sourceLang = 'en';
const targetLang = 'ko';

// 번역 요청을 위한 URL
const apiUrl = 'https://openapi.naver.com/v1/papago/n2mt';

// HTTP 요청 헤더 설정
const headers2 = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'X-Naver-Client-Id': clientId,
  'X-Naver-Client-Secret': clientSecret,
};

// 번역 요청 데이터
const data2 = new URLSearchParams();
data2.append('source', sourceLang);
data2.append('target', targetLang);

    
app.use(express.static(path.join(__dirname,'client/build')));

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'client/build/index.html'));
})



// Papago API 호출
app.post('/server/translate', function (req, res) {
  console.log('연동되었습니다') 
  data2.append('text',req.body.textToTranslate ); //프론트에서 보낸 영어데이터
  axios.post(apiUrl, data2, { headers: headers2 })
    .then(response => {
      const translatedText = response.data.message.result.translatedText;
      console.log(`Translated Text: ${translatedText}`);
      res.send(`Translated Text: ${translatedText}`);
    })
    .catch(error => {
      console.error('파파고 에러', error);
      res.status(500).send('Error during translation');
    });
});

app.get('/server/translate/hi',function(req,res){
  res.send('hi');
})

const chatMessages = [{
  "role": "system",
  "content": "Write a story and suggest simple questions (a/b/c choice or yes/no) to continue the next story.Story is changed from the answer. Wait before I answer the question. If i answer the question, continue the story. Repeat this steps and lead to happy ending after 7 turns.\n\n[Main Story]\n\nTopic: find a hope to save the earth\n\nMain Character: poor little chiwawa dog in a town\n\n[Requirements]\n\nthis is for kids and english education for international students\n\neach story around 100 words length.\n\nonly use basic 300 vocaburary."
},
{
  "role": "user",
  "content": ""
},
];

//chat gpt key 
const gptKeyValue = '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';

// gpt 연결
const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: gptKeyValue
});

app.get('/server/gpt',function(req,res){
  openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: chatMessages, //데이터 가져오기(DB처리 필요)
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })
  .then(chatCompletion => {
    let result = chatCompletion.choices[0].message;
    //chatMessages에 데이터 추가 (DB처리 필요)
    chatMessages.push(result);
    console.log("server newChatMessage:"+JSON.stringify(result));
    res.send(chatMessages); //데이터 가져와서 보내기 (DB처리 필요)
  })
  .catch(error => {
    console.error(error);
  });
  
})

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'client/build/index.html'));

})

//Game.js에서 post 요청시 input 박스안에 있는 값(답변)을 chatMessages에 저장함
app.post('/server/gpt/send',function(req,res){
  const userAnswer = {
    "role": "user",
    "content":req.body.inputText, 
  };
  //chatMessages에 데이터 추가 (DB처리 필요)
  chatMessages.push(userAnswer);
  console.log('chatMessages=====================\n'+JSON.stringify(chatMessages)+"\n\n");
  res.sendStatus(200)
})