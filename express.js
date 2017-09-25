const express = require('express')
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
const app = express()
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var privateKey = '3ncr7pt10nk37';


app.get('/v1/user/validate', function(req , res){
    var decryptedKey;
    jwt.verify(req.headers.token,privateKey,{
        ignoreExpiration: false
    },function(err, decrypt){
        if(err){
            console.log(err);
            if(err.message == 'jwt expired'){
                res.status(401).send('{"status":"err", "msg":"timeout log in again"}');
            }else{
                res.status(401).send('{"status":"err", "msg":"Unauthorized request"}');
            }
        }
        decryptedKey = decrypt;
    });
    console.log("Decrypted key:"+decryptedKey);
    if(decryptedKey.user != undefined && decryptedKey.pwd != undefined){
        res.status(200).send('This is a response from express js ');
    }
});

app.post('/v1/user/auth', function(req, res){
    console.log("started the authentication process.");
    console.log("Requested user:"+req.body.user);
    console.log("Requested pwd:"+req.body.pwd);
    if(req.body.user != undefined && req.body.pwd != undefined){
        var signedBody = {"status":"ok","token":jwt.sign(req.body, privateKey,{
            expiresIn: 100,
            subject: req.body.user
        })};
        res.status(200).send(signedBody);
    }else{
        console.log('The error is being processed');
        res.status(400).send('{"error":"you need to provide the user and its password"}');
    }
});

app.listen(8081, function(){
    console.log('Express server started');
});