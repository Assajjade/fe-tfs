const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Middleware to parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

// Endpoint to handle page view count incrementation
app.post('/incrementPageView', (req, res) => {
    // Your implementation to increment page views
});

// Endpoint to get page view count for blog.js
app.get('/getPageViews', (req, res) => {
    // Your implementation to get page views
});

// For all other routes, serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'src','components', 'cWView','ContentWriterDashboard.js'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
