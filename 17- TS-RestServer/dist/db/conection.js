"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DB = process.env.DB;
const USER = process.env.USER;
const PASS = process.env.PASS;
const db = new sequelize_1.Sequelize(DB || '', USER || '', PASS || '', {
    host: "localhost",
    dialect: 'mariadb',
    // login: false
});
exports.default = db;
//# sourceMappingURL=conection.js.map