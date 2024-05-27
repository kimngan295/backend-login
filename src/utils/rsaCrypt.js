import { generateKeyPairSync, publicEncrypt, constants, privateDecrypt } from 'crypto';

export const generateKeyPair = () => {
    return generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    })
}

export const encryptWithRSA = (publicKey, plaintext) => {
    try {
        console.log("Public Key:", publicKey);
        const encryptedBuffer = publicEncrypt({
            key: publicKey,
            padding: constants.RSA_PKCS1_OAEP_PADDING
        }, Buffer.from(plaintext))
        
        return encryptedBuffer.toString('base64')
    } catch (error) {
        console.error('Error encrypting with RSA:', error.message)
        throw error
    }
}

export const decryptWithRSA = (privateKey, encryptedPassword) => {
    try {
        const decryptedBuffer = privateDecrypt({
            key: privateKey,
            padding: constants.RSA_PKCS1_OAEP_PADDING
        }, Buffer.from(encryptedPassword, 'base64'))
        return decryptedBuffer.toString()
    } catch (error) {
        console.error('Error decrypting with RSA:', error.message)
        throw error
    }
}