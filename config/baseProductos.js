const mongoose = require('mongoose');
require('dotenv').config();
const conectDb = async () => {
    try {
        let mongoUrl = process.env.db_mongo
        await mongoose.connect(mongoUrl)
        console.log("Se ha conectado con la base de datos exitosamente");
        
    } catch (error) { 
        console.log(error);
        console.log("No se ha logrado conectar con la base de datos"); 
    }
};
module.exports = conectDb;
