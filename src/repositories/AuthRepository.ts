import { prisma } from "../config/database"

async function insertUserDb(email: string, hashedPassword: string) {
  return prisma.users.create({
    data: {
      password: hashedPassword,
      email
    }
  });
}

async function getUserByEmail(email: string) {
  return prisma.users.findMany({
    where: {
      email: email
    }
  });
}

const authRepository = {
  insertUserDb,
  getUserByEmail,
}

export default authRepository
