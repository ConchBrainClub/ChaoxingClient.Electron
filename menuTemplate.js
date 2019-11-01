var main = require("./main");

module.exports.getmenuTemplate = (webContents,shell)=>{
        
    var menuTemplate = [
        {
            label: "浏览",
            submenu: [
                {
                    label: "主页",
                    click: ()=>{
                        webContents.loadURL('http://passport2.chaoxing.com/login');
                    }
                },
                {
                    label: "刷新",
                    click: ()=>{
                        webContents.reload();
                    }
                },
                {
                    label: "前进",
                    click: ()=>{
                        if(webContents.canGoForward()){
                            webContents.goForward();
                        }
                    }
                },
                {
                    label: "后退",
                    click: ()=>{
                        if(webContents.canGoBack()){
                            webContents.goBack();
                        }
                    }
                },
                {
                    label: "浏览器中打开",
                    click: ()=>{
                        var url = webContents.getURL();
                        shell.openExternal(url);
                    }
                }
            ]
        },
        {
            label: "刷课",
            submenu: [
                {
        
                    label: "开始刷课",
                    click:()=>{
                        //判断是否在视频页面 之后执行 btn_start
                        var url = webContents.getURL();

                        if(url.includes("study")){
                            webContents.executeJavaScript("eval('btn_start();');");
                        }
                        else{
                            webContents.executeJavaScript("alert('不是视频页面')");
                        }
                    }
                },
                {
                    label: "停止刷课",
                    click: ()=>{
                        webContents.reload();
                    }
                },
                {
                    label: "静音",
                    click: ()=>{
                        main.muted();
                        //更新脚本后刷新页面，重新载入脚本
                        webContents.reload();
                    }
                },
                {
                    label: "自动答题",
                    click: ()=>{
                        main.autoAnswer();
                        //更新脚本后刷新页面，重新载入脚本
                        webContents.reload();
                    }
                }
            ]
        },
        {
            label: '关于',
            role: 'help',
            submenu: [
                {
                    label: '访问官网',
                    click: ()=>{
                        webContents.loadURL('https://www.lllxy.net');
                    }
                },
                {
                    label: '反馈中心',
                    click: ()=>{
                        webContents.loadURL('https://www.lllxy.net/feedback/');
                    }
                }
            ]
        }
    ]

    return menuTemplate;
}