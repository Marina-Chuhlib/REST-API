const path = require("path");

const app = require("./app");

const dotenv = require("dotenv");
const envPath = path.join(__dirname, "config", ".env");
dotenv.config({ path: envPath });

const connectDB = require("./config");
connectDB();

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
