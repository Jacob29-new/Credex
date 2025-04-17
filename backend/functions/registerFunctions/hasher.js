import argon2 from 'argon2';

async function hasher(input) {
    try {
        //hashes password
        const hashedInput = await argon2.hash(input, 10);
        return hashedInput;

    } catch (err) {
        console.error(`Failed to hash input: `);
    }
}


export default hasher;