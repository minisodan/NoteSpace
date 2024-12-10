const { BrowserWindow, app, Menu, ipcMain, dialog } = require("electron");
const fs = require("fs-extra");
const { FileManager } = require("./Ui/Js/FileManager");

// Disable hardware acceleration
app.disableHardwareAcceleration();

// On app ready, initialize the main window and menu
app.on("ready", async () => {
  try {
    const app_window = await createMainWindow();
    const fileManager = new FileManager(app_window, app);

    // Set the application menu
    const menu = await createMenu(fileManager);
    if (menu) {
      Menu.setApplicationMenu(menu);
    } else {
      console.error("Invalid menu, could not set application menu.");
    }

    // Set up ipc listeners
    setupIpcListeners(fileManager);
  } catch (error) {
    console.error("Error during app initialization:", error);
  }
});

// Create and configure the main BrowserWindow
const createMainWindow = async () => {
  try {
    const app_window = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true,
      },
    });

    await app_window.loadFile("Ui/index.html");
    return app_window;
  } catch (error) {
    console.error("Error creating main window:", error);
    throw error;
  }
};

// Create the application menu, including recent files submenu
const createMenu = async (fileManager) => {
  try {
    const submenuOfOpenRecent = await createOpenRecentSubMenu(fileManager);
    const menuTemplate = [
      {
        label: "File",
        submenu: [
          {
            label: "Open File...",
            click: () => fileManager.openFileWindow(),
          },
          {
            label: "Open Recent...",
            submenu: submenuOfOpenRecent,
          },
          {
            label: "Save File...",
            click: () => {
              // Trigger the save file dialog dynamically
              saveFileDynamic(fileManager);
            },
          },
          {
            label: "Quit",
            click: () => fileManager.quit(),
          },
        ],
      },
    ];

    return Menu.buildFromTemplate(menuTemplate);
  } catch (error) {
    console.error("Error creating menu:", error);
    return null;
  }
};

// Create the "Open Recent" submenu dynamically based on file history
const createOpenRecentSubMenu = async (fileManager) => {
  try {
    const submenu = [];
    const history = await fileManager.readHistory();
    if (history && history.paths) {
      history.paths.forEach((path) => {
        submenu.push({
          label: path,
          click: () => fileManager.openRecentFile(path),
        }, { type: 'separator' });
      });
    }
    return submenu;
  } catch (error) {
    console.error("Error creating open recent submenu:", error);
    return [];
  }
};

// Set up IPC listeners for main and renderer process communication
const setupIpcListeners = (fileManager) => {
  // Listen for "save-content" event from renderer process
  ipcMain.on("save-content", (event, content) => {
    // Call save method and pass the dynamic content
    saveFileDynamic(fileManager, content);
  });
};

// Save dynamic content to file
const saveFileDynamic = async (fileManager, content = "") => {
  try {
    // Open a save file dialog
    const result = await dialog.showSaveDialog(fileManager.app_window, {
      title: "Save File",
      defaultPath: "untitled.txt", // Default filename
      filters: [{ name: "Text Files", extensions: ["txt"] }],
    });

    if (!result.canceled) {
      // The user selected a location and gave a name for the file
      const filePath = result.filePath;

      // Save the content to the selected file path
      await fs.writeFile(filePath, content);
      console.log(`File saved to ${filePath}`);

      // Optionally, save the file path in history (if desired)
      await fileManager.saveHistory(filePath); // Save the path in history

      // You can also send an event back to the renderer if needed (for updates, etc.)
      fileManager.app_window.webContents.send("file-saved", { path: filePath });
    }
  } catch (error) {
    console.error("Error saving file:", error);
  }
};

ipcMain.on('newdata', (event, { path, file }) => {
    console.log('Saving file:', path);
    fs.writeFile(path, file, (err) => {
      if (err) {
        console.error("Error saving file:", err);
      } else {
        console.log("File saved successfully:", path);
      }
    });
  });