import crypto from 'crypto';
import { config } from 'dotenv';
import fs from 'fs';

config();

async function secretKey() {

    const existingKey = process.env.JWT_SECRET_KEY;

    if (existingKey) {
        //returns key if it exists
        return existingKey;
    } else {   
        //generates a random key
        const newSecretKey = crypto.randomBytes(32).toString('hex');
        
        fs.appendFileSync('.env', `JWT_SECRET_KEY=${newSecretKey}\n`, { encoding: 'utf8' });
        console.log('stored key in enviroment variable');
        
        const envContent = `JWT_SECRET_KEY=${newSecretKey}\n`;
        fs.writeFileSync('.env', envContent, { encoding: 'utf8' });

        console.log('Stored new key in environment variable file.');

        return newSecretKey;
    }
}

export default secretKey; 