import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config({path: '.env'})



const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS ?? '', {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    define: {
        timestamps: true // Para colocar al campo la fecha que se creo y la fecha de modificación
    },
    pool: { // si hay un conexión establecida la mantenga y no cree una nueva
        max: 5, // maximo de número de conexiones que puede tener un usuario
        min: 0, // minimo de número de conexiones que puede tener un usuario, si no se están usando libera conexiones
        acquire: 30000, // 30seg intentando hacer una conexión antes de dar un error
        idle: 10000 // 10seg si todo está tranquilo la conexión finaliza
    },
    operatorAliases: false
});

export default db