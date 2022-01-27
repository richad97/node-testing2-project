const db = require("../../data/dbConfig");
const { getAll, findById, insert } = require("../people/peopleModel");

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

describe("Persons Model", () => {
  test("db.getAll() returns persons array", async () => {
    const personsArr = await getAll();

    expect(personsArr.length).toBe(4);
  });

  test("db.findById(id) returns correct person", async () => {
    const personsArr = await findById(1);

    expect(personsArr[0]["name"]).toBe("ricardo");
  });

  test("db.insert(person) inserts person", async () => {
    const testObj = { name: "test" };
    const personsArr = await insert(testObj);

    expect(personsArr[0]["name"]).toBe(testObj.name);
  });
});
