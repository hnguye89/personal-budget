const express = require('express');
const app = express();
const port = 4000; 

const mongoDBClient = require('mongodb').MongoClient; 
let url = 'mongodb://localhost27017/personal_budget'; 

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
