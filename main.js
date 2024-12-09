const { app, BrowserWindow, ipcMain, Menu, MenuItem} = require('electron')
const fs = require('fs-extra')
const {build_app} = require('./Ui/Js/script.js')

app.disableHardwareAcceleration()

app.on('ready', () => {
    window = build_app()

    window.webContents.openDevTools();
})

let menu_list = [
    {
        label: "File",
        submenu: [
            {
                label: "Open File...",
                click: function () {
                    console.log("Open File Clicked");
                }
            },
            {
                label: "Open recent...",
                click: function () {
                    console.log("Open Recent Clicked");
                }
            }
        ]
    }
];

const menu_design = Menu.buildFromTemplate(menu_list);
Menu.setApplicationMenu(menu_design);



app.on('window-all-closed', () => {
    app.quit();
});