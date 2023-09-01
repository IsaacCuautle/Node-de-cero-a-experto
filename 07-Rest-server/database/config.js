import  {mongoose,  Error } from "mongoose";

const dbConection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        mongoose.Promise = global.Promise;

        console.log('DB en linea');

    } catch (error) {
        console.log(error);
       throw new Error('')
    }
}

export
{
    dbConection
}