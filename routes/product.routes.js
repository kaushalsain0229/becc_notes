const express = require("express")
const {ProductModel} = require("../models/product.model")
const {auth} = require("../middlewares/auth.middlewares")
productRouter = express.Router() 

productRouter.post("/add",auth,async(req,res)=>{
    try {
        const newProduct = new ProductModel(req.body)
        await newProduct.save()
        res.status(200).json({msg:`product added`,newProduct})
    } catch (error) {
        res.status(400).json({msg:`error`,error}) 
    }
})
productRouter.get("/products",auth,async (req,res)=>{
//   const {userId} = req.params
    try {
        const products = await ProductModel.find({userId: req.body.userId})
        res.status(200).json({products});
    } catch (error) {
        res.status(400).json({msg:`error`,error})  
    }
})
productRouter.patch("/update/:productId",auth,async (req,res)=>{
    const {productId} = req.params
  try {
        const product  = await ProductModel.findOne({_id:productId})
        if(product.userId.toString() === req.body.userId){
            await ProductModel.findByIdAndUpdate({_id:productId},req.body)
            res.status(200).json({ msg: `The product with ID:${productId} is updated`,product});
        }else{
            res.status(400).json({msg:"You are not authorised to do this task.."})  
        }
    } catch (error) {
        res.status(500).json({msg:`${error}`,error})  
    }
})
productRouter.delete("/delete/:productId",auth,async (req,res)=>{
    const {productId} = req.params
  try {
        const product  = await ProductModel.findOne({_id:productId})
       if(product.userId.toString() === req.body.userId){
            await ProductModel.findByIdAndDelete({_id:productId})
            res.status(200).json({ msg: `The product with ID:${productId} is deleted`,product});
        }else{
            res.status(400).json({msg:"You are not authorised to do this task.."})  
        }
    } catch (error) {
        res.status(500).json({msg:`${error}`,error})  
    }
})

 module.exports =  productRouter