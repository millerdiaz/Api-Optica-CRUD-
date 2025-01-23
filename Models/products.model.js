const mongoose =  require ('mongoose');
const productModel = mongoose.Schema({
    marca : {
    type: String,
    required :true
    },
    modelo :{
        type: String,
        required :true
    },
    img:{
        type :String,
        required:true
    },
    precio :{
        type: String,
        required :true
    },
    genero :{
        type:String,
        required :true
    },
    descripcion:{
        type:String,
        required :true
    },
    disponibilidad:{
        type:Boolean,
        required : true
    },
    descuento: {
        type: Number,
        default: 0
    }
    // ,
    // email: {
    //     type: String,
    //     required :true
    // },
    // password: {
    //     type: String,
    //     required:true
    // }    
},
{
timestamps: true,
versionKey:false
});
 
module.exports = mongoose.model('producto',productModel);
/*
{
    "marca" : "Diesel",
    "modelo": "KDF",
    "img": ""
    "precio": 350000,
    "genero" : "Masculino",
    "descripcion": "Gafas de sol",
    "disponibilidad":true,
    "email": gola@hotmail.com,
    "password":"clave123"
}
    */


