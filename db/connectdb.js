import mongoose from 'mongoose';
const connectDB = async(DATABASE_URL) => {
    try {
        const DB_OPTIONS = { dbname: 'registration-form', }
        await mongoose.connect(DATABASE_URL, DB_OPTIONS);
        console.log("connected to database");
    } catch (error) {
        console.log(`not connected to database ${error}`);
    }
}

export default connectDB