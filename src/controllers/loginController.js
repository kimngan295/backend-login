import { NOT_FOUND, OK, INTERNAL_SERVER_ERROR, CONFLICT } from 'http-status-codes';
import { findUserByEmailOrUsername } from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const loginUser = async (req, res) => {
    try {
        const { emailOrUsername, password } = req.body
        const user = await findUserByEmailOrUsername(emailOrUsername)
        console.log(user)

        if (!user) {
            return res.status(NOT_FOUND).json({ message: 'User not found', success: false })
        }

        // const encryptedPassword = encryptWithRSA(user.rsaPublicKey, password)
        // const decryptedPassword = decryptWithRSA(user.rsaPrivateKey, encryptedPassword)

        /* const result = compare(decryptedPassword, user.password)*/

        // const result = bcrypt.compare(password, user.password)
        // console.log(password + ' ' + user.password)
        // console.log(result)
        if (password != user.password) {
            return res.status(CONFLICT).json({ message: 'Wrong password', success: false })
        } else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            res.cookie('token', token, { httpOnly: true });

            const userDisplay = { ...user, rsaPrivateKey: user.rsaPrivateKey, rsaPublicKey: user.rsaPublicKey }

            return res.status(OK).json({
                message: 'Login successful',
                success: true,
                token: token,
                user: userDisplay
            })
        }

    } catch (error) {
        console.error(error);
        return res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' })
    }
}