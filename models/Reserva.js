const mongoose =  require('mongoose');

const Schema =  mongoose.Schema


const ReservaSchema =  new Schema({

	fecha_reserva:{
		type:Date
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