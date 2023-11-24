const router = require('express').Router()
const connectDB = require('./db.js');
const session = require('express-session');
//const dotenv = require('dotenv');

//db 연결
let db
connectDB.connect().then((client)=>{
    db = client.db('StoryAI')
}).catch((e)=>{console.log("user.js db 에러 발생!!"+e)})

//회원추가
router.post('/SignUp',async(req,res)=>{
    try{
        inputEmail = await db.collection('userInfo').findOne({email:req.body.email})
        if(!inputEmail){
            await db.collection('userInfo').insertOne({
                email:req.body.email,
                password:req.body.password,
                name:req.body.name
            })
            // res.send(200);
        }else{
            res.status(409);
            res.send({message:"아이디가 중복되었습니다!"});
        }
        
    }catch(e){
        console.log("/users/SignUp server 오류발생!:"+e);
    }
})

//session 설정
router.use(session({
    name: "session ID",
    secret: process.env.SESSION_SECRIT,
    resave : false,
    saveUninitialized : false,
    cookie : {
        maxAge : 1000*100,
        httpOnly : false,
        secure : false,
    }
}))

router.get('',(req,res)=>{
    try{
        console.log('session info', req.session);
        res.status(200).json(req.session.user.userName)
    }catch(e){
        console.log('get 세션 오류:'+e);
    }
})


//로그인 검사
router.post('/LogIn', async (req, res) => {
    const userInfo = await db.collection('userInfo').findOne({email:req.body.email})
    
    if(userInfo){
        //session 생성
        req.session.save(()=>{
            req.session.user = {
                userEmail : userInfo.email,
                userName : userInfo.name
            }
            const data = req.session;
            res.status(200).json({data});
        })
    }else{
        res.status(404).send({message:"존재하지 않는 아이디"});
    }

});

module.exports = router