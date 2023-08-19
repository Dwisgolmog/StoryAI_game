const express = require('express');
const app = express();

const axios = require('axios');

app.use(express.json());
var cors = require('cors');
app.use(cors());

const path = require('path');

// kogpt 요청을 위한 url 및 헤더
const key = '02ddd9213ee08df61abfeca6fc7e6767';
const url = "https://api.kakaobrain.com/v1/inference/kogpt/generation";
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `KakaoAK ${key}`
};

// 데이터 더미
const data = {
    prompt: "오늘 아침 하늘은 곧 비가 올 것 같아서",
    max_tokens: 150,
    temperature: 1.0,
    top_p: 0.7,
    n: 1
    
  };

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

// axios로 kogpt에 get 요청을 하여 데이터를  받아옴
app.get('/server/kogpt', function (req, res) {
    console.log('running api');
    try {
      axios.post(url, data, { headers })
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

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'client/build/index.html'));
})