const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  SendContent: (content) => ipcRenderer.send("save-content", content),
});
