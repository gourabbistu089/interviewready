const app = require('./app');
const database = require("./config/database");
// Load environment variables
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Connect to database
database.connect();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Clos server & exit proce\dfgdfg
});