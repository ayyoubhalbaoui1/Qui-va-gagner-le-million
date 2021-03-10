const app = require("../server"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require("mongoose");

beforeAll(async () => {
  const url = process.env.DATABASE_URL;
  await mongoose.connect(url, { useNewUrlParser: true });
});



it("Should save participant to database", async (done) => {
  const res = await request.post("/participant/register").send({
    full_name: "testtestest",
    age: 0,
    email: "test@test.com",
    phone: "0000000000",
    password: "testtestetstest",
    isValid: true,
    online: false,
    score: 0,
  });
  expect(res.status).toBe(200);
  done();
});

it("Should create a group members", async (done) => {
  const res = await request.post("/group/add").send({
    id_participant: "6036233326f1cb44c0532a3b",
  });
  expect(res.status).toBe(201);
  done();
});

it("Should join a group members", async (done) => {
  const res = await request.post("/group/join").send({
    id_participant: "6036233326f1cb44c0532a3b",
    group_code: 8340,
  });
  expect(res.status).toBe(200);
  done();
});

it("Should save question to database", async (done) => {
  const res = await request.post("/question/add").send({
    answer: "Fifteen",
    false_choices: [
        "Thirty",
        "Twenty Four",
        "Forty"
    ],
    quest: "How many degrees does the earth rotate each hour",
    points: 10
});
  expect(res.status).toBe(200);
  done();
});

it("it should get a random question", async (done) => {
  const res = await request.get("/question/randomQuestion");

  expect(res).not.toBe(null);
  done();
});