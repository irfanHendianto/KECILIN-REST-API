import mongoose from 'mongoose';
import config from './config';
import { ConnectOptions } from 'mongoose';


const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions); 
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

export default connectDB;
