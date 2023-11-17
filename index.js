//backend will run on port 8080
const express = require("express");
const cors = require("cors");
const app = express();
app.use(
    cors({
      origin: ['http://localhost:3000', 'http://localhost:3001'],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    })
  );
const PORT=8080;
console.log('Backend running')
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
