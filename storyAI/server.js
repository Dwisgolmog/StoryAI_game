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

const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb+srv://dnwn3027:suwon1234@stone.jf0hj90.mongodb.net/?retryWrites=true&w=majority',function(err,client){
  app.listen(8080,function(){
    console.log('listening on 8080');
});
})
    
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

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'client/build/index.html'));
})