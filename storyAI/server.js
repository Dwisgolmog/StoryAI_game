const express = require('express');
const app = express();

app.use(express.json());
const cors = require('cors');
app.use(cors());

const path = require('path');

app.set('view engine', 'ejs'); // ejs 사용 셋팅
// MongoDB 연동
// MongoDB 연동
// const MongoClient = require('mongodb').MongoClient;
// let db;
// MongoClient.connect('mongodb+srv://dnwn3027:suwon1234@stone.jf0hj90.mongodb.net/?retryWrites=true&w=majority', function (err, client) {
//   if (err) return console.log(err);
//   // MongoDB의 StoryAI DB연결
//   db = client.db('StoryAI');
//   // chat이라는 컬렉션에 chatData 넣기
//   db.collection('chat').insertOne({ chatMessages: chatData }, function (err, result) {
//     if (err) return console.log(err);
//     console.log('DB에 저장됨');
//   });
  
//   app.listen(8080, function () {
//     console.log('listening on 8080');
//   });
// });
app.listen(8080, function () {
  console.log('listening on 8080');
});

// 파파고 API 연동
const clientId = 'exJJisjHTM4Hro9BlAc8';
const clientSecret = 'EoC1NjPiy3';
const sourceLang = 'en';
const targetLang = 'ko';

const apiUrl = 'https://openapi.naver.com/v1/papago/n2mt';

const headers2 = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'X-Naver-Client-Id': clientId,
  'X-Naver-Client-Secret': clientSecret,
};

const data2 = new URLSearchParams();
data2.append('source', sourceLang);
data2.append('target', targetLang);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Papago API 호출
// app.post('/server/translate', function (req, res) {
//   console.log('연동되었습니다');
//   data2.append('text', req.body.textToTranslate);
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

// app.get('/server/translate/hi', function (req, res) {
//   res.send('hi');
// });

