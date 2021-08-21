// 教师页面
var express = require('express');
var router = express.Router();

// 请求
router.get('/', (req, res) => {
    res.sendFile('/src/teacher.html');
    res.end();
});

router.get('/t/:c/:a', (req, res) => {
    var content = req.params.c;
    var answer = req.params.a;
    console.log(content, '...', answer);
});

// 导出模块
module.exports = router;