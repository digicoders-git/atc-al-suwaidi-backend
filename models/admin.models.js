import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name:String,
  email:String,
  password:String,
}, {timestamps:true})

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;