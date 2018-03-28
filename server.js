const express = require('express');

const userRoute = require('./route');

var app = express();

app.use('/', userRoute);

app.listen(8080, () => {
    console.log('Server is up on port 8080');
});