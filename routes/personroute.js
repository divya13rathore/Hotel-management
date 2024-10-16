const express=require('express');
const routes=express.Router();
const person=require('./../models/person');

routes.post('/',async(req,res)=>{
    const newPerson= new person(req.body);
    try{
const p=await newPerson.save();
    console.log("Data Saved");
    res.status(200).json(p);
    }
    catch(error)
    {
        console.log("Error"+error);
        res.status(500).json({error:"Error in saving data"});
    }
})

routes.get('/',async(req,res)=>{
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