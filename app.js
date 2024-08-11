const express = require('express');
const cors = require('cors');
require('dotenv').config();
const config = require('./config');
const connectDB = require('./src/db/connect');
const routes = require('./src/routes/index');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send({ status: true });
});

//health checks
app.get('/health-check', (req, res) => {
  res.json('Server is running...');
});

// Connect to DB and start server
const start = async () => {
  try {
    await connectDB(config.MONGO_URL);
    app.listen(config.PORT, () => {
        console.log("---------------------------------------->");
        console.log(`  🚀 App is listening on ${config.PORT} 🚀`);
        console.log("---------------------------------------->");
    });
  } catch (error) {
    console.error(error);
  }
};
start();

// Export app and start function for testing
module.exports = { app, start };
