import argon2 from 'argon2';

async function passwordHasher(password) {
    try {
        //hashes password
        const hashedPassword = await argon2.hash(password, 10);
        return hashedPassword;

    } catch (err) {
        console.error(`Failed to hash password: `);
    }
}


export default passwordHasher;