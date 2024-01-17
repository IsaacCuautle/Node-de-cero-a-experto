import { Sequelize } from "sequelize";

const DB = process.env.DB
const USER = process.env.USER
const PASS = process.env.PASS

const db = new Sequelize(DB || '',USER || '',PASS ||'',{
    host: "localhost",
    dialect: 'mariadb',
    // login: false
})

export default db