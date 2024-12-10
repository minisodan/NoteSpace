const os = require("os");
const fs = require("fs-extra");
const { dialog } = require("electron");

class FileManager {
  constructor(app_window, app) {
    const { homedir, username } = os.userInfo();
    this.homedir = homedir;
    this.username = username;
    this.historyPath = this.homedir + "/.config/history/info.json";
    this.app_window = app_window;
    this.app = app;
  }

  saveHistory(path) {
    // set directory for saving file path history
    fs.ensureFile(this.historyPath, (err) => {
      if (err) {
        throw err;
      }

      // read history json file
      fs.readJson(this.historyPath, { throws: false }).then((r) => {
        if (r === null) {
          const obj = {
            paths: [path],
          };
          // write path to json file
          fs.writeFile(this.historyPath, JSON.stringify(obj));
        } else {
          let isExist = r.paths.includes(path);
          if (!isExist) {
            r.paths.push(path);
            // write path to json file
            fs.writeFile(this.historyPath, JSON.stringify(r));
          }
        }
      });
    });
  }

  readHistory() {
    return fs
      .readJson(this.historyPath, { throws: false })
      .then((res) => {
        if (res == null) {
          console.log(null);
        } else {
          return res;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  openFileWindow() {
    if (!this.app_window) {
      console.error("App window is not initialized.");
      return;
    }
  
    // Open dialog for selecting files from system
    dialog
      .showOpenDialog(this.app_window, { properties: ["openFile"] })
      .then((res) => {
        // Log the result to verify if filePaths is being populated correctly
        console.log("Dialog result:", res);
  
        // Check if the user selected a file (not canceled)
        if (!res.canceled && res.filePaths.length > 0) {
          const filePath = res.filePaths[0];
          console.log("Selected file:", filePath);
  
          // Read the file content
          fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) {
              console.error("Error reading file:", err);
              return;
            }
  
            // Save file path in history
            this.saveHistory(filePath);
  
            // Send data and path to the renderer process
            this.app_window.webContents.send("filedata", {
              data: data,
              path: filePath,
            });
          });
        } else {
          console.log("No file selected or dialog was canceled.");
        }
      })
      .catch((err) => {
        console.error("Error opening file dialog:", err);
      });
    } 

  openRecentFile(path) {
    fs.readFile(path, "utf-8", (err, data) => {
      //save file path to history
      this.saveHistory(path);
      this.app_window.webContents.send("filedata", { data: data, path: path });
    });
  }

  async quit() {
    const response = await dialog.showMessageBox(this.app_window, {
        type: "warning",
        buttons: ['Cancel', 'Quit'],
        defaultId: 1,
        title: 'Confirm Quit',
        message: 'Are you aure you want to quit?',
    });

    if(response.response === 1) {
        this.app.quit();
    } else {
        console.log('Quit operation canceled');
    }
  }


  async saveFileWindow(fileContent = "") {
    try {
      const result = await dialog.showSaveDialog(this.app_window, {
        title: "Save File",
        defaultPath: "untitled.txt",  // Default filename
        filters: [{ name: "Text Files", extensions: ["txt"] }],  // File filter
      });

      if (!result.canceled) {
        // The user selected a location and gave a name for the file
        const filePath = result.filePath;

        // Save the content to the selected file path
        await fs.writeFile(filePath, fileContent);

        console.log(`File saved to ${filePath}`);

        // Optionally, you can save the file path to the history (if desired)
        await this.saveHistory(filePath); // Save the path in history

        // You can also send an event back to the renderer if needed (for updates, etc.)
        this.app_window.webContents.send("file-saved", { path: filePath });
      }
    } catch (error) {
      console.error("Error saving file:", error);
    }
  }
}

module.exports = {
  FileManager,
};