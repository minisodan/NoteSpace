const ipcRenderer = require('electron');
const information = document.getElementById('info');
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

const func = async() => {
    const responce = await window.versions.ping()
    console.log(responce)
}

// Capture the save button click event
document.getElementById('saveButton').addEventListener('click', () => {
    // Capture content from the editor (for example, from a textarea)
    const content = document.getElementById('editor').value;
  
    // Send the dynamic content to the main process for saving
    ipcRenderer.send('save-content', content);
});


func()