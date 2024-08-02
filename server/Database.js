const { Client } = require('pg');

const client = new Client({
  user: 'psadmin',
  host: 'localhost',
  database: 'poemsanctuary',
  password: '@1234',
  port: 5432,
});

client.connect();

client.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  client.end();
});
