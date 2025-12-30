import mongoose from 'mongoose'

const demoSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  mobile:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  message:{
    type:String,
    required:true
  },
},{timestamps:true})

const Demo = mongoose.model("Demo", demoSchema)
export default Demo;