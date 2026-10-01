const mongoose = require('mongoose');
const urlsSchema = new mongoose.Schema({
  shortId:{
    type:String,
    required:true,
    unique:true
  },
  redirectURL:{
     type:String,
    required:true,

  },
 visitHistory:[{
  timestamp:{
       type: Number
  }
 }],
 createdBy:{
  type:mongoose.Schema.Types.ObjectId,
  ref : "users",

 }
},{timestamps:true}
);

const URL = mongoose.model('url',urlsSchema);
module.exports = URL;
