const express=require('express');
const routes=express.Router();
const person=require('./../models/person');
const {jwtMiddleware,generateToken}=require('./../jwt.js');

routes.post('/signup',async(req,res)=>{
    const newPerson= new person(req.body);
    try{
const p=await newPerson.save();
    console.log("Data Saved");
    const payload={
        id:p.id,
        username:p.username
    }
    const tkn=await generateToken(payload);
    
    console.log("Token is "+tkn);
    res.status(200).json({res:p,token:tkn});

    }
    catch(error)
    {
        console.log("Error"+error);
        res.status(500).json({error:"Error in saving data"});
    }
})
//Login

routes.post('/login', async(req, res) => {
    try{
        // Extract username and password from request body
        const {username, password} = req.body;

        // Find the user by username
        const user = await person.findOne({username: username});

        // If user does not exist or password does not match, return error
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        // generate Token 
        const payload = {
            id: user.id,
            username: user.username
        }
        const token =await generateToken(payload);
           console.log(token)
        // resturn token as response
        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
routes.get('/',jwtMiddleware,async(req,res)=>{
    try{
      const data=await person.find();
      console.log("Fetched data");
      res.status(200).json(data);
    }
    catch(error)
    {
  console.log(`Error in fetching data ${error}`);
    }
})

routes.get('/:workType',async(req,res)=>{
    try{
        const workType=req.params.workType;
        if(workType=='chef'||workType=='manager'|| workType=='waiter')
        {
            const data=await person.find({work:workType});
            console.log("Fetched Successfully!!!")
            res.status(200).json(data);
        }
        else{
            res.status(400).json({message:"Not Found!!"});
    
        }
        }
    catch(error)
    {
        res.status(500).json({message:"Not Found!!!",errors:error});
    }
    
    
    })

    routes.get('/profile',jwtMiddleware, async (req, res) => {
        try{
            const userData = req.user;
            console.log("User Data: ", userData);
    
            const userId = userData.id;
            const user = await person.findById(userId);
    
            res.status(200).json({user});
        }catch(err){
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    })
    
    

    routes.put('/:id',async(req,res)=>{
        try{
           const personId=req.params.id;
           const updateData=req.body;
           const response=await person.findByIdAndUpdate(personId,updateData,{
            new:true,
            runValidators:true
           })
           console.log("Updated Successfully");
           res.status(200).json(response);
           if(!response)
           {
            res.status(404).send("Person Not Find");
           }

        }
        catch(error)
        {
           console.log("Error"+error);
           res.status(500).json({
            message:error
           })
        }
    })
    // comment is addedd;

 routes.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const response=await person.findByIdAndDelete(personId)
        console.log("Updated Successfully");
        res.status(200).json(response);
        if(!response)
        {
         res.status(404).send("Person Not Find");
        }

     }
     //comment
     catch(error)
     {
        console.log("Error"+error);
        res.status(500).json({
         message:error
        })
     }
 })

module.exports=routes;