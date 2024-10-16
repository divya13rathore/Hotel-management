// console.log("server file is running")

// function printMe(a,b,callback)
// {
//     console.log(a+b);
//     callback();
// }
// printMe(3,4,()=>console.log("callback"));

// var fs=require('fs');
// var os=require('os');
// var note=require('./note.js')
// var _ = require('lodash');
// console.log(note.age);
// console.log(note.addNumber(3,4));
// var user=os.userInfo();
// console.log(user)
// console.log(user.username);
// fs.appendFile('greeting.txt',"Hiii I am a new file"+user.username+'!\n', ()=>console.log("File is Created"));
// let data=[1,2,3,"name","name"];
// let filter=_.uniq(data);
// console.log(filter);
// const json = '{"result":true, "count":42}';
// const obj = JSON.parse(json);
// const newJson='{"Name":"Divu"}'
// const obj1=JSON.parse(newJson);
// console.log(obj.count)
// console.log(JSON.stringify(obj1));
const express=require('express');
const db=require('./db')
const app=express();
const person=require('./models/person.js')
const menus=require('./models/menu.js');
require('dotenv').config();
const bodyPareser=require('body-parser');
app.use(bodyPareser.json());
const passport=require('passport');
const localPassport=require('passport-local').Strategy
const loginRequest=(req,res,next)=>{
console.log(`${new Date().toLocaleString()} is running through ${req.originalUrl}`);
next(); // move to next phase , current phase is completed
}
const bcrypt=require('bcrypt');

const personRoute=require('./routes/personroute.js');
app.get('/div',function(req,res){
    const obj={
        name:"Divya",
        class:9
    }
    res.send(obj);
})

// passport.use(new localPassport(async (user, pass, done)=>{
//     try{
// const userData=await person.findOne({username:user});
// if(!userData)
// {
//     return done(null,false,{message:"Not Found"});
// }
// const ispassword=user.comparePassowrd(password);
// if(!ispassword)
// {
//     return done(null,false,{message:"wrong Password"});
// }
// return done(null,user);
//     }
//     catch(err)
//     {
//         return done(err);
//     }
// }))
// app.use(passport.initialize());
// const middl=passport.authenticate('local',{session:false});
app.get('/',function(req,res){
    res.send("Hello World");
 })
const PORT=process.env.PORT||3000;
app.use('/persondata',personRoute);
app.listen(PORT,()=>{
    console.log("App is running on port 3000");
});