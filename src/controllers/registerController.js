import HttpStatus from 'http-status-codes'; 
import bcrypt from 'bcrypt'; 
import { generateKeyPair } from '../utils/rsaCrypt.js';
import { createUser } from '../models/User.js';

export const registerUser = async (req, res) => {

    try {
        const { fullname, username, email, password } = req.body

        // generateKey
        const { publicKey, privateKey } = generateKeyPair()
        console.log('Generated Public Key:', publicKey)
        console.log('Generated Private Key:', privateKey)

        //Bcrypt hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = {
            fullname: fullname,
            username: username,
            email: email,
            password: hashedPassword,
            rsa_public_key: publicKey,
            rsa_private_key: privateKey
        }

        // Thêm user vào database
        const user = await createUser(newUser)

        if (user) {
            return res.status(HttpStatus.CREATED).json({ message: 'Register Successfully!', success: true })
        } else {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'User creation failed!', success: false })
        }

    } catch (err) {
        console.log(err)
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message, success: false })
    }

}