const express = require("express");
const { connectedToDB } = require("./config/db");
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes")
const cors = require("cors")
const PORT = 8080 ;
const app = express();
app.use(cors(
  {
    origin: 'http://localhost:5173',
    methods:['GET','POST','PUT','DELETE'] ,
    credentials:true ,
  }
))
app.use(express.json())
app.use("/users",userRouter)
app.use("/products",productRouter)

app.get("/" ,(req,res)=> {
res.status(200).send({msg:"Good to go"})
})

app.listen(PORT, async() => {
    await  connectedToDB();
     console.log(
       `Server is running on http://localhost:${PORT} and connected to DB`
     );
    }) ;