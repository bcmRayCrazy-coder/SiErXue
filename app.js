const { response } = require('express');
const express = require('express');
const app = express();
const port = 80;

// 路由
const teacherRouter = require('./routers/teacher');

// 跳转
app.get('/', (req, res) => {
    res.redirect('/teacher');
});

// 路由
app.use('/teacher', teacherRouter);

app.listen(port, () => console.log(`SiErXue app listening on port 80!`));