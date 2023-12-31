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

// const OpenAI = require('openai');
// const fs = require('fs')
// const openai = new OpenAI();

// 1 파일 업로드
// async function uploadFile() {
//   try {
//     const response = await openai.files.create({
//       file: fs.createReadStream("example.jsonl"),
//       purpose: "fine-tune"
//     });

//     console.log(`File ID ${JSON.stringify(response)}`);
//     return response;
//   } catch (err) {
//     console.log('err uploadfile: ', err);
//   }
// }
// uploadFile();


//2 미세조정 gpt 생성
// const fineTune = openai.fineTuning.jobs.create({
//     training_file: 'file-DTqMux2jfd0pmAb0n8QVRU8U',  //파일 업로드시 나온 file id 입력
//     model: 'gpt-3.5-turbo-0613'
//   });
  
//   const headers={
//     'content-type': 'application/json',
//     Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//   };
//   fetch('https://api.openai.com/v1/fine_tuning/jobs',{
//     method: 'POST',
//     headers: headers,
//     body : JSON.stringify(fineTune),
//   }).then((response)=>response.json()).then((data)=>{
//     console.log('Response: ',data);
//   }).catch((error)=>{
//     console.error('error: ', error);
//   })

// ===========================================================
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

//[{"role": "system","content": "Main story\n플레이어는 도시 중앙에 위치한 10층 건물에 있습니다. 도시는 좀비 대재앙의 한가운데에 있습니다. 도시는 좀비로 가득 차고, 플레이어가 위치한 건물도 좀비로 가득 차 있습니다. 플레이어는 어젯밤에 술을 많이 마셔서 좀비 아포칼립스가 일어나는 것을 눈치채지 못했습니다. 플레이어는 다음날 사무실에서 일어났습니다. 그때부터 이야기가 시작됩니다.\n플레이어의 주요 목표는 건물을 탈출하고 도시를 탈출한 다음 도시 밖의 생존자 캠프를 찾는 것입니다. 좀비는 항상 플레이어와 플레이어의 동료를 공격하고 잡아먹는 행동을 합니다.\n\nRequirements\n-한글로 응답하시오.\n\n-메인 스토리를 기반으로 새로운 이야기를 쓴 다음 'user'가 선택할 수 있는 5개의 행동을 제시하고 'user'의 답변을 기다리시오.\n\n-메인 스토리와 플레이어가 선택한 행동을 기반으로 이어지는 새로운 이야기를 쓰시오.\n\n-'user'가 5개의 선택지 중에서 선택을 하지 않았다면 새로운 이야기를 쓰지 마십시오.\n\n-'user'가 5개의 선택지 중에 하나를 선택하게 되면 이어지는 새로운 이야기를 쓰십시오.\n\n-'user'가 선택을 한 후 생성되는 새로운 이야기는 최대 100단어 에서 최소 70 단어로 생성하십시오. 단 답변이 완성되지 않았을경우 반드시 문장을 완성하십시오.\n\n-'user'가 3번의 답변을 할때마다 좀비들이 플레이어와 플레이어의 동료들을 공격하는 새로운 이야기를 쓰십시오.\n\n-'user'가 스토리 진행중 도시를 탈출하고 생존자 캠프를 발견하면 좋은 결말로 이야기를 끝내고 'user'에게 알리시오.\n\n-'user'가 스토리 진행중 좀비한테 물리거나 죽게 된다면 좋지 않은 결말로 이야기를 끝내고 'user'에게 알리시오.\n\n-'user'의 답변의 수가 5번이하일경우 이야기를 끝내지 않도록 하십시오.\n\nBe sure to comply with all requirements"},],
//4 확인
// async function sayStory(){
//   const completion = await openai.chat.completions.create({
//     messages: [{role:"user",content:""}], 
//     model: 'ft:gpt-3.5-turbo-0613:personal::7sshVr8V'
//   });
//   console.log('==============');
//   console.log(completion.choices);
// }

// sayStory();
