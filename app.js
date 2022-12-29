
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const userRouter = require('./routers/user')
const itemRouter =require('./routers/item')
const cartRouter = require('./routers/cart')
const orderRouter = require('./routers/order')
//require('./db/mongoose')

const port = process.env.PORT
const mongoUrl =
  "mongodb+srv://adarsh:adarsh@cluster0.zllye.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(itemRouter)
app.use(cartRouter)
app.use(orderRouter)
app.get("/", cors(), async (req, res) => {
  res.send("This is working")
  })
  
  app.post("/post_name", async (req, res) => {
    let {name} = req.body
    console.log(name)
    })

app.listen(port, () => {
    console.log('server listening on port ' + port)
})