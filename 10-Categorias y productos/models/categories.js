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
    const  { __v, status, ...data} = this.toObject(); 
    return data;
}
const Category = model('Category',CategoryesSchema);
export
{
    Category
}