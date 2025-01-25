const express = require('express');
const app = express();
const port = 5000;

// Middleware to serve static files
app.use(express.static('public'));

// Default route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/home.html');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
