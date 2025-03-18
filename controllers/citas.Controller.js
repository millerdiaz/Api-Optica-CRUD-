const citasModel = require("../Models/citas.model")
const enviarCorreoConfirmacion = require("../config/mailer")
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.addCita = async (req, res) => {
    try {
        let citas = req.body;
        let { contacto, sede, fecha, horario, email  } = citas;

        // Convertir fecha y hora a objeto Date para mayor precisión
        let fechaHoraCita = new Date(`${fecha}T${horario}`);

        // Buscar si ya existe una cita en la misma sede, fecha y hora
        let citaExistente = await citasModel.findOne({
            sede: sede,
            fecha: fecha,
            horario: horario,
        });

        if (citaExistente) {
            return res.status(409).json({ error: "La hora seleccionada ya está ocupada para esta sede." });
        }

        // Verificar si el contacto ya tiene una cita registrada
        let buscarCita = await citasModel.findOne({ email: email });
        if (buscarCita) {
            return res.status(409).json({ error: "Ya tienes una cita registrada con este correo." });
        }

        // Crear nueva cita si no hay conflictos
        let newCita = new citasModel(citas);
        await newCita.save();

        // Enviar correo de confirmación
        enviarCorreoConfirmacion(citas.email, newCita);
        res.status(201).json(newCita);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Se ha generado un error"});
    }
};


