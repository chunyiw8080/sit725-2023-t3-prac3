const express = require('express');
const bodyParser = require('body-parser');
const Redis = require('ioredis');

const app = express();
const port = 3000;

// 使用 body-parser 中间件来解析 POST 请求的请求体
app.use(bodyParser.urlencoded({ extended: true }));

// 连接到 Redis 数据库
const redis = new Redis({
    host: '10.0.0.52',
    port: 6379
});

// 静态文件夹，存放前端代码
app.use(express.static('public'));

// 登录页面路由
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// 处理登录请求
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // 在实际应用中，从 Redis 中获取存储的密码信息
    try {
        const storedPassword = await redis.hget(username, 'password');

        if (storedPassword && storedPassword === password) {
            res.send('Success');
        } else {
            res.send('FATAL: incorrect username or password');
        }
    } catch (error) {
        console.error('Redis Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
