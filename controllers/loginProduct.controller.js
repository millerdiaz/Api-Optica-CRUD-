const productsModel = require("../Models/products.model")
const jwt = require('jsonwebtoken')
require('dotenv').config()


exports.login = async (req, res) => {
    try {
        let data = req.body //capturar la informacion del usuario

        let user = await productsModel.findOne({email: data.email})
        // aqui se busca la informacion con el email

        if (user) { 					// Si el correo existe entra al if
            if (user.password === data.password) {
                    // res.send("Logueado") // esto se hace antes para ver que si este funcionando el if
                let payload = {
                    id: user._id,
                    nombre: `${user.marca}${user.modelo}`
                }// esta es la informacion que voy a encriptar
                let JWT_SECRET = process.env.JWT_SECRET // aqui llamamos la clave del .env
                let token = jwt.sign(payload,JWT_SECRET,{expiresIn:'24h'} )
                // se declara el token y se le da el payload, la clave, y la expiracion del token
                res.status(200).send(token)


            }else{
                res.status(500).send({error:"Credenciales invalidas (clave)"})
            }
        }else{
            res.status(500).send({error:"Credenciales invalidas(correo)"})
        }  
    } catch (error) {
        console.log(error.message);
        res.status(500).send({error:"Ha ocurrido algo comunicate con el admin"})
    }
}