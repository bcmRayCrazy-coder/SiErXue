var s = document.getElementById('s');
var a = document.getElementById('a');
var t = document.getElementById('t');

window.onload = () => {
    t.innerHTML = "正在获取题目中.......";
    a.value = "";
    getT();
    setInterval(() => {
        getT();
    }, 1000);
}

function p() {
    var answer = a.value;

    if (space(answer)) {

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                s.style.display = 'block';
                a.value = '';
                alert(`提交成功:${this.responseText}`);
                setTimeout(() => {
                    s.style.display = 'none';
                }, 5000);
            }
        };
        xhttp.open("GET", "/student/po/" + answer, true);
        xhttp.send();

    } else {
        alert('答案不能为空');
    }
}

function space(a = '') {
    var a = a.replace(" ", "");
    if (a.length == 0) return false;
    else return true;
}

function getT() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var j = JSON.parse(this.responseText);
            if (j.err == '1') {
                t.innerHTML = '出错了!刷新界面重新获取题目';
            }
            t.innerHTML = j.c;
        }
    };
    xhttp.open("GET", "/student/ti/", true);
    xhttp.send();
}