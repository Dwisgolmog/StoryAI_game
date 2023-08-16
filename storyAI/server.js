const express = require('express');
const app = express();
const path = require('path');

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