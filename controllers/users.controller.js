const { json } = require ('express');
const userModel = require('../Models/users.models');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.getUsers = async(req, res)=> {
    try {
        let usuario = req.usuario
        let dataUsers = await userModel.find()
        res.json(dataUsers)
    } catch (error) {
        console.log(error);
        res.send({error:"Información restringida"})
               
    }
}
exports.getOneUser = async (req, res)=> {
    try {
        const id = req.params.id
        let user = await userModel.findOne({_id: id})
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(400).send({error: "Usuario no registrado"})
        }
    } catch (error) {
        res.status(404).send({error:"No fue posible atender la solicitud, porfavor confirma la información introducida"})
    }

//     try {
//         let id = req.params.id
//         if (id.length == 24) {
//             let product = await productmodels.findOne({_id: id})
//             if (product) {
//                 res.json(product)
//             } else {
//                 res.send({error: "No se encuentra ningun producto"})
//             }
//         } else {
//             res.send({error: "Id incorrecto"})
//         }
// }
}
exports.addUsers = async(req, res)=> {
    try {
        let data = req.body
        let nuevoUsuario = new userModel(data)
        let creado = await nuevoUsuario.save()
        res.status(200).json(creado)
       
    } catch (error) {
        console.log(error);
        res.status(400).send({error:"Necesitas ayuda? contactanos"})
                
    }
}
exports.deleteUser = async(req, res)=> {
    try {
        let id = req.params.id
        if (id.length == 24) {
            let user = await userModel.findById(id)
            if (user) {
                let deleteUser = await userModel.findOneAndDelete({_id: id})
                res.json(deleteUser)

            } else {
                res.send({error:"El usuario que intentas eliminar no se encuentra en la base de datos"})
            }

        } else {
            res.send({error:"ID incorrecto"})
        }
       
        
    } catch (error) {
        console.log(error);
        res.send({error:"Error"})
        
    }
}
exports.updateUser = async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;

        let user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        Object.assign(user, data);

        let updatedUser = await user.save();

        res.status(200).json(updatedUser);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Ha ocurrido un error al intentar actualizar la información del usuario" });
    }
}
exports.inicioDeSesion = async (req, res)=> {
    try {
        let data = req.body;
        let user = await userModel.findOne({ correo: data.correo });
    
        if (!user) return res.status(404).send({ msg:'Usuario no existe'});
    
        console.log(user);
        const isMatch = await bcrypt.compare(data.contrasena, user.contrasena);
        console.log(isMatch);
    
        if (!isMatch) return res.status(401).json({ msg: 'Contraseña incorrecta' });
    
        let payload = {
            id: user._id,
            nombre: user.correo,
        };
    
        let SECRET_KEY_JWT = process.env.JWT_SECRET;
        let token = jwt.sign(payload, SECRET_KEY_JWT, { expiresIn: '24h' });
    
        res.status(200).json({ token: token, roll: user.roll });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Ha ocurrido algo, comunícate con el administrador" });
    }
    
}