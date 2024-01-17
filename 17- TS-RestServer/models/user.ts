import { DataTypes } from "sequelize";
import db from "../db/conection";

const User:any = db.define('usuarios',{
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.TINYINT
    }
});

export default User;