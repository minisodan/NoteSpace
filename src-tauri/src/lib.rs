use std::io::Write;
use std::fs::File;
use std::path::Path;

use tauri::{WebviewUrl, WebviewWindowBuilder};

/// Saves a file to the system with 'content' at location 'path'.
/// A result type will be returned depending on whether the operation succeded or failed, and why.
#[tauri::command]
fn save_file(content: String, path: String) -> Result<(), String> {
    
    let path = Path::new(&path);

    // check whether the file already exists, if it doesn't, create a file.
    let mut file = if !path.exists() {
        match File::create(path) {
            Ok(file) => file,
            Err(_) => return Err(String::from("File could not be created."))
        }
    } else {
        match File::open(path) {
            Ok(file) => file,
            Err(_) => return Err(String::from("File could not be opened."))
        }
    };

    // now use file, or return error if it can't be used.
    match file.write_all(content.as_bytes()) {
        Ok(_) => Ok(()),
        Err(_) => Err(String::from("Could not write to file."))
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder
        ::default()
        .setup(|app| {

            // Set application window defaults
            let win_builder = WebviewWindowBuilder::new(app, "notepad", WebviewUrl::default())
                .title("Notepad.me")
                .inner_size(800.0, 600.0);

            // Set blank title for macos
            #[cfg(target_os = "macos")]
            let win_builder = win_builder.title("");

            // Since linux distros tend to handle decorations, we can disable them for linux.
            #[cfg(target_os = "linux")]
            let win_builder = win_builder.decorations(false);

            // TODO: set color of window bar on macos based on application color scheme

            let _window = win_builder.build().unwrap();

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![save_file])
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
