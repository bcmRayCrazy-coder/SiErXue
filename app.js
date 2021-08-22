const { response } = require('express');
const express = require('express');
const app = express();
const port = 80;

// 路由
const teacherRouter = require('./routers/teacher');
const studentRouter = require('./routers/student');

// 跳转
app.get('/', (req, res) => {
    res.redirect('/teacher');
});

// 路由
app.use('/teacher', teacherRouter);
app.use('/student', studentRouter);

app.listen(port, () => console.log(`SiErXue app listening on port 80!`));