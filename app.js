const express = require('express');
const bodyParser = require('body-parser');
const Redis = require('ioredis');

const app = express();
const port = 3000;

//Parsing the request body of a POST request
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to redis database
const redis = new Redis({
    host: '10.0.0.52',
    port: 6379
});

//front-end code directory
app.use(express.static('public'));


app.get('/', (req, res) => {
    console.log("Directory: " + __dirname);
    res.sendFile(__dirname + '/public/index.html');
});

// Parse client requests and set the response to be returned to the client
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const storedPassword = await redis.hget(username, 'password');

        if (storedPassword && storedPassword === password) {
            res.send('Success');
        } else {
            res.send('FATAL: incorrect username or password');
        }
    } catch (error) {
        console.error('Redis Error:', error);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
