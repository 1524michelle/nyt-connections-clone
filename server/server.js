require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5010;

const Connection = require('./models/Connection');

const connectionString = process.env.MONGODB_LOCAL_URI;

mongoose.connect(connectionString)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/connections/:id', async (req, res) => {
    try {
      const connectionId = req.params.id;
  
      // Use Mongoose to find the connection by ID
      const connection = await Connection.findOne({ id: connectionId });
  
      // If connection is not found, return 404 Not Found
      if (!connection) {
        return res.status(404).json({ message: 'Connection not found' });
      }
  
      // If connection is found, return it as a response
      res.json(connection);
    } catch (error) {
      console.error('Error retrieving connection:', error);
      // Handle any error that occurred during the process
      res.status(500).json({ message: 'Failed to retrieve connection' });
    }
});

app.post('/connections', (req, res) => {
    const { id, name, rows } = req.body;
  
    const newConnection = new Connection({
        id,
        name,
        rows
      });
  
    newConnection.save()
      .then(() => {
        res.status(201).json({ message: 'Connection saved successfully' });
      })
      .catch((err) => {
        console.error('Error saving connection:', err);
        res.status(500).json({ message: 'Failed to save connection' });
      });
});

app.get('/', (req, res) => {
  res.send('Welcome to the Connections API!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
