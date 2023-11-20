const express = require('express');
const app = express();

app.use(express.json());
const cors = require('cors');
app.use(cors());

const path = require('path');

app.set('view engine', 'ejs'); // ejs 사용 셋팅

//dotenv 연결
const dotenv = require('dotenv');
dotenv.config();

// mongodb 연결
let connectDB = require("./router/db.js");
let db;
connectDB.connect().then((client) => {
  // MongoDB의 StoryAI DB연결
  db = client.db('StoryAI');
  // chat이라는 컬렉션에 chatData 넣기
  db.collection('chat').insertOne({ chatMessages: chatData }, function (err, result) {
    if (err) return console.log(err);
    console.log('DB에 저장됨');
  });

  console.log("DB 연결 성공!!");
  app.listen(8080, function () {
    console.log('listening on 8080')
  })
}).catch((err) => { console.log("MogoDB연결 에러 발생:" + err) });


app.use(express.static(path.join(__dirname, 'client/build')));

const userRouter = require('./router/users')
app.use('/users', userRouter)

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

const chatData = [
  {
    "role": "system",
    "content": "Main story\n플레이어는 도시 중앙에 위치한 10층 건물에 있습니다. 도시는 좀비 대재앙의 한가운데에 있습니다. 도시는 좀비로 가득 차고, 플레이어가 위치한 건물도 좀비로 가득 차 있습니다. 플레이어는 어젯밤에 술을 많이 마셔서 좀비 아포칼립스가 일어나는 것을 눈치채지 못했습니다. 플레이어는 다음날 사무실에서 일어났습니다. 그때부터 이야기가 시작됩니다.\n플레이어의 주요 목표는 건물을 탈출하고 도시를 탈출한 다음 도시 밖의 생존자 캠프를 찾는 것입니다. 좀비는 항상 플레이어와 플레이어의 동료를 공격하고 잡아먹는 행동을 합니다.\n\nRequirements\n-한글로 응답하시오.\n\n-메인 스토리를 기반으로 새로운 이야기를 쓴 다음 'user'가 선택할 수 있는 5개의 행동을 제시하고 'user'의 답변을 기다리시오.\n\n-메인 스토리와 플레이어가 선택한 행동을 기반으로 이어지는 새로운 이야기를 쓰시오.\n\n-'user'가 5개의 선택지 중에서 선택을 하지 않았다면 새로운 이야기를 쓰지 마십시오.\n\n-'user'가 5개의 선택지 중에 하나를 선택하게 되면 이어지는 새로운 이야기를 쓰십시오.\n\n-'user'가 선택을 한 후 생성되는 새로운 이야기는 최대 100단어 에서 최소 70 단어로 생성하십시오. 단 답변이 완성되지 않았을경우 반드시 문장을 완성하십시오.\n\n-'user'가 3번의 답변을 할때마다 좀비들이 플레이어와 플레이어의 동료들을 공격하는 새로운 이야기를 쓰십시오.\n\n-'user'가 스토리 진행중 도시를 탈출하고 생존자 캠프를 발견하면 좋은 결말로 이야기를 끝내고 'user'에게 알리시오.\n\n-'user'가 스토리 진행중 좀비한테 물리거나 죽게 된다면 좋지 않은 결말로 이야기를 끝내고 'user'에게 알리시오.\n\n-'user'의 답변의 수가 5번이하일경우 이야기를 끝내지 않도록 하십시오.\n\nBe sure to comply with all requirements"
  },
  {
    "role": "user",
    "content": ""
  },
]

// OpenAI 파인튜닝 및 대화 생성
const OpenAI = require('openai');
const axios = require('axios');
const fs = require('fs')
const openai = new OpenAI();

app.get('/server/gpt', function (req, res) {
  // 대화 데이터의 content 추출 및 토큰화
  const conversation = chatData.map(message => message.content);
  const tokenizedConversation = conversation.map(text => text.split(' '));

  // 입력 데이터 형식 구성
  const chatMessages = chatData.map(message => ({
    role: message.role,
    content: message.content
  }));

  openai.chat.completions.create({
    model: 'ft:gpt-3.5-turbo-0613:personal::7sshVr8V',
    messages: chatMessages,
    temperature: 0.8,
    max_tokens: 400,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })
  .then(chatCompletion => {
    const result = chatCompletion.choices[0].message;
    chatData.push(result);//chatData 배열에 답변 추가
    db.collection('chat').insertOne({ chatData }, function (err, res) {
      if (err) return console.log(err);
      console.log('DB에 추가되었습니다');
    });
    // chatMessages에 데이터 추가 (DB처리 필요)
    chatMessages.push(result);
    console.log('server newChatMessage:' + JSON.stringify(result));
    res.send(chatMessages); // 데이터 가져와서 보내기 (DB처리 필요)
  })
  .catch(error => {
    console.error(error);
  });
});

app.post('/server/gpt/send', function (req, res) {
  const userAnswer = {
    role: 'user',
    content: req.body.inputText,
  };
  chatData.push(userAnswer);
  console.log('chatData=====================\n' + JSON.stringify(chatData) + '\n\n');
  res.sendStatus(200);
});

// db 확인하기
app.get('/db', function (req, res) {
  console.log('db에 저장된 값입니다');
  db.collection('chat').find().toArray(function (err, result) {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    const extractedData = result.map(entry => ({
      _id: entry._id,
      roles: entry.chatMessages.map(message => message.role),
      contents: entry.chatMessages.map(message => message.content)
    }));
    for (let i = 0; i < result.length; i++) {
      result[i].extractedData = extractedData[i];
    }
    console.log('Extracted Data:', extractedData);
    res.render('db.ejs', { db: result });
  });
});

app.use('/users',require('./router/users.js'));