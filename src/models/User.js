import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rsaPublicKey: {
        type: String,
        required: true
    },
    rsaPrivateKey: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export const User = mongoose.model('User', UserSchema);

// Find user by email or username
export async function findUserByEmailOrUsername(identity) {
    try {
        const user = await User.findOne({
            $or: [
                { email: identity },
                { username: identity }
            ]
        });

        return user;
    } catch (error) {
        console.error("Error finding email or username:", error.message);
        throw error;
    }
};

// Register user
export async function createUser(data){
    try {
        const user = await User.create(data)
        return user;
        
    } catch (error) {
        throw new Error(error.message);
    }
}