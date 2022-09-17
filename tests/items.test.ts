import app from '../src/app'
import supertest from 'supertest';
import { prisma } from "../src/config/database";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { CreateUser } from "../src/services/AuthService.js";


beforeEach(async () => {
  await deleteAllData(); // deleta tudo
});

const agent = supertest(app);

describe("user tests", () => {
  it("should create user", async () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await agent.post("/signup").send(user);

    // efeitos colaterais
    const userCreated = await prisma.users.findFirst({
      where: { email: user.email }
    });

    expect(userCreated).not.toBeNull();
  });

  it("should login user", async () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    userFactory(user);
    const response = await agent.post("/signin").send(user);
    const { token } = response.body;
    expect(token).not.toBeNull();
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});

export default async function userFactory(user: CreateUser) {
  return prisma.users.create({
    data: {
      ...user,
      password: bcrypt.hashSync(user.password, 10),
    },
  });
}


export async function deleteAllData() {
  await prisma.$transaction([
    prisma.$executeRaw`TRUNCATE TABLE users`,
  ]);
}