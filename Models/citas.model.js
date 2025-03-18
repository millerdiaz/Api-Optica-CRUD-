const mongoose =  require ('mongoose');
const citasModel = mongoose.Schema({
    nombres : {
        type: String,
        required :true
    },
    apellidos:{
        type: String,
        required :true
    },
    contacto :{
        type: Number,
        required :true
    },
    email:{
        type:String,
        required:true
    },
    sede : {
        type: String,
        required :true
    },
    fecha :{
        type: Date,
        required :true
    },
    horario : {
        type:String ,
        required :true
    },
    motivoConsulta :{
        type: String,
        required :true
    },
})
module.exports = mongoose.model('cita',citasModel);
