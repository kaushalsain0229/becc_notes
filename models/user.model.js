const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,unique:true}
},{versionKey:false,
    toJSON : {virtuals:true}
})
userSchema.virtual("products",{
    ref:"products" ,
    localField : "_id" ,
    foreignField: "userId"
})
const UserModel = new mongoose.model("users",userSchema)
module.exports = UserModel