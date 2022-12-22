// import dataService file from service folder
const dataService= require('./service/dataService')

// import jsonwebtoken
const jwt=require('jsonwebtoken')


// import express

const express=require('express')

// create app

const app=express()

// to convert json datas
app.use(express.json())


//  middleware for verify the token

const jwtmiddleware=(req,res,next)=>{
  console.log("......router specific middleware");
  try{
    const token=req.headers['access-token']
  const data= jwt.verify(token,"secretkey123")

  console.log(data);
  next()
  }
  catch{
    res.status(422).json( {
      statusCode:422,
      status:false,
      message:"please login"
    })
  }
}



//   request


  //  register
 
  app.post('/register',(req,res)=>{

    const result=dataService.register(req.body.acno,req.body.uname,req.body.psw)

    res.status(result.statusCode).json(result)



  })
// login

app.post('/login',(req,res)=>{

  const result=dataService.login(req.body.acno,req.body.psw)

  res.status(result.statusCode).json(result)



})

app.post('/deposit',jwtmiddleware,(req,res)=>{

  const result=dataService.deposit(req.body.acno,req.body.psw,req.body.amount)

  res.status(result.statusCode).json(result)



})

app.post('/withdraw',wtmiddleware,(req,res)=>{

  const result=dataService.withdraw(req.body.acno,req.body.psw,req.body.amount)

  res.status(result.statusCode).json(result)



})


  app.post('/gettransaction',wtmiddleware,(req,res)=>{

    const result=dataService.gettransaction(req.body.acno)
   
    res.status(result.statusCode).json(result)
    
  })




//  GET
//   app.get('/',(req,res)=>{
//     res.send('GET Method checking.............')
//   })

// //   post
// app.post('/',(req,res)=>{
//     res.send('POST Method checking.............')
//   })
// //   put
// app.put('/',(req,res)=>{
//     res.send('PUT Method checking.............')
//   })
// //   delete
// app.patch('/',(req,res)=>{
//     res.send('PATCH Method checking.............')
//   })
// //   patch
// app.delete('/',(req,res)=>{
//     res.send('DELETE Method checking.............')
//   })
 




// set port

app.listen(3000,()=>{
    console.log("server started at prt number 3000");
})