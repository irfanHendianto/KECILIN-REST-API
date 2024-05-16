// seeder.js
import mongoose from 'mongoose';
import { UsersModel} from '../models/user';
import { ConnectOptions } from 'mongoose';
import config from './config';
import { hashPassword } from '../helpers/utility';

// Data pengguna awal
const users = {
    name: 'test', 
    email: 'user1@example.com',
    age: 20,
    role: 'Admin',
    gender: 'Admin',
    password: 'password'
}

const seedUsers = async () => {
  try {
    await UsersModel.deleteMany({});
    console.log("Seeder Berjalan")
    users.password = hashPassword(users.password);
    await UsersModel.create(users); 
  } catch (error) {
    console.error('Seeder: Gagal menyisipkan data pengguna:', error);
    process.exit(1); 
  }
};

const closeConnectionAndExit = async () => {
    try {
      await mongoose.connection.close(); 
      console.log('MongoDB connection closed');
      process.exit(0);
    } catch (error) {
      console.error('Error closing MongoDB connection:', error);
      process.exit(1);
    }
  };
  


mongoose.connect(config.MONGGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions)
    .then(async () => {
        console.log('MongoDB connected');
        await seedUsers(); 
    }).then(async () => {
        await closeConnectionAndExit(); 
    }).then(()=> console.log("success"))
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1); 
    });