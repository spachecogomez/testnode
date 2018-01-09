var jwt = require('jsonwebtoken');
module.exports = {
	generateToken:function(customObjectToCipher,privateKey){

		if(customObjectToCipher != null && privateKey != null){
			return jwt.sign(customObjectToCipher, privateKey,{
				expiresIn: 100,
				subject: customObjectToCipher.user
			});
		}
	},
	validateToken:function(token,privateKey){
		var decryptedKey;
		jwt.verify(token,privateKey,{
			ignoreExpiration: false
		},function(err, decrypt){
			var error = {};
			if(err){
				console.log(err);
				if(err.message == 'jwt expired'){
					return 'token expired';
				}else{
					return 'unathorized request';
				}
			}
			decryptedKey =  decrypt;
		});
		return decryptedKey;
	}
}