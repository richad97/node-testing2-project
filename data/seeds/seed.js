exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("people")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("people").insert([
        { id: 1, name: "ricardo" },
        { id: 2, name: "alex" },
        { id: 3, name: "tony" },
        { id: 4, name: "johnny" },
      ]);
    });
};
