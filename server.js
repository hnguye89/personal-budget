const express = require('express');
const app = express();
const port = 4000; 

const mongoDBClient = require('mongodb').MongoClient; 
let url = 'mongodb://localhost27017/personal_budget'; 

//CRUD = Create - Read - Update - Delete 

// 1 - connect to database 
// 2 - perform the desired operation
// 3 - close database connection 
mongoDBClient.connect(url, {useUnifiedTopology: true}, (operationError, dbHandler)=>{
    if(operationError){
        console.log("An error has occured during the connection process"); 
    } else{
        console.log("Connected to the database");
        let data = {id: 10, name: "added a new name from MongoDB Native Driver"};
        dbHandler.db("personal_budget").collection('names').insertOne(data, (operr, opresult)=>{
            if(operr){
                console.log("Unable to insert data into your collection");
            }else{
                console.log("Insert Successfully");
                //dbHandler.close(); 
            }
        })
        //List Operation
        dbHandler.db('personal_budget').collection('names').find().toArray((operr, opresult)=>{
            if(operr){
                console.log(operr); 
            } else{
                for(var i=0; i < opresult.length; i++){
                    console.log(opresult[i]); 
                }
                dbHandler.close(); 
            }
        }); 
    }
});

app.use('/', express.static('public'));

const budget = {
  myBudget: [
    {
        title: 'Eat out',
        budget: 30
    },
    {
        title: 'Rent',
        budget: 350
    }, 
    {
        title: 'Groceries',
        budget: 90
    },
    {
        title: 'Entertainment',
        budget: 50
    },
    {
        title: 'Healthcare',
        budget: 70
    },
    {
        title: 'Housing',
        budget: 500
    },
    {
        title: 'Medicine',
        budget: 100
    }, 
  ]
};


app.get('/hello', (req, res) => {
    res.send('Hello World!'); 
});

app.get('/budget', (req,res) => {
    res.json(budget);
}); 

app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}');
});
