import { Schema,model } from "mongoose";

const CategoryesSchema = Schema({
    name: {
        type: String,
        required: [true,'Name Obligatory'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    strictPopulate: false
})

CategoryesSchema.methods.toJSON = function() {
    const  { __v, _id, status, ...data} = this.toObject(); 
     // Cambia visualmente el campo '_id' por 'uid'
     Category.uid = _id;   
    return data;
}
const Category = model('Category',CategoryesSchema);
export
{
    Category
}