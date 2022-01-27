const express = require("express");
const server = express();

server.use(express.json());

const { getAll, findById, insert } = require("./people/peopleModel");

// [GET] All People
server.get("/api/people", async (req, res, next) => {
  const peopleArr = await getAll();

  res.status(200).json(peopleArr);
});

// [GET] By ID
server.get("/api/people/:id", async (req, res, next) => {
  const person = await findById(req.params.id);

  res.status(200).json(person);
});

// [POST] Insert Person
server.post("/api/people", async (req, res, next) => {
  const insertedPerson = await insert({ name: req.body.name });

  res.status(201).json(insertedPerson);
});

module.exports = server;
