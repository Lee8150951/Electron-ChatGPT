const Windows = (app) => {
  const { BrowserWindow, Tray, Menu } = require('electron');
  const path = require('path');
  const fs = require('fs');
  const root = path.resolve(__dirname, '..');

  let mainWindow = null;
  let tray = null;

  const menuTemplate = [
    {
      label: '退出',
      role: 'quit',
      accelerator: 'Control+Q',
      click: () => {
        app.quit();
      },
    },
    {
      label: '重启',
      accelerator: 'Control+R',
      click: () => {
        if (mainWindow !== null) {
          mainWindow.close();
        }
        mainWindow = createWindow();
      },
    },
  ];

  /* 主窗口 */
  const createWindow = () => {
    const win = new BrowserWindow({
      title: 'ChatGPT',
      width: 500,
      height: 600,
      x: tray.getBounds().x - 200,
      y: tray.getBounds().y - 600,
      // 关闭菜单栏
      frame: false,
      skipTaskbar: true
    });

    win.setTitle("ChatGPT");

    win.loadURL('https://chat.openai.com/chat')
      .then(() => {
        const webContents = win.webContents;
        // 加载完成
        webContents.on('did-finish-load', () => {
          // 引入外部文件js传入executeJavaScript
          const codeString = String(fs.readFileSync(root + '/scripts/web.js', 'utf8'));
          win.webContents.executeJavaScript(codeString).then();
        });
      });

    // 在窗口关闭时将其设为null，以便再次打开它
    win.on('closed', () => {
      mainWindow = null;
    });

    // 失去焦点时隐藏
    win.on('blur', () => {
      win.hide();
    });

    // 置顶
    win.setAlwaysOnTop(true);

    // 显示窗口
    win.show();

    mainWindow = win;
    return win;
  };

  /* 托盘 */
  const createTray = () => {
    tray = new Tray(root + '/icons/menuIcon.png');

    const contextMenu = Menu.buildFromTemplate(menuTemplate);

    // 定义左键鼠标功能
    tray.on('click', (event, bounds) => {
      if (mainWindow === null) {
        createWindow()
      } else {
        if (!mainWindow.isVisible()) {
          mainWindow.show();
        }
      }
    });

    // 定义右键鼠标功能
    tray.on('right-click', (event, bounds) => {
      tray.popUpContextMenu(contextMenu);
    });
  };

  app.on('ready', () => {
    createTray();
  });
}

module.exports = Windows;