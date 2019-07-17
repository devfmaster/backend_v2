const bcrypt = require('bcrypt');
const ClienteModel = require('../models/Cliente')                        // nuevo
const createToken =  require('./createToken');

const authenticateCliente =  ({ email, password }) => {                   // nuevo
	return new Promise((resolve,reject) => {

		ClienteModel.findOne({email}).then((user) => {
			if(!user) reject(new Error("Usuario no existe"))

			bcrypt.compare(password,user.password,(err,isValid) => {
				if(err) reject(new Error("Error al crear el Token "))
			
				isValid ? resolve(createToken(user)) : reject("Password no coinciden")
			})
		}).catch(e  => reject(e) );
	})
}

module.exports =  authenticateCliente;