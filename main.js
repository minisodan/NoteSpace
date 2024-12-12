const { BrowserWindow, app, Menu, ipcMain, dialog } = require("electron");
const fs = require("fs-extra");
const { FileManager } = require("./Ui/Js/FileManager");

app.disableHardwareAcceleration();

let fileManager; // Declare fileManager here so it can be used in the ipcMain listener

app.on("ready", async () => {
  try {
    const app_window = await createMainWindow();
    fileManager = new FileManager(app_window, app);

    app_window.webContents.openDevTools();

    // Set the application menu
    const menu = await createMenu(fileManager);
    if (menu) {
      Menu.setApplicationMenu(menu);
    } else {
      console.error("Invalid menu, could not set application menu.");
    }
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
            click: async () => {
              // Save the content of the editor to a file
              const content = await getEditorContent(fileManager.app_window);
              if (content) {
                await saveFileDynamic(fileManager, content); // Save the content
              } else {
                console.error("No content to save.");
              }
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
        submenu.push(
          {
            label: path,
            click: () => fileManager.openRecentFile(path),
          },
          { type: "separator" }
        );
      });
    }
    return submenu;
  } catch (error) {
    console.error("Error creating open recent submenu:", error);
    return [];
  }
};

/**
 * Helper function to retrieve the text from the renderer process
 *
 * @param {*} app_window
 *    The {@link BrowserWindow} instance that contains the editor area.
 * @returns A promise that resolves to the content, as a string.
 */
const getEditorContent = (app_window) => {
  return new Promise((resolve, reject) => {
    app_window.webContents
      .executeJavaScript(`document.getElementById("editor").value`)
      .then((content) => resolve(content))
      .catch((err) => reject(err));
  });
};

// Save dynamic content to file (for the menu action)
const saveFileDynamic = async (fileManager, content = "") => {
  try {
    const result = await dialog.showSaveDialog(fileManager.app_window, {
      title: "Save File",
      defaultPath: "untitled", // Default filename
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

      // Optionally, send an event back to the renderer if needed (for updates, etc.)
      fileManager.app_window.webContents.send("file-saved", { path: filePath });
    }
  } catch (error) {
    console.error("Error saving file:", error);
  }
};
