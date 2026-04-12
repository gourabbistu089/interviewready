const app = require('./app');
const {connectDB} = require("./config/database");
// Load environment variables
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Start the server after successful database connection
connectDB()
  .then(() => {
    console.log("Database Connected");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed");
    console.error(err);
    process.exit(1); // optional but professional
  });
