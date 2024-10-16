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
const bodyPareser=require('body-parser');
app.use(bodyPareser.json());
app.get('/',function(req,res){
   res.send("Hello World");
})
const personRoute=require('./routes/personroute.js');
app.get('/div',function(req,res){
    const obj={
        name:"Divya",
        class:9
    }
    res.send(obj);
})

// app.post('/persondata',async(req,res)=>{
//     const newPerson= new person(req.body);
//     try{
// const p=await newPerson.save();
//     console.log("Data Saved");
//     res.status(200).json(p);
//     }
//     catch(error)
//     {
//         console.log("Error"+error);
//         res.status(500).json({error:"Error in saving data"});
//     }
// })

// app.get('/persondata',async(req,res)=>{
//     try{
//       const data=await person.find();
//       console.log("Fetched data");
//       res.status(200).json(data);
//     }
//     catch(error)
//     {
//   console.log(`Error in fetching data ${error}`);
//     }
// })
// app.get('/persondata/:workType',async(req,res)=>{
// try{
//     const workType=req.params.workType;
//     if(workType=='chef'||workType=='manager'|| workType=='waiter')
//     {
//         const data=await person.find({work:workType});
//         console.log("Fetched Successfully!!!")
//         res.status(200).json(data);
//     }
//     else{
//         res.status(400).json({message:"Not Found!!"});

//     }
//     }
// catch(error)
// {
//     res.status(500).json({message:"Not Found!!!",errors:error});
// }


// })

app.use('/persondata',personRoute);
app.listen(3000,()=>{
    console.log("App is running on port 3000");
});