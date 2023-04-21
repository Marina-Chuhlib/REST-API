const mongoose = require("mongoose");
const request = require("supertest");

const path = require("path");
const envPath = path.join(__dirname, "../../config", ".env");
require("dotenv").config({ path: envPath });

const app = require("../../app");

const { User } = require("../../models");

const { PORT, DB_URI_TEST } = process.env;

describe("test/ app/users/register route", () => {
  let server = null;
  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(DB_URI_TEST);
  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  beforeEach(() => {});

  // afterEach(async () => {
  //   await User.deleteMany({});
  // });

  test("test register route with correct data", async () => {
    const registerData = {
      email: "test@gmail.com",
      // password: "1111111",
    };

    const res = await request(app)
      .post("/api/users/register")
      .send(registerData);
    // expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe(registerData.email);
  });
});
