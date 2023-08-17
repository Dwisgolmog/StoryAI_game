const express = require('express');
const app = express();
const axios = require('axios');

const router = express.Router();
//const request = require('request');

const path = require('path');

const key = '02ddd9213ee08df61abfeca6fc7e6767';
const url = "https://api.kakaobrain.com/v1/inference/kogpt/generation";
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `KakaoAK ${key}`
};

const data = {
    prompt: "오늘 아침 하늘은 곧 비가 올 것 같아서",
    max_tokens: 120,
    n: 2
  };

app.listen(8080,function(){
    console.log('listening on 8080');
});
    
app.use(express.static(path.join(__dirname,'client/build')));

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'client/build/index.html'));
})

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'client/build/index.html'));
})

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