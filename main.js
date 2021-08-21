const { BrowserWindow, app, dialog, Menu } = require('electron');

const dockMenu = Menu.buildFromTemplate([{
        label: '新建窗口',
        click() { createStudentPage }
    }, {
        label: 'New Window with Settings',
        submenu: [
            { label: 'Basic' },
            { label: 'Pro' }
        ]
    },
    { label: 'New Command...' }
]);

function createStudentPage() {
    // 学生端界面
    const win = new BrowserWindow({ width: 800, height: 600 });
    win.loadURL(__dirname + '/src/student.html');

    app.dock.setMenu(dockMenu);
};

function closeDialog() {
    dialog.showMessageBox({
        title: "SiErXue",
        message: "你确定要退出吗？",
        type: "question",
        buttons: ["确定", "取消"],
    }).then(({ response }) => {
        if (response == 0) {
            app.quit();
        } else {
            createStudentPage();
        }
    })
}

// 加载
app.whenReady().then(() => {
    createStudentPage();
    app.on('activate', function() {
        createStudentPage();
    });
    // 当 macOS 无窗口打开时确定退出应用
    app.on('window-all-closed', function() {
        closeDialog();
    });
});