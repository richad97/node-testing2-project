const db = require("../data/dbConfig");
const server = require("../api/server");
const request = require("supertest");

test("initial check", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("[GET] All people", () => {
  test("Responds with status code 200", async () => {
    const res = await request(server).get("/api/people");
    expect(res.status).toBe(200);
  });
  test("Responds with correct array length", async () => {
    const res = await request(server).get("/api/people");
    expect(res.body.length).toBe(4);
  });
});

describe("[GET] Person by ID", () => {
  test("Responds with status code 200", async () => {
    const res = await request(server).get("/api/people/1");
    expect(res.status).toBe(200);
  });
  test("Responds with correct person", async () => {
    const res = await request(server).get("/api/people/1");
    expect(res.body[0]["name"]).toBe("ricardo");
  });
});

describe("[POST] Person", () => {
  test("Responds with status code 201", async () => {
    const res = await request(server)
      .post("/api/people")
      .send({ name: "test" });

    expect(res.status).toBe(201);
  });
  test("Responds with name of inserted after successful", async () => {
    const res = await request(server)
      .post("/api/people")
      .send({ name: "test" });
    expect(res.body[0]["name"]).toBe("test");
  });
});
