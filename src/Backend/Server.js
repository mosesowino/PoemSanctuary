const express = require('express');
const cors = require('cors');
const app = express();

// Middleware to handle JSON payloads
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));



app.get('/', (req, res) => {
  res.json({ message: 'Hello from root' });
  console.log("Hello root");
});

app.post('/', (req, res) => {
  console.log(req.body);
  let poem_data = req.body;
  res.json({ message: 'Data received' });
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
