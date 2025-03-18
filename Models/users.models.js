const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const userModel = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    contrasena: {
        type: String,
        required: true
    },
    roll: {
        type: String,
        required: true
    }
},{
    versionKey: false
}
)

userModel.pre('save', async function (next) {
    // Verifica si la contraseña ya está cifrada
    if (!this.isModified('contrasena')) return next();

    try {
        const saltRounds = 10; // Número de rondas de cifrado
        const hashedPassword = await bcrypt.hash(this.contrasena, saltRounds);
        this.contrasena = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});



module.exports = mongoose.model('users', userModel)

/*
{
"nombre":"",
"apellidos": "",
"correo": "",
"contrasena": "",
"roll": ""
}
*/