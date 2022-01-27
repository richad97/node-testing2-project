const db = require("../../data/dbConfig");

function getAll() {
  return db("people");
}

function findById(id) {
  return db("people").where({ id });
}

async function insert(person) {
  const [id] = await db("people").insert(person);

  return findById(id);
}

module.exports = {
  getAll,
  findById,
  insert,
};
