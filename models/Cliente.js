const mongoose  =  require('mongoose');
const bcrypt =  require('bcrypt');

const Schema =  mongoose.Schema;


const ClienteSchema = new Schema({

	first_name:{
		type:String,
		required:true
	},
	last_name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true,
		unique:true
	},
	password:{
		type:String,
		required:true
	},

	birth_date:{
		type:Date
	},
	gender:{
		type:String,
		enum:["H","M","O"]
	},
	reserva:{
		type:[Schema.Types.ObjectId],
		ref:'reservas'
	},
	profile_picture:{
		type:String
	},
	is_active:{
		type:Boolean,
		default:true
	}

}, {collection:"clientes",timestamps:true} );

ClienteSchema.pre('save',function(next){
	const cliente =  this;
	const SALT_FACTOR =  10
	if(!cliente.isModified("password")) {return next()}
	bcrypt.genSalt(SALT_FACTOR,function(err,salt){
		if(err) return next(err);

		bcrypt.hash(cliente.password,salt,function(err,hash){
			if(err) return next(err);
			cliente.password =  hash;
			next();
		})
	})

});

module.exports =  mongoose.model('clientes',ClienteSchema);