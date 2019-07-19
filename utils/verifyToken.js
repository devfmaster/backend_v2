const jwt =  require('jsonwebtoken')
const AuthorModel =  require('../models/Author')
const ClienteModel =  require('../models/Cliente')

const verifyToken = async (req) => {
	const Authorization =  req.get('Authorization')
	if(!Authorization){
		return req
	} else{
		const  formatedToken =  Authorization.replace('JWT ',"");
		const payload =  jwt.verify(formatedToken, process.env.SECRET_KEY)
		if(!payload) 		return req
		
		let user =  await AuthorModel.findOne({_id:payload._id})	
		if(!user) { 
			user =  await ClienteModel.findOne({_id:payload._id})	 // aca eliminamos el 'let' 
				  if(!user)	return req
				}
				  
		return {...req,user}   

		
		//const  formatedToken =  Authorization.replace('JWT ',"");
		//const payload =  jwt.verify(formatedToken, process.env.SECRET_KEY)
		//if(!payload) 		return req
		// VERIFICAR TIPO
		//const user =  await AuthorModel.findOne({_id:payload._id})	
		//if(!user)  return req;
		//return {...req,user}   
			
		
	}
}



module.exports = verifyToken;
	