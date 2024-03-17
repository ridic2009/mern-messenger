import bcrypt from 'bcrypt'

export default async function hashPassword(password: string, saltRounds = 6) {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      console.log(error);
      return null;
    }
  }