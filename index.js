const express = require('express');
const port = process.env.PORT || 5000;
const app = express();

app.listen(port, () => {
	console.log(`Micro Service is running on port ${port}`);
});
