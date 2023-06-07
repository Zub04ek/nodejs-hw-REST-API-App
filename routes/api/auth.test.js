const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../../app");
const { User } = require("../../models/user");

const { DB_HOST_TEST, PORT } = process.env;

describe("test login route", () => {
  let server = null;

  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(DB_HOST_TEST);
  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  test("test login with correct data", async () => {
    const loginData = {
      email: "lisa@mail.com",
      password: "lisa123456",
    };

    const { statusCode, body } = await request(app)
      .post("/api/users/login")
      .send(loginData);

    expect(statusCode).toBe(200);
    expect(body.user.email).toBe(loginData.email);

    const user = await User.findOne({ email: loginData.email });

    expect(body.user.subscription).toBe(user.subscription);
    expect(body.token).toBe(user.token);
  });
});
