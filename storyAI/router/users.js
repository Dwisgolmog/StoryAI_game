const router = require('express').Router()
const connectDB = require('./db.js');

//db 연결
let db
connectDB.connect().then((client)=>{
    db = client.db('StoryAI')
}).catch((e)=>{console.log("user.js db 에러 발생!!"+e)})

//회원추가
router.post('/SignUp',async(req,res)=>{
    try{
        await db.collection('userInfo').insertOne({
            email:req.body.email,
            password:req.body.password,
            name:req.body.name
        })
        res.send(200);
    }catch(e){
        console.log("/users/SignUp server 오류발생!:"+e);
    }
})

//로그인 검사
router.post('/LogIn',async(req,res)=>{
    
})


module.exports = router