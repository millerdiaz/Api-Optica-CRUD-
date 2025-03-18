const userModels = require("../controllers");

exports.login = async (req, res) => {
    try {
        let infoUser = req.body
        let user = await userModels.findOne({email: inforUser.email})
        
        if(user) {
            let clave = infoUser.contraseña
            if(user.password == contraseña){
                
                res.status(200).send({msj:"Ingreso correcto"})
            } else{
                res.status(400).send({msj:"Información invalida"})
            }
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({error:"Información invalida"})
        
    }
}