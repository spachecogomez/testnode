const express = require('express')
var bodyParser = require('body-parser');
var jwtHelper = require('./JWTHelper');
const app = express()
const router = express.Router()
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var privateKey = '3ncr7pt10nk37';

router.use(function (req, res, next) {
  next()
})

router.post('/v1/user/auth',function(req,res,next){
    //console.log('Using post function form the router');
    if(req.body.user != undefined && req.body.pwd != undefined){
        var signedBody = {'status':'ok','token':jwtHelper.generateToken(req.body,privateKey)};
        res.status(200);
        res.send(signedBody);
    }else{
        console.log('The error is being processed');
        res.set('Content-Type', 'application/json');
        res.status(400);
        res.end("{'error':'you need to provide the user and its password'}");
    }
})



router.get('/v1/user/validate', function(req , res){
    //console.log('Using get function form the router');
    var decryptedKey;
    //res.set('Content-Type', 'application/json');
    decryptedKey = jwtHelper.validateToken(req.headers.token,privateKey);
    console.log('Response from the helper: '+decryptedKey);
    console.log('Response from the helper: '+decryptedKey.user);
    if(decryptedKey != undefined ){
        if(decryptedKey.user != undefined ){
            res.status(200);
            res.end('This is a response from express js ');
        }
        res.status(400)
        res.end('{"status":"error","message":'+decryptedKey+'}');
    }
    res.status(500);
    res.end();
});

//binding the router to the express app 
app.use('/', router)

app.get('/test',function(req,res){
    console.log('this one is not getting the router involved')
    res.status(200);
})

app.listen(8081, function(){

});