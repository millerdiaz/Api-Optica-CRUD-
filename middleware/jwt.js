const jwt = require('jsonwebtoken')// aqui requerimos la dependencia
require('dotenv').config()  // para poder traer la conntraseña JWT_SECRET

// ahora vamos a exportar y generar la funcion
exports.verificacionToken = async (req,res,next) => {
    try {
        let JWT_SECRET = process.env.JWT_SECRET // requerimos la llave
        let token = req.headers.authorization // aqui conectamos con el metodo en postman
        token = token.split(' ')[1]
        console.log(token);// split separa el bearer del token al requerir el token que esta en la posicion 1
        jwt.verify(token, JWT_SECRET, (error,decoded)=>{
            if (error) {
                res.status(400).send({error:"Token invalido"})
            }else{
                next()
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({error:"Ha ocurrido algo comunicate con el admin"})
    }      
}
