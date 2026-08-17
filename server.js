const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Custom routing to map clean URLs to .html files
app.get('/:page', (req, res, next) => {
  const page = req.params.page;

  // If request contains an extension (like .css, .js, .png), pass it to express.static
  if (page.includes('.')) {
    return next();
  }

  // Redirect index to /
  if (page.toLowerCase() === 'index') {
    return res.redirect(301, '/');
  }

  const filePath = path.join(__dirname, `${page}.html`);
  res.sendFile(filePath, (err) => {
    if (err) {
      next(); // file doesn't exist, proceed to next middleware
    }
  });
});

// Root path handler
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve static assets and static files
app.use(express.static(path.join(__dirname)));

// 404 Handler
app.use((req, res) => {
  res.status(404).send('<h1>404 - Page Not Found</h1><p>The page you are looking for does not exist.</p><p><a href="/">Go to Home</a></p>');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
