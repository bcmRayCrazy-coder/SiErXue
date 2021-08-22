// 教师页面
var express = require('express');
var router = express.Router();
var fs = require("fs");

var TId = 0;

// 请求
router.get('/', (req, res) => {
    res.sendFile('/src/teacher.html');
    res.end();
});

router.get('/t/:c/:a', (req, res) => {
    var content = req.params.c;
    var answer = req.params.a;
    res.write("uploading...\n");
    // 更新题目
    fs.writeFile('files/t.json', JSON.stringify({ "c": content, "a": answer, "i": TId, "det": [] }), (err) => {
        if (err) {
            res.write(err);
        } else {
            res.write("Sucess!");
            TId += 1;
        }
        res.end();
    });
});


// 导出模块
module.exports = router;