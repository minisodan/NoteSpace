use std::fs::{ self, File };
use std::io::Write;
use std::path::Path;

use tauri::{ WebviewUrl, WebviewWindowBuilder };

/// Saves a file to the system with 'content' at location 'path'.
/// A result type will be returned depending on whether the operation succeded or failed, and why.
#[tauri::command]
fn save_file(content: String, path: String) -> Result<(), String> {
    let path = Path::new(&path);

    // decide which file operation to perform.
    let file_operation = if path.exists() { File::open(path) } else { File::create(path) };

    // unwrap the result of the file operation
    let mut file = match file_operation {
        Ok(file) => file,
        Err(err) => {
            return Err(String::from(err.to_string()));
        }
    };

    // now use file, or return error if it can't be used.
    match file.write_all(content.as_bytes()) {
        Ok(_) => Ok(()),
        Err(_) => Err(String::from("Could not write to file.")),
    }
}

/// Creates a new file by delegating to save_file by passing in a empty string for path.
#[tauri::command]
fn create_file(path: String) -> Result<(), String> {
    save_file(String::from(""), path)
}

/// Creates a new directory based on the specified path.
#[tauri::command]
fn create_directory(path: String) -> Result<(), String> {
    let full_path = Path::new(&path);

    if full_path.exists() {
        return Err(format!("Directory '{}' already exists.", path));
    }

    match fs::create_dir_all(&full_path) {
        Ok(_) => Ok(()),
        Err(err) => Err(format!("Failed to create directory '{}': {}", path, err)),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder
        ::default()
        .plugin(tauri_plugin_fs::init())
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
        .invoke_handler(tauri::generate_handler![save_file, create_file, create_directory])
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
