const asyncHandler = require('express-async-handler');
const axios = require('axios');
const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 5000;

const certificateRouter = require('./routes/certificateRoutes');

const app = express();

app.use('/certificate', certificateRouter);

app.listen(port, () => {
	console.log(`Micro Service is running on port ${port}`);
});
