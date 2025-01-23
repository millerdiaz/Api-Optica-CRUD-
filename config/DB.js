const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async ()=> {
    try {
        let mongoURI = process.env.DB_MONGO
        await mongoose.connect(mongoURI)
        console.log("Conectado a la base de datos");
        
    } catch (error) {
        console.log(error);
        console.log("No se pudo conectar a la base de datos!");
        
    }
}

module.exports = connectDB