const express = require('express');
const app = express();
const PORT = 3000;
const os = require('os');
let userArray= [];
let visitorCount =0;

app.use(express.json());

app.get('/',(req,res)=>{
    res.json({
        message:"Welcome to Greeting server",
        timestamp:new Date().toISOString(),
        version:'1.0.0'
    });
});

app.get('/api/greet' , (req,res)=>{
    const userName = req.query.name;
    const time = new Date().getHours();
    let Greetings = "Good ";
    if(time>=0 && time<11) Greetings = Greetings+"Morning, " + userName;
    else if(time>=11 && time<3) Greetings = Greetings + "Noon, " + userName;
    else if(time>=3 && time<6) Greetings = Greetings + "Afternoon, " + userName;
    else if(time>=6 && time<8) Greetings = Greetings + "Evening, " + userName;
    else Greetings = Greetings + "Night, " + userName;

    res.json({
        status:'success',
        data:{
            message:`Greetings ${userName}, How are you?`,
            greetings: Greetings
        }
    });

});

app.get('/api/visitor' ,(req,res)=>{
    const userName = req.query.name;
    visitorCount++;
    if(userArray.length<5){
        userArray.push(userName);
    } 
    else{
        let newArray = userArray.slice(1);
        userArray = [...newArray];
        userArray.push(userName);
    } 
    res.json({
        status:"Success",
        message:"Name accepted successfully"
    })  
});

app.get('/api/visitors', (req,res)=>{
    let visitorArray = [...userArray];
    visitorArray.reverse();
    res.json({
        visitorCount:visitorCount,
        lastVisitors: [...visitorArray]
    });
});


app.listen(PORT,()=>{
    console.log("Server started successfully");
});