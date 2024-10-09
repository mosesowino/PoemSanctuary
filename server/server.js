const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const http = require('http');
const {Server} = require('socket.io')
const path = require('path')
const mysql = require('mysql2')


const clientorigin = process.env.CLIENT_URI
const secretKey = process.env.SECRET_KEY;
const connectionString = process.env.DATABASE_URI;

const app = express();
const server = http.createServer(app);
const corsOptions = {
  origin: clientorigin,
  methods: ["GET", "POST","PUT"],
  optionsSuccessStatus: 200
};
const io = new Server(server, {
  cors: corsOptions,
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  // password: 'your_password', 
  database: 'poemsanctuary' 
});

connection.connect((err) => {
  if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
  }
  console.log('Connected to MySQL database');
});

// Middleware to handle JSON payloads
app.use(express.json());



// app.use(cors(corsOptions));

connection.connect(err => {
  if (err) {
    console.error('Failed to connect to database:', err);
    // process.exit(1);
  } else {
    console.log('Connected to the database');
  }
});

app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      // Check if user exists
      const query = 'SELECT * FROM users WHERE email = ?';
      const [results] = connection.query(query, [email]);

      if (results.length === 0) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }

      const user = results[0];

      // Verify password
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Create JWT token
      const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });

      return res.status(200).json({ token, username: user.username });
  } catch (error) {
      console.error('Error logging in:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
});


app.put('/register', async (req, res) => {
  const registerQuery = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
  try {
      const { email, password, username } = req.body;
      const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash the password

      await connection.execute(registerQuery, [email, username, hashedPassword]); // Store the hashed password

      res.status(200).json({ message: "Registration successful, Logging in ..." });
  } catch (registerError) {
      console.log("Error registering: ", registerError);
      res.status(401).json({ message: 'Registration failed' });
  }
});



app.post('/poems', async (req, res) => {
  const insertQuery = `
      INSERT INTO poems (author, poemdata)
      VALUES (?, ?)
  `;

  try {
      const { title, poem } = req.body;
      const newPoem = { title, poem }; // Create an object for the new poem
      const poemData = JSON.stringify(newPoem); // Convert the poem object to JSON string

      // Execute the insert query
      const [result] = await connection.execute(insertQuery, [req.body.author, poemData]);

      res.status(201).json({
          message: 'Data inserted successfully',
          data: {
              id: result.insertId, // Get the ID of the newly inserted row
              author: req.body.author,
              poemdata: newPoem
          }
      });
  } catch (err) {
      console.error('Error inserting data', err);
      res.status(500).json({ error: 'Failed to insert data' });
  }
});

app.get("/servePoemData", async (req, res) => {
  const getPoemsRecordsQuery = 'SELECT * FROM poems';

  try {
      const [results] = await connection.query(getPoemsRecordsQuery); // Use connection.query to fetch results
      console.log("Fetched poems: ", results); // Log the fetched results
      res.status(200).json({ results }); // Use 200 for successful responses
  } catch (err) {
      console.error("Error fetching from database: ", err);
      res.status(500).json({ error: 'Failed to fetch data' }); // Send an error response
  }
});




app.get('/', (req, res) => {
  res.json({ message: 'Hello from root' });
  console.log("Hello root");
});

app.post('/', (req, res) => {
  console.log(req.body);
  let poem_data = req.body;
  res.status(200).json({ message: 'Data received' });
});



let likes;
let poemId;
app.post('/updateLikes',async(req,res)=>{
  // const { id } = req.params;
  
  // console.log(req.body);
  poemId = req.body.id;
  let likeAction = req.body.likeAction;
  let fetchPoemById = `
  SELECT likes FROM public.poems
  where id=($1);
  `
  /*PREPARE update_json AS*/
  const updateLikesById = `
  UPDATE poems
  SET likes=($1)
  WHERE id=($2);
  `

  try{
    let result = await client.query(fetchPoemById,[poemId]);
    // console.log("Likes result ==",result.rows[0].likes)
    likes = result.rows[0].likes;


    if(likeAction === 1){
      // console.log(poemdata)
      console.log("LikeAction++")
      ++likes;
    }else if(likeAction === -1 && likes > 0){
      // console.log(poemdata)
      console.log("LikeAction--")
      --likes;
    }else{
      // console.log(likesCount)
      likes = 0;
    }

    // io.on('connection', (socket)=>{
    //   console.log("a user connected")
    
    //   socket.on('disconnect', ()=>{
    //     console.log("user disconnected")
    //   })
    //   socket.emit(`liked${poemId}`,likes)
    // })
    
    // console.log("poem data type", typeof(poemdata))
    await client.query(updateLikesById,[likes, poemId]);
    console.log("updated likes, result =>",likes)
    // res.status(200).json({message:`likes updated for ${poemId}`});
  }catch(err){
    console.log("Failed to update likes", err)
  }

  


})

//update likes via socketio
io.on('connection', (socket)=>{
  console.log("a user connected again")

  socket.on('disconnect', ()=>{
    console.log("user disconnected")
  })
  socket.emit(`liked`,likes)
})

try{
  const port = process.env.PORT
  let serverInstance = server.listen(port, () => {
    console.log(`Server is running on ${serverInstance.address().address} port:,${serverInstance.address().port}`);
  });

}catch(err){
  console.log('error starting server: ',err)
}
