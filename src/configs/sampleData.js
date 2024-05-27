import { User } from "../models/User.js";
import mongoose from "mongoose";

const sampleUsers = [
    {
        fullname: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        password: 'hashedpassword123',
        rsaPublicKey: 'samplePublicKey1',
        rsaPrivateKey: 'samplePrivateKey1'
    },
    {
        fullname: 'Jane Smith',
        username: 'janesmith',
        email: 'jane@example.com',
        password: 'hashedpassword456',
        rsaPublicKey: 'samplePublicKey2',
        rsaPrivateKey: 'samplePrivateKey2'
    }
    // Add more sample users as needed
];

// Function to import sample data
export async function importSampleData() {
    try {
        await User.insertMany(sampleUsers);
        console.log('Sample data imported successfully');
        mongoose.disconnect(); // Disconnect from MongoDB
    } catch (err) {
        console.error('Error importing sample data:', err);
        mongoose.disconnect(); // Disconnect from MongoDB
    }
}

