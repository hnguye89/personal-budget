const express = require('express'); 
const app = express();

const jwt = require('jsonwebtoken'); 
const exjwt = require('express-jwt'); 
const bodyParser = require('body-parser');
const path = require('path'); 

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));


const PORT = 4000; 

const secretKey = "My super secret key"; 
const jwtMW = exjwt({
    secret: secretKey,  
    algorithms: ['HS256']
}); 

let users = [
    {
        id: 1,
        username: 'helen',
        password: '123'
    },
    {
        id: 2, 
        username: 'lord',
        password: '456'
    }
]

app.post('/api/login', (req, res) =>{
    const { username, password } = req.body; 

    for (let user of users){
        if(username == user.username && password == user.password){
            let token  = jwt.sign({ id:user.id, username: user.username }, secretKey, { expiresIn: '7d'}); 
            res.json({
                success: true, 
                err: null, 
                token
            });
            break; 
        }
        else{o
            res.status(401).json({
                success: false, 
                token: null, 
                err: 'Username or password is incorrect'
            });
        }
    }
}); 

app.get('/api/dashboard', jwtMW, (req, res) => {
    console.log(req); 
    res.json({
        success: true, 
        myContent: 'Secret content that only logged in people can see!!!'
    });
}); 

app.get('/api/prices', jwtMW, (req,res) => {
    //es.sendFile(path.join(__dirname, 'index.html')); 
    res.json({
        success: true, 
        myContent: 'this is the price $3.99'
    });
}); 

app.use(function(err, req, res, next) {
    console.log(err.name === 'UnauthorizedError'); 
    console.log(err); 
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({
            success: false, 
            officialError: err, 
            err: 'Username or password is incorrect 2'
        });
    }
    else{
        next(err); 
    }
}); 

app.listen(PORT, () => {
    console.log('Serving on port $(PORT)'); 
}); 