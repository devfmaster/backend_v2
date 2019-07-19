const mongoose =  require('mongoose');

const Schema =  mongoose.Schema


const ReservaSchema =  new Schema({

	cliente:{                             // 071819
		type:Schema.Types.ObjectId,
		ref:'clientes'
	},
	post:{                                // 071819
		type:Schema.Types.ObjectId,
		ref:'posts'
	},

	fecha_entrada:{
		type:Date
	},

	fecha_salida:{
		type:Date
	},

	costo:{
		type:Intl
	},

	is_active:{
		type:Boolean,
		default:true,
	}
}, { collection:"reservas", timestamps:true } )

module.exports = mongoose.model('reservas',ReservaSchema);