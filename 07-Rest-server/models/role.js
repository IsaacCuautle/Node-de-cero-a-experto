import { Schema,model } from "mongoose";

const RoleSchema = Schema({
    role: {
        type: String,
        required: [true,'Role no valido']
    }
})
const Role = model('Role',RoleSchema);

export
{
    Role
}