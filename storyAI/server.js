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
// const clientId = 'exJJisjHTM4Hro9BlAc8';
// const clientSecret = 'EoC1NjPiy3';
// // 번역할 텍스트와 언어 코드들
// //const textToTranslate = 'Hello, world!';
// const sourceLang = 'en';
// const targetLang = 'ko';

// 번역 요청을 위한 URL
//const apiUrl = 'https://openapi.naver.com/v1/papago/n2mt';

// HTTP 요청 헤더 설정
// const headers2 = {
//   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
//   'X-Naver-Client-Id': clientId,
//   'X-Naver-Client-Secret': clientSecret,
// };

// 번역 요청 데이터
// const data2 = new URLSearchParams();
// data2.append('source', sourceLang);
// data2.append('target', targetLang);

    
app.use(express.static(path.join(__dirname,'client/build')));

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'client/build/index.html'));
})

// // Papago API 호출
// app.post('/server/translate', function (req, res) {
//   console.log('연동되었습니다') 
//   data2.append('text',req.body.textToTranslate ); //프론트에서 보낸 영어데이터
//   axios.post(apiUrl, data2, { headers: headers2 })
//     .then(response => {
//       const translatedText = response.data.message.result.translatedText;
//       console.log(`Translated Text: ${translatedText}`);
//       res.send(`Translated Text: ${translatedText}`);
//     })
//     .catch(error => {
//       console.error('파파고 에러', error);
//       res.status(500).send('Error during translation');
//     });
// });

// app.get('/server/translate/hi',function(req,res){
//   res.send('hi');
// })

const chatMessages = [
  {
    "role": "system",
    "content": "Main story\n플레이어는 도시 중앙에 위치한 10층 건물에 있습니다. 도시는 좀비 대재앙의 한가운데에 있습니다. 도시는 좀비로 가득 차고, 플레이어가 위치한 건물도 좀비로 가득 차 있습니다. 플레이어는 어젯밤에 술을 많이 마셔서 좀비 아포칼립스가 일어나는 것을 눈치채지 못했습니다. 플레이어는 다음날 사무실에서 일어났습니다. 그때부터 이야기가 시작됩니다.\n플레이어의 주요 목표는 건물을 탈출하고 도시를 탈출한 다음 도시 밖의 생존자 캠프를 찾는 것입니다. 좀비는 항상 플레이어와 플레이어의 동료를 공격하고 잡아먹는 행동을 합니다.\n\nRequirements\n-한글로 응답하시오.\n\n-메인 스토리를 기반으로 새로운 이야기를 쓴 다음 'user'가 선택할 수 있는 5개의 행동을 제시하고 'user'의 답변을 기다리시오.\n\n-메인 스토리와 플레이어가 선택한 행동을 기반으로 이어지는 새로운 이야기를 쓰시오.\n\n-'user'가 5개의 선택지 중에서 선택을 하지 않았다면 새로운 이야기를 쓰지 마십시오.\n\n-'user'가 5개의 선택지 중에 하나를 선택하게 되면 이어지는 새로운 이야기를 쓰십시오.\n\n-'user'가 선택을 한 후 생성되는 새로운 이야기는 최대 70단어 에서 최소 50 단어로 생성하십시오. 단 답변이 완성되지 않았을경우 반드시 문장을 완성하십시오.\n\n-'user'가 3번의 답변을 할때마다 좀비들이 플레이어와 플레이어의 동료들을 공격하는 새로운 이야기를 쓰십시오.\n\n-'user'가 스토리 진행중 도시를 탈출하고 생존자 캠프를 발견하면 좋은 결말로 이야기를 끝내고 'user'에게 알리시오.\n\n-'user'가 스토리 진행중 좀비한테 물리거나 죽게 된다면 좋지 않은 결말로 이야기를 끝내고 'user'에게 알리시오.\n\n-'user'의 답변의 수가 5번이하일경우 이야기를 끝내지 않도록 하십시오.\n\nBe sure to comply with all requirements"
  },
  {
    "role": "user",
    "content": ""
  },
]

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
    messages: chatMessages,
    temperature: 0.9,
    max_tokens: 330,
    top_p: 0.9,
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