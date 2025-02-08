const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productname:{type:String,required:true},
    quantity:{type:Number},
    price:{type:Number,required:true},
    userId : {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true},
    user : {type:String,required:true}
},{versionKey:false})
const ProductModel = new mongoose.model("products",productSchema)
module.exports = {ProductModel}