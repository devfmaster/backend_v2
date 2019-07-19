const AuthorModel =  require('../models/Author');
const PostModel = require('../models/Post');
const ClienteModel =  require('../models/Cliente');                     // nuevo
const ReservaModel =  require('../models/Reserva');                     // nuevo
const authenticate =  require('../utils/authenticate');
//const authenticateCliente =  require('../utils/authenticateCliente');   // nuevo
const storage =  require('../utils/storage');


const createAuthor =  async(root,params,context,info) => {

	const newAuthor =  await AuthorModel.create(params.data)
							.catch( e => {throw new Error("Ocurrio un problema") } )
	if(!newAuthor) throw new Error("No se creo el 'author'");
	return newAuthor.toObject();
}

const createCliente =  async(root,params,context,info) => {                     // nuevo

	const newCliente =  await ClienteModel.create(params.data)
							.catch( e => {throw new Error("Ocurrio un problema") } )
	if(!newCliente) throw new Error("No se creo el 'author'");
	return newCliente.toObject();
}

const login =  async(root,params,context,info) => {
	const token =  await authenticate(params).catch( e => { throw e } )
	return {
		token,
		params,
		message:"Ok"
	}
}

//const loginCliente =  async(root,params,context,info) => {                      // nuevo
//	const token =  await authenticateCliente(params).catch( e => { throw e } )
//	return {
//		token,
//		message:"Ok"
//	}
//}

const updateProfile = async(root,params,context,info) => {
//console.log(context);
	const {data} = params
	const {user} =  context
	let Author = await AuthorModel.findById(user._id)            // aca hicimos cambio de const a let
	if(!Author) {
		Author = await ClienteModel.findById(user._id)
		if(!Author) throw new Error(" Autor No Existe")
	} 
	//	console.log(Author);
	Object.keys(data).map( key => Author[key] = data[key])
	const updatedAuthor = await Author.save({new:true})
	return updatedAuthor.toObject();
}



const deleteProfile =  async(root,params,context,info) => {

	const {user} =  context;
	let author = await AuthorModel.findById(user._id);           // 180719  que procese los 2 modelos 
	if(!Author) {
		Author = await ClienteModel.findById(user._id)
		if(!Author) throw new Error(" Autor No Existe")
	} 
	cliente.is_active = false;
	await author.save({new:true})

	return "Usuario eliminado"
}

const createPost = async(root,params,context,info) =>{

	const {user} = context;
	params.data.author = user
	if(params.data.cover_photo){                                   //verifica si trae urlfoto el post
		const { createReadStream } = await params.data.cover_photo;
		const stream =  createReadStream();
		const { url } =  await storage({ stream });

		params.data.cover_photo =  url;
	} 
	const post = await PostModel.create(params.data)
								.catch( e => {throw new Error("Error al crear post")} )
	const newPost = await PostModel.findOne({_id:post._id}).populate('author');
	await AuthorModel.findByIdAndUpdate(user.id,{$push:{posts:post}})
	return newPost;
}


const createReserva = async(root,params,context,info) =>{                      // nuevo
        //  como seleccionar una casa
	
	const reserva = await ReservaModel.create(params.data)                     //param lo toma del input
								.catch( e => {throw new Error("Error al crear reserva")} )
	const newReserva = await ReservaModel.findOne({_id:reserva._id}).populate('cliente');
	await ReservaModel.findByIdAndUpdate(user.id,{$push:{reservas:reserva}})
	return newReserva;
}


const updatePost = async(root,params,context,info) => {

	const {id,data} = params;
	const {user} = context;
	const updatedPost = await PostModel.findOneAndUpdate({_id:id,author:user._id},{$set:{...data}},{new:true})
	return updatedPost.toObject();
}


const updateReserva = async(root,params,context,info) => {                   // nuevo

	const {id,data} = params;
	const {user} = context;
	const updatedReserva = await ReservaModel.findOneAndUpdate({_id:id,author:user._id},{$set:{...data}},{new:true})
	return updatedReserva.toObject();
}

const deletePost = async(root,params,context,info) => {
    
	const {id} = params;
	const {user} = context;
	await PostModel.findOneAndUpdate({_id:id,author:user._id},{$set:{is_active:false}})
	return "Post eliminado"
}

const deleteReserva = async(root,params,context,info) => {                   // nuevo
    
	const {id} = params;
	const {user} = context;
	await ReservaModel.findOneAndUpdate({_id:id,cliente:user._id},{$set:{is_active:false}})
	return "Reserva eliminada"
}



const deleteAllpost = async(root,params,context,info) => {                   // nuevo nuevo
	const {id} = params;
	const {user} = context;
	await  PostModel.findByIdAndUpdate({_id:id,author:user._id},{$set:{is_active:false}})

	return "Todos los post eliminados"
} 
 

module.exports = {
	createAuthor,                                      // input createAuthorInput
	login, 
	//loginCliente,                                                                                     
	updateProfile,                                     // input  updateAuthorInput
	deleteProfile,
	createPost,                                        // input createPostAuthor
	updatePost,                                        // input updatePostAuthor
	deletePost,
	deleteAllpost,               // nuevo nuevo
	createCliente,               // nuevo              // input createClienteInput
	createReserva,               // nuevo              // input createReservaCliente
	updateReserva,               // nuevo              // input updateReservaCliente
	deleteReserva                // nuevo

}