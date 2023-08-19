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
const textToTranslate = 'Hello, world!';
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
data2.append('text', textToTranslate);


    
app.use(express.static(path.join(__dirname,'client/build')));

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'client/build/index.html'));
})

// Papago API 호출
app.get('/server/translate', function (req, res) {
  console.log('연동되었습니다')
  axios.post(apiUrl, data2, { headers: headers2 })
    .then(response => {
      const translatedText = response.data.message.result.translatedText;
      console.log(`Translated Text: ${translatedText}`);
      res.send(`Translated Text: ${translatedText}`);
    })
    .catch(error => {
      console.error('Error during translation:', error);
      res.status(500).send('Error during translation');
    });
});


//chat gpt key 
// const gptKeyValue = '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';

// // gpt 연결
// const OpenAI = require('openai');

// const openai = new OpenAI({
//   apiKey: gptKeyValue
// });

// openai.chat.completions.create({
//   model: "gpt-3.5-turbo",
//   messages: [
//     {
//       "role": "system",
//       "content": "당신은 도움이되는 조수입니다."
//     },
//     {
//       "role": "user",
//       "content": ""
//     }
//   ],
//   temperature: 1,
//   max_tokens: 256,
//   top_p: 1,
//   frequency_penalty: 0,
//   presence_penalty: 0,
// })
// .then(chatCompletion => {
//   console.log(chatCompletion.choices[0].message);
// })
// .catch(error => {
//   console.error(error);
// });



// axios로 chatgpt에 get 요청을 하여 데이터를  받아옴
app.get('/server/kogpt', function (req, res) {
  console.log('running api');
  try {
    axios.post(url, gptData, { headers })
      .then(response => {
        console.log('요청 성공!');
        console.log('Response:', response.data);

        res.send(response.data);
      })
      .catch(error => {
        console.error(`서버 axios 에러: ${error}`);
        res.status(500).send('서버 axios 에러');
      });
  } catch (error) {
    console.error(`서버 try문 에러: ${error}`);
    res.status(500).send('서버 try문 에러');
  }
});

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'client/build/index.html'));
})