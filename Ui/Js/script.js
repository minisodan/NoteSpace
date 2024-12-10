const { ipcRenderer } = require("electron");

// Variable to store the current file path
let path = "";

// Listen for the file data from the main process to load into the editor
ipcRenderer.on("filedata", (event, { data, path: filePath }) => {
  console.log('Received file data:', data);
  console.log('File path:', filePath);

  // Set the file content in the text area
  const textArea = document.getElementById("editor");
  if (textArea) {
    textArea.value = data;  // Populate the editor with the file content
  } else {
    console.error('Text area not found!');
  }

  // Update the current file path
  path = filePath;
});

// Listen for keyboard shortcut (Ctrl+S) to save the file
document.addEventListener("keydown", function (e) {
  // Check if Ctrl + S is pressed
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();  // Prevent the default browser behavior (e.g., opening the Save dialog)
    
    const textArea = document.getElementById("editor");
    if (textArea) {
      let fileNewData = textArea.value;

      // Only send new data to the main process if a file path is set
      if (path) {
        ipcRenderer.send("newdata", { path: path, file: fileNewData });
        console.log("Saving file:", path);
      } else {
        console.error('No file path is set. Cannot save.');
      }
    }
  }
});
