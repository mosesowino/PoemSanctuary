const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const {Client} = require('pg')
const express = require('express');


const app = express();
const secretKey = process.env.SECRET_KEY;
const client = new Client({
  user: 'psadmin',
  host: 'localhost',
  database: 'poemsanctuary',
  password: '@1234',
  port: 5432,
})


// Middleware to handle JSON payloads
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

client.connect(err => {
  if (err) {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  } else {
    console.log('Connected to the database');
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {

    
    // Check if user exists
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await client.query(query, [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = result.rows[0];

    // Verify password
    // const validPassword = await bcrypt.compare(password, user.password);
    const validPassword = (password == user.password)

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    

    // Create JWT token
    const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });

    return res.status(200).json({token:token, username:user.username });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});



app.post('/poems', async (req,res)=>{
  const insertQuery = `
  INSERT INTO poems (author, poemdata)
  VALUES ($1, $2)
  RETURNING *;
`;

try {
  const{title, poem} = req.body;
  const newPoem = {title, poem}
  console.log("after removing ==",newPoem)
  const result = await client.query(insertQuery, [req.body.author, newPoem]);
  res.status(201).json({
    message: 'Data inserted successfully',
    data: result.rows[0],
  });
} catch (err) {
  console.error('Error inserting data', err);
  res.status(500).json({ error: 'Failed to insert data' });
}


});

app.get("/servePoemData", async (req, res)=>{
  const getPoemsRecordsQuery = 'SELECT * from poems';
  try{
    const result = await client.query(getPoemsRecordsQuery);
    console.log("resultt ===> ", result.rows)
    const results = result.rows;
    res.status(201).json({results})
  }catch(err){
    console.error("Error fetching from database ::: ", err);
  }
})



app.get('/', (req, res) => {
  res.json({ message: 'Hello from root' });
  console.log("Hello root");
});

app.post('/', (req, res) => {
  console.log(req.body);
  let poem_data = req.body;
  res.status(200).json({ message: 'Data received' });
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
