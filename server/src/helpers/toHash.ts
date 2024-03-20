import bcrypt from 'bcrypt'

export default async function toHash(value: any, saltRounds = 6) {
    try {

      const salt = await bcrypt.genSalt(saltRounds);
      const hashedValue = await bcrypt.hash(value, salt);

      return hashedValue

    } catch (error) {

      console.log(error);
      return null;

    }
  }