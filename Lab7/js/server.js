const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the 'Lab7' directory
app.use(express.static(path.join(__dirname, 'Lab7')));

// Start the server
const PORT = process.env.PORT || 63341;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
