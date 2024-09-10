const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const {Client} = require('pg');
const express = require('express');
const http = require('http');
const {Server} = require('socket.io')


const app = express();
const server = http.createServer(app);
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ["GET", "POST","PUT"],
  optionsSuccessStatus: 200
};
const io = new Server(server, {
  cors: corsOptions,
});
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

app.put('/register', async(req, res) => {
  const registerQuery = 'insert into users (email, username, password) values ($1,$2,$3)'
  try{
    const {email,password,username} = req.body;
    await client.query(registerQuery, [email, username, password]);
    res.status(200).json({message:"registration successful, Logging in ..."})
  }catch(registerError){
    console.log("Error registering: ",registerError)
    res.status(401).json({message:'registration failed'})
  }
})


app.post('/poems', async (req,res)=>{
  const insertQuery = `
  INSERT INTO poems (author, poemdata)
  VALUES ($1, $2)
  RETURNING *;
`;

try {
  const{title, poem} = req.body;
  const newPoem = {title, poem}
  // console.log("after removing ==",newPoem)
  const result = await client.query(insertQuery, [req.body.author, newPoem]);
  res.status(201).json({
    message: 'Data inserted successfully',
    data: result.rows[0]
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
  let serverInstance = server.listen(3002, () => {
    console.log('Server is running on localhost, port:',serverInstance.address().port);
  });

}catch(err){
  console.log('error starting server: ',err)
}
