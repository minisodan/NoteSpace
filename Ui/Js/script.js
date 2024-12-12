const { ipcRenderer } = require("electron");

// Variable to store the current file path
let path = "";

// Listen for the file data from the main process to load into the editor
ipcRenderer.on("filedata", (event, { data, path: filePath }) => {
  console.log("Received file data:", data);
  console.log("File path:", filePath);

  // Set the file content in the text area
  const textArea = document.getElementById("editor");
  if (textArea) {
    textArea.value = data; // Populate the editor with the file content
  } else {
    console.error("Text area not found!");
  }

  // Update the current file path
  path = filePath;
});
