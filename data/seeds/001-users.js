
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          username: 'blue',
          email: 'blue@colors.com',
          password:'blue',
          birthday:'01-23-1970'
        }
      ]);
    });
};
