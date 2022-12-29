const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const path = require('path')
const app = express()
const stripe = require('stripe')(Secret_Key)
 
var Publishable_Key = 'pk_test_51MK33oLnLzrhPaYf58QwnJXzDYpOZln8k8onvrdaetf7DRGket90CMsuiUurIz841wxbXCea077WtLhuwbVEGi8Z007oXmlSs6'
var Secret_Key = 'sk_test_51MK33oLnLzrhPaYfLZXLsesGPHe4nWh4GMsz89jW0Z9YiCiC7pgzRI8Kw21byw6ZVarZoHHRw8wJhf4B7fust8Nn006qe4eXHq'
 

 
const port = process.env.PORT || 3000

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


 
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
 
// View Engine Setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
 
app.get('/', function(req, res){
res.render('Home', {
key: Publishable_Key
})
})
app.post('/payment', function(req, res){
 
    // Moreover you can take more details from user
    // like Address, Name, etc from form
    stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken,
    name: 'Vamos',
    address: {
    line1: 'TC 9/4 Old MES colony',
    postal_code: '02',
    city: 'Giza',
    state: 'Zat_Elkom',
    country: 'Egypt',
    }
    })
    .then((customer) => {
     
    return stripe.charges.create({
    amount: 7000, // Charing Rs 25
    description: 'Web Development Product',
    currency: 'USD',
    customer: customer.id
    });
    })
    .then((charge) => {
    res.send("Success") // If no error occurs
    })
    .catch((err) => {
    res.send(err) // If some error occurs
    });
    })
 
app.listen(port, function(error){
if(error) throw error
console.log("Server created Successfully")
})