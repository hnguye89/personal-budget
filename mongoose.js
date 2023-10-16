const mongoose = require("mongoose");
const namesModel = require("./models/names_schema"); 

let url = 'mongodb://localhost27017/personal_budget';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=>{
            console.log("Connected to the database"); 
            namesModel.find({})
                     .then((data)=>{
                        console.log(data); 
                        mongoose.connection.close();  
                     })
                     .catch((connectionError)=> {
                        console.log(connectionError);
                     })                 
        })
        .catch((connectionError) => {
            console.log(connectionError); 
        })