const chatData=[
  {
    "role": "system",
    "content": "Main story ..."
  },
  {
    "role": "user",
    "content": ""
  },
  {
    "role": "assistant",
    "content": "플레이어는 사무실에서 일어났습니다. 주위를 둘러보니 건물 내부는 좀비로 가득 차 있었습니다. 당황한 플레이어는 어떻게든 이곳에서 탈출해야겠다고 생각했습니다.\n\n어떤 행동을 취하시겠습니까?\n1. 주변을 둘러보며 탈출구를 찾아본다.\n2. 좀비와 싸우기 위해 무기를 찾아본다.\n3. 동료를 찾아 함께 탈출 계획을 세운다.\n4. 창문을 통해 밖으로 뛰어내린다.\n5. 건물의 지하로 내려가 안전한 곳을 찾는다."
  },
  {
    "role": "user",
    "content": "1"
  },
  {
    "role": "assistant",
    "content": "플레이어는 주변을 둘러보며 탈출구를 찾기 시작했습니다. 건물 내부는 어둡고 무서웠지만, 플레이어는 결단력을 가지고 집중했습니다. 한참을 찾아다니던 중에 비상계단을 발견했습니다. 플레이어는 기뻐하며 비상계단으로 향했습니다.\n\n어떤 행동을 취하시겠습니까?\n1. 비상계단을 따라 내려간다.\n2. 비상계단 근처에서 좀비에 대비하기 위해 기다린다.\n3. 비상계단을 내려가기 전에 다른 동료들을 찾아본다.\n4. 비상계단으로 향하는 동안 좀비와 조용히 싸워서 통과한다.\n5. 비상계단이 다른 층으로 연결되는지 확인하기 위해 층을 올라간다."
  },
  {
    "role": "user",
    "content": "1"
  },
  {
    "role": "assistant",
    "content": "플레이어는 비상계단을 따라 내려갔습니다. 계단을 내려오며 건물의 끝으로 향하는 희망의 끈을 잡았습니다. 하지만 계단 아래로 내려오는 도중에 끝없이 몰려오는 좀비 무리를 발견했습니다. 플레이어는 고민하며 어떻게 해야 할지 생각했습니다.\n\n어떤 행동을 취하시겠습니까?\n1. 좀비들과 싸우기 위해 무기를 사용한다.\n2. 계단 아래로 내려가 좀비들을 피한다.\n3. 계단을 되돌아가 다른 탈출구를 찾는다.\n4. 동료들에게 도움을 요청하여 함께 싸운다.\n5. 계단 위로 올라가 다른 층에서 대처 방법을 찾는다."
  },
  {
    "role": "user",
    "content": "3"
  },
  {
    "role": "assistant",
    "content": "플레이어는 계단 아래로 내려가 좀비들을 피하기로 결정했습니다. 끝없이 몰려오는 좀비들을 피하기 위해 플레이어는 민첩하게 움직이며 좀비들과의 거리를 벌렸습니다. 그러나 계단을 내려오는 도중에 하나의 좀비에게 발갈고리를 걸려 넘어지게 되었습니다.\n\n어떤 행동을 취하시겠습니까?\n1. 빨리 일어나서 다시 뛰어내린다.\n2. 주변에 있는 물건을 이용해 좀비를 공격한다.\n3. 좀비들을 피하기 위해 엎드린 채로 움직인다.\n4. 동료들에게 도움을 요청하여 함께 싸운다.\n5. 상황을 분석하고 다른 탈출 경로를 찾는다."
  },
  {
    "role": "user",
    "content": "1"
  },
  {
    "role": "assistant",
    "content": "플레이어는 빠르게 일어나서 다시 계단을 통해 뛰어내렸습니다. 좀비들은 플레이어의 움직임을 따라오기 시작했지만, 플레이어는 결연하게 앞으로 나아갔습니다. 계단을 모두 내려간 플레이어는 건물 밖으로 나왔습니다. 하지만 도시는 여전히 좀비로 가득 차 있었습니다.\n\n어떤 행동을 취하시겠습니까?\n1. 도시의 주요 도로를 따라 생존자 캠프를 찾는다.\n2. 주변을 둘러보며 안전한 장소를 찾아 숨는다.\n3. 동료들과 합류하여 함께 생존을 위해 계획을 세운다.\n4. 도시를 빠져나가기 위해 지하철을 찾는다.\n5. 도시 내에서 무작위로 이동하며 좀비와의 접촉을 최소화한다."
  },
  {
    "role": "user",
    "content": "1"
  },
  {
    "role": "assistant",
    "content": "플레이어는 도시의 주요 도로를 따라 생존자 캠프를 찾기로 결정했습니다. 신속하게 움직이며 주변을 둘러보던 중, 멀리서 생존자 캠프의 조명이 보였습니다. 플레이어는 희망을 가지고 캠프를 향해 달려갔습니다.\n\n도시를 벗어나 생존자 캠프를 발견한 플레이어는 더 이상 좀비들과의 사투를 벌일 필요가 없었습니다. 캠프 안에서 플레이어는 안전하게 살아남을 수 있었고, 다른 생존자들과 함께 새로운 삶을 시작했습니다.\n\n축하합니다! 플레이어는 좋은 결말을 맞이했습니다. 좀비들과의 사투를 뚫고 생존자 캠프를 발견한 것은 큰 성취입니다. 플레이어의 용기와 결단력을 칭찬합니다!"
  }
]
// 파인튜닝 데이터를 chatData에 병합 (추가된 부분)
const fineTuningData = [
  {
    role: 'user',
    content: "Hello, how are you?"
  },
  {
    role: 'assistant',
    content: "I'm doing well, thank you for asking!"
  },
  // 추가 데이터 추가 가능
];

chatData.push(...fineTuningData);

