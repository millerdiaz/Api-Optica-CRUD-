require('dotenv').config();
const express =  require('express');
const app = express();
app.use(express.json());
const router = require('./routes/router');
const conectDb = require('./config/baseProductos');
let PORT = process.env.PORT;
const cors = require("cors")
app.use(cors());
app.use('/api',router);
conectDb();


app.listen(PORT||2000,()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
