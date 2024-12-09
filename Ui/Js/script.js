const { BrowserWindow } = require("electron");

function build_app(){
    const app_window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    })

    app_window.loadFile("Ui/index.html")

    return app_window
}

module.exports = {build_app}