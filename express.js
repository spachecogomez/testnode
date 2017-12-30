const express = require('express')
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
const app = express()
const router = express.Router()
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var privateKey = '3ncr7pt10nk37';

router.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

router.post('/v1/user/auth',function(req,res,next){
    console.log('Using post function form the router');
    if(req.body.user != undefined && req.body.pwd != undefined){
        var signedBody = {'status':'ok','token':jwt.sign(req.body, privateKey,{
            expiresIn: 100,
            subject: req.body.user
        })};
        res.status(200).send(signedBody);
    }else{
        console.log('The error is being processed');
        res.set('Content-Type', 'application/json');
        res.status(400).send("{'error':'you need to provide the user and its password'}");
    }
})



router.get('/v1/user/validate', function(req , res){
    console.log('Using get function form the router');
    var decryptedKey;
    res.set('Content-Type', 'application/json');
    jwt.verify(req.headers.token,privateKey,{
        ignoreExpiration: false
    },function(err, decrypt){
        var error = {};
        if(err){
            console.log(err);
            if(err.message == 'jwt expired'){
                error.status = 'err';
                error.msg= 'timeout log in again';
                res.status(401).send(error);
            }else{
                error.status = 'err';
                error.msg= 'Unauthorized request';
                res.status(401).send(error);
            }
        }
        decryptedKey = decrypt;
    });
    if(decryptedKey.user != undefined && decryptedKey.pwd != undefined){
        res.status(200).send('This is a response from express js ');
    }
});

//binding the router to the express app 
app.use('/', router)

app.get('/test',function(req,res){
    console.log('this one is not getting the router involved')
    res.status(200);
})

app.listen(8081, function(){

});