// OpenAI 파인튜닝 및 대화 생성
//const gptKeyValue = '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'; // 이 부분은 이미 정의되어 있습니다.
const apiKey = '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'; // 여기에 본인의 OpenAI API 키를 넣어주세요
const OpenAI = require('openai');
const axios = require('axios');
const fs = require('fs')
const openai = new OpenAI({
  apiKey
});
// const data=[
//   {"prompt": "플레이어는 사무실에서 일어났습니다. 주위를 둘러보니 건물 내부는 좀비로 가득 차 있었습니다. 당황한 플레이어는 어떻게든 이곳에서 탈출해야겠다고 생각했습니다.\n\n어떤 행동을 취하시겠습니까?\n1. 주변을 둘러보며 탈출구를 찾아본다.\n2. 좀비와 싸우기 위해 무기를 찾아본다.\n3. 동료를 찾아 함께 탈출 계획을 세운다.\n4. 창문을 통해 밖으로 뛰어내린다.\n5. 건물의 지하로 내려가 안전한 곳을 찾는다.","completion": "1. 주변을 둘러보며 탈출구를 찾아본다. (을)를 선택하셨습니다."},
// {"prompt": "플레이어는 주변을 둘러보며 탈출구를 찾기 시작했습니다. 건물 내부는 어둡고 무서웠지만, 플레이어는 결단력을 가지고 집중했습니다. 한참을 찾아다니던 중에 비상계단을 발견했습니다. 플레이어는 기뻐하며 비상계단으로 향했습니다.\n\n어떤 행동을 취하시겠습니까?\n1. 비상계단을 따라 내려간다.\n2. 비상계단 근처에서 좀비에 대비하기 위해 기다린다.\n3. 비상계단을 내려가기 전에 다른 동료들을 찾아본다.\n4. 비상계단으로 향하는 동안 좀비와 조용히 싸워서 통과한다.\n5. 비상계단이 다른 층으로 연결되는지 확인하기 위해 층을 올라간다.","completion": "1. 비상계단을 따라 내려간다. (을)를 선택하셨습니다."},
// {"prompt": "플레이어는 비상계단을 따라 내려갔습니다. 계단을 내려오며 건물의 끝으로 향하는 희망의 끈을 잡았습니다. 하지만 계단 아래로 내려오는 도중에 끝없이 몰려오는 좀비 무리를 발견했습니다. 플레이어는 고민하며 어떻게 해야 할지 생각했습니다.\n\n어떤 행동을 취하시겠습니까?\n1. 좀비들과 싸우기 위해 무기를 사용한다.\n2. 계단 아래로 내려가 좀비들을 피한다.\n3. 계단을 되돌아가 다른 탈출구를 찾는다.\n4. 동료들에게 도움을 요청하여 함께 싸운다.\n5. 계단 위로 올라가 다른 층에서 대처 방법을 찾는다.","completion": "2. 계단 아래로 내려가 좀비들을 피한다. (을)를 선택하셨습니다."},
// {"prompt": "플레이어는 계단 아래로 내려가 좀비들을 피하기로 결정했습니다. 끝없이 몰려오는 좀비들을 피하기 위해 플레이어는 민첩하게 움직이며 좀비들과의 거리를 벌렸습니다. 그러나 계단을 내려오는 도중에 하나의 좀비에게 발갈고리를 걸려 넘어지게 되었습니다.\n\n어떤 행동을 취하시겠습니까?\n1. 빨리 일어나서 다시 뛰어내린다.\n2. 주변에 있는 물건을 이용해 좀비를 공격한다.\n3. 좀비들을 피하기 위해 엎드린 채로 움직인다.\n4. 동료들에게 도움을 요청하여 함께 싸운다.\n5. 상황을 분석하고 다른 탈출 경로를 찾는다.","completion": "1. 빨리 일어나서 다시 뛰어내린다. (을)를 선택하셨습니다."},
// {"prompt": "플레이어는 빠르게 일어나서 다시 계단을 통해 뛰어내렸습니다. 좀비들은 플레이어의 움직임을 따라오기 시작했지만, 플레이어는 결연하게 앞으로 나아갔습니다. 계단을 모두 내려간 플레이어는 건물 밖으로 나왔습니다. 하지만 도시는 여전히 좀비로 가득 차 있었습니다.\n\n어떤 행동을 취하시겠습니까?\n1. 도시의 주요 도로를 따라 생존자 캠프를 찾는다.\n2. 주변을 둘러보며 안전한 장소를 찾아 숨는다.\n3. 동료들과 합류하여 함께 생존을 위해 계획을 세운다.\n4. 도시를 빠져나가기 위해 지하철을 찾는다.\n5. 도시 내에서 무작위로 이동하며 좀비와의 접촉을 최소화한다.","completion": "1. 도시의 주요 도로를 따라 생존자 캠프를 찾는다. (을)를 선택하셨습니다."},
// {"prompt": "플레이어는 도시의 주요 도로를 따라 생존자 캠프를 찾기로 결정했습니다. 신속하게 움직이며 주변을 둘러보던 중, 멀리서 생존자 캠프의 조명이 보였습니다. 플레이어는 희망을 가지고 캠프를 향해 달려갔습니다.\n\n도시를 벗어나 생존자 캠프를 발견한 플레이어는 더 이상 좀비들과의 사투를 벌일 필요가 없었습니다. 캠프 안에서 플레이어는 안전하게 살아남을 수 있었고, 다른 생존자들과 함께 새로운 삶을 시작했습니다.\n\n축하합니다! 플레이어는 좋은 결말을 맞이했습니다. 좀비들과의 사투를 뚫고 생존자 캠프를 발견한 것은 큰 성취입니다. 플레이어의 용기와 결단력을 칭찬합니다!","completion": " "}
// ]
// async function uploadFineTuningData() {
//   try {
//     const response = await axios.post(
//       'https://api.openai.com/v1/fine_tunes',
//       {
//         data: data,
//         fine_tune_prompt: "Fine-tune prompt" // Optional prompt
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${apiKey}`
//         }
//       }
//     );

//     console.log('Fine-tuning data uploaded:', response.data);
//   } catch (error) {
//     console.error('Error uploading fine-tuning data:', error.message);
//   }
// }

// uploadFineTuningData();
//1
// async function uploadFile() {
//   try {
//     const response = await openai.files.create({
//       file: fs.createReadStream("newdata.jsonl"),
//       purpose: "fine-tune"
//     });

//     console.log(`File ID ${JSON.stringify(response)}`);
//     return response;
//   } catch (err) {
//     console.log('err uploadfile: ', err);
//   }
// }
// uploadFile();
//2
// const fineTune = openai.fineTunes.create({
//   training_file: 'file-7WVn0QF5wZBtVyRilsxX9Qq2',
//   model: 'gpt-3.5-turbo-0613'
// });

// fineTune.then(result => {
//   console.log(result); // 작업 결과 확인
// }).catch(error => {
//   if (error instanceof OpenAI.APIError) {
//     console.error('API Error:', error);
//   } else {
//     console.error('Other Error:', error);
//   }
// });

// console.log(fineTune)
//3
// const requestData={
//   training_file: 'file-7WVn0QF5wZBtVyRilsxX9Qq2',
//   model: 'gpt-3.5-turbo-0613'
// };
// const headers={
//   'content-type': 'application/json',
//   Authorization: `Bearer ${'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'}`,
// };
// fetch('https://api.openai.com/v1/fine_tuning/jobs',{
//   method: 'POST',
//   headers: headers,
//   body : JSON.stringify(requestData),
// }).then((response)=>response.json()).then((data)=>{
//   console.log('Response: ',data);
// }).catch((error)=>{
//   console.error('error: ', error);
// })
//4
// const completion = openai.completions.create({
//   prompt: "안녕",
//   model: 'gpt-3.5-turbo-0613'
// });

// completion.then(result => {
//   console.log(result.choices);
// }).catch(error => {
//   console.error('Error:', error);
// });



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
    model: 'gpt-3.5-turbo',
    messages: chatMessages,
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })
  .then(chatCompletion => {
    const result = chatCompletion.choices[0].message;
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
