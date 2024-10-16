const mongoose=require('mongoose');
const personSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true

    },
    email:{
        type:String,
        unique:true,
        require:true

    }

})
const person=mongoose.model('person',personSchema);
module.exports=person;