const router = require('express').Router()
const connectDB = require('./db.js');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

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
    store : new FileStore(),
    cookie : {
        maxAge : 60 * 60 * 1000, //유지시간 1시간
        httpOnly : false,
        secure : false,
    }
}))

//get Session
router.get('',(req,res)=>{
    try{
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        console.log('session info', req.session);
        res.status(200).json(req.session)
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

//로그아웃(세션삭제)
router.get('/Logout',async(req,res)=>{
    console.log('/Logout 실행');
    console.log(req.session);
    req.session.destroy(()=>{
        res.status(200).json({message:'logout sucess'});
    })
})

module.exports = router