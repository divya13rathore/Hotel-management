const mongoose=require('mongoose');
const menuSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        default:2
    },
    taste:{
        type:String,
        enum:["sweet","Spicy","Bitter"],
        required:true
    }

})
const menus=mongoose.model('menus',menuSchema);
module.exports=menus;