const productsModel = require("../Models/products.model")
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.allProducts = async (req,res) => {
    try {
        let modelo = req.params.modelo
        if (modelo) {
            let data = await productsModel.find({modelo:{$regex:modelo,$options:'i'}})
            res.status(200).json(data);
        }else{
            let dataProducts = await productsModel.find();
            res.status(200).json(dataProducts);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Se ha generado un error, comunícate con tu administrador" });
    }
};

exports.marca = async (req,res) => {
    try {
        let marca = req.params.marca
        if (marca) {
            let data = await productsModel.find({marca:{$regex:marca,$options:'i'}})
            res.status(200).json(data);
        }else{
            let dataProducts = await productsModel.find();
            res.status(200).json(dataProducts);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Se ha generado un error, comunícate con tu administrador" });
    }
};





exports.getOneProduct = async (req,res)=>{
    try {
        const id = req.params.id
        if (id.length === 24) {
            let producto = await productsModel.findById(id);
            if (producto) {
                res.status(200).json(producto);
            } else {
                res.status(404).json({ error: "Producto no encontrado en la base de datos" });
            }
        } else {
            res.status(400).json({ error: "El ID no cumple con la longitud de 24 caracteres" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Se ha generado un error, comunícate con tu administrador" });
    }
};

exports.add = async (req,res) => {
    try {
        let product = req.body
        let modelo = product.modelo
        let buscarProducto = await productsModel.findOne({modelo:modelo})
        if (!buscarProducto) {
            let newProduct = new productsModel(product)
            await newProduct.save()
            res.status(201).json(newProduct);
        } else {
            res.status(409).json({ error: "El producto ya existe en la base de datos" });
        }         
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Se ha generado un error, comunícate con tu administrador" });
    }
};

exports.deleteProduct = async (req,res) => {
    try {
        let id = req.params.id
        let product = await productsModel.findById(id)

        if (product) {
            const deleteProduct = await productsModel.findByIdAndDelete({_id:id})
            res.status(200).json(deleteProduct);

        } else {
            res.status(404).json({ error: "Producto no encontrado en la base de datos" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Se ha generado un error, comunícate con tu administrador" });
    }
};

exports.modify = async (req,res) => {
    let id = req.params.id
    const update = req.body;  

    if (id.length === 24) {
        let product = await productsModel.findById(id);
        if (product) {
            const existingProduct = await productsModel.findOne({ modelo: update.modelo, _id: { $ne: id } });
            if (existingProduct) {
                res.status(409).json({ error: "Ya existe un producto con ese nombre" });
            }
            else{
                Object.assign(product,update)
                let updateProduct = await productsModel.updateOne({_id:id},product);
                res.status(200).json(updateProduct);
            }
        }
    } 
};
// exports.login = async (req, res) => {
//     try {
//         let data = req.body //capturar la informacion del usuario

//         let user = await productsModel.findOne({email: data.email})
//         // aqui se busca la informacion con el email

//         if (user) { 					// Si el correo existe entra al if
//             if (user.password === data.password) {
//                     // res.send("Logueado") // esto se hace antes para ver que si este funcionando el if
//                 let payload = {
//                     id: user._id,
//                     nombre: `${user.marca}${user.modelo}`
//                 }// esta es la informacion que voy a encriptar
//                 let JWT_SECRET = process.env.JWT_SECRET // aqui llamamos la clave del .env
//                 let token = jwt.sign(payload,JWT_SECRET,{expiresIn:'24h'} )
//                 // se declara el token y se le da el payload, la clave, y la expiracion del token
//                 res.status(200).send(token)


//             }else{
//                 res.status(500).send({error:"Credenciales invalidas (clave)"})
//             }
//         }else{
//             res.status(500).send({error:"Credenciales invalidas(correo)"})
//         }  
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({error:"Ha ocurrido algo comunicate con el admin"})
//     }
// }


