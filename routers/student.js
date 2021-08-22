// 学生页面
var express = require('express');
var router = express.Router();
var fs = require("fs");

router.use('/pages', express.static('src/student'));
router.get('/ti', (req, res) => {
    fs.open('files/t.json', 'r', (err, fd) => {
        if (err) {
            res.write({ "err": "1" });
        } else {
            var buf = new Buffer.alloc(1024);
            fs.read(fd, buf, 0, buf.length, 0, (err, bytes) => {
                if (bytes > 0) {
                    var t = JSON.parse(buf.slice(0, bytes).toString());
                    t["err"] = 0;
                    delete t["a"];
                    delete t["det"]
                    res.write(JSON.stringify(t));
                }
                fs.close(fd, (err) => {
                    if (err) console.log(err);
                    res.end();
                })
            })
        }
    })
})

router.get('/po/:a', (req, res) => {
    var a = req.params.a;
    var t = {};
    fs.open('files/t.json', 'r', (err, fd) => {
        var buf = new Buffer.alloc(1024);
        fs.read(fd, buf, 0, buf.length, 0, (err, bytes) => {
            if (bytes > 0) {
                t = JSON.parse(buf.slice(0, bytes).toString());
                t["det"].push(a);
                fs.close(fd, (err) => {
                    if (err) console.log(err);
                    fs.open('files/t.json', 'w', (err, fd) => {
                        if (err) {
                            res.write("无法打开文件,请联系ray");
                            res.end();
                        } else {
                            fs.write(fd, JSON.stringify(t), (err) => {
                                if (err) {
                                    res.write("无法记录答案,请联系ray");
                                    console.error(err);
                                    res.end();
                                } else {
                                    res.write(a);
                                    res.end();
                                }
                                fs.close(fd, (err) => {
                                    if (err) console.log(err);
                                })
                            })
                        }
                    })
                })
            }
        });
    })

})

module.exports = router;