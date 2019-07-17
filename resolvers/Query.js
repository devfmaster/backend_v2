const AuthorModel =  require('../models/Author');
const PostModel =  require('../models/Post');
const ClienteModel =  require('../models/Cliente');
const ReservaModel =  require('../models/Reserva');

const listAuthors =  async(root,params,context,info) => {
	const authors = await AuthorModel.find({is_active:true}).populate('posts');
	console.log(authors);
	return authors
}

const listClientes =  async(root,params,context,info) => {                               // nuevo
	const clientes = await ClienteModel.find({is_active:true}).populate('reservas');
	console.log(clientes);
	return clientes
}


const singleAuthor  =  async(root,params,context,info) => {
    // console.log("params",params.id);
	const author =  await AuthorModel.findById(params.id).populate('posts');
	if (!author) throw new Error("Author no existe");
	return author.toObject();
}

const singleCliente  =  async(root,params,context,info) => {                             // nuevo
    // console.log("params",params.id);
	const cliente =  await ClienteModel.findById(params.id).populate('reservas');
	if (!cliente) throw new Error("Cliente no existe");
	return cliente.toObject();
}


const listPosts =  async(root, params, context, info) => {
	const posts =  await PostModel.find({is_active:true}).populate('author');
	return posts
}


const listReservas =  async(root, params, context, info) => {                           // nuevo
	const reservas =  await ReservaModel.find({is_active:true}).populate('cliente');
	return reservas
}


const singlePost = async(root,params, context, info) => {
	const post = await PostModel.findById(params.id).populate('author');
	if(!post) throw new Error("Post no existe")
	return post.toObject();
}

const singleReserva = async(root,params, context, info) => {                           // nuevo
	const reserva = await ReservaModel.findById(params.id).populate('cliente');
	if(!reserva) throw new Error("Reserva no existe")
	return reserva.toObject();
}



module.exports = {
	listAuthors,
	singleAuthor,
	listPosts,
	singlePost,
	listClientes,
	singleCliente,
	listReservas,
	singleReserva
}