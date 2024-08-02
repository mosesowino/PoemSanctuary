const { Client } = require('pg');

const client = new Client({
  user: 'psadmin',
  host: 'localhost',
  database: 'poemsanctuary',
  password: '@1234',
  port: 5432,
});

client.connect();

// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
//   // client.end();
//   if(err)throw err;
//   if(res){
//     console.log(res.rows())
//   }
//   client.end();
// });

// const add_password_col = `
//   ALTER TABLE users ADD COLUMN password VARCHAR(100);
// `;

// client.query(add_password_col,(err,res)=>{
//   if(err){
//     console.error('Error adding column: ',err.stack)
//   }
//   else{
//     console.log('added column successfully');
//   }
//   client.end();
// })

// const update_passwords_query = `
// UPDATE users SET password = $1 WHERE password IS NULL;
// `;

// client.query(update_passwords_query, ['johndoe1'], (err, res) => {
//   if (err) {
//     console.error('Error updating passwords:', err.stack);
//   } else {
//     console.log('Updated existing rows with default passwords');
//   }

//   // Close the database connection
//   client.end();
// });

// const alter_column_query = `
//   ALTER TABLE users ALTER COLUMN password SET NOT NULL;
// `;

// client.query(alter_column_query, (err, res) => {
//   if (err) {
//     console.error('Error executing query:', err.stack);
//   } else {
//     console.log('Added NOT NULL constraint to password column');
//   }
//   client.end();
// });



const register = (user_email,user_username, user_userpassword) =>{
  const insert_user_query = `
  INSERT INTO users (email, username, password) VALUES ($1, $2, $3);
  `;
  client.query(insert_user_query,[user_email,user_username,user_userpassword],(err,res)=>{
    if(err){
      console.error(`error executing query, ${err.stack}`);
    }
    else{
      console.log('user added successfully');
    }
    client.end();
  });
}

const user_email = 'lil.duck@example.com';//string
const user_username = 'LilDuck';//string
const user_userpassword = 'lilduck1';

register(user_email, user_username,user_userpassword)
