import { NOT_FOUND, OK, INTERNAL_SERVER_ERROR, UNAUTHORIZED } from 'http-status-codes';
import { findUserByEmailOrUsername } from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
    try {
        const { emailOrUsername, password } = req.body;

        // Find user by email or username
        const user = await findUserByEmailOrUsername(emailOrUsername);

        // If user not found, return 404
        if (!user) {
            return res.status(NOT_FOUND).json({ message: 'User not found', success: false });
        }

        // Compare provided password with stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If password is incorrect, return 401
        if (!isPasswordValid) {
            return res.status(UNAUTHORIZED).json({ message: 'Wrong password', success: false });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Set token in httpOnly cookie
        res.cookie('token', token, { httpOnly: true });

        // Return success response without sensitive information
        const { password, rsaPrivateKey, rsaPublicKey, ...userDisplay } = user._doc;

        return res.status(OK).json({
            message: 'Login successful',
            success: true,
            token: token,
            user: userDisplay,
        });

    } catch (error) {
        console.error(error);
        return res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};
