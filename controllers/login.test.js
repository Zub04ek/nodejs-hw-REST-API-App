const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

require("dotenv").config();

const { DB_HOST } = process.env;

beforeEach(async () => {
  await mongoose.connect(DB_HOST);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("test login controller", () => {
  test("should login user", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "lisa@mail.com",
      password: "lisa123456",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      token: response.body.token,
      user: {
        email: "lisa@mail.com",
        subscription: "pro",
      },
    });
  });
});
