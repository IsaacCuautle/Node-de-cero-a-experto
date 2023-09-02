import {model,Schema} from "mongoose";

const UserSchema = Schema({
    name: {
        type: String,
        required: [true,'El nombre es obligatorio'],
    },
    email: {
        type: String,
        required: [true,'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'El password es obligatorio'],
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: [true,'El password es obligatorio'],
        enum: ['ADMIN_ROLE','USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },

    
    
})

UserSchema.methods.toJSON = function() {
    const  { __v, password, _id, ...user} = this.toObject();

    // Cambia visualmente el campo '_id' por 'uid'
    user.uid = _id;
    
    return user;
}

const User = model('User',UserSchema)

export 
{
    User
}