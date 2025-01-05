use std::io::Write;
use std::fs::File;
use std::path::Path;

use tauri::Manager;
use tauri_plugin_decorum::WebviewWindowExt;


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

/// Creates a new file by deletgain
#[tauri::command]
fn create_file(path: String) -> Result<(), String> {
    save_file(String::from(""), path)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder
        ::default()
        .plugin(tauri_plugin_decorum::init()) // initialize the decorum plugin
		.setup(|app| {
			// Create a custom titlebar for main window
			// On Windows this hides decoration and creates custom window controls
			// On macOS it needs hiddenTitle: true and titleBarStyle: overlay
			let main_window = app.get_webview_window("notepadme").unwrap();
			main_window.create_overlay_titlebar().unwrap();

			// Some macOS-specific helpers
			#[cfg(target_os = "macos")] {
				// Set a custom inset to the traffic lights
				main_window.set_traffic_lights_inset(12.0, 16.0).unwrap();

				// Make window transparent without privateApi
				main_window.make_transparent().unwrap();

				// Set window level
				// NSWindowLevel: https://developer.apple.com/documentation/appkit/nswindowlevel
				main_window.set_window_level(25).unwrap();
			}

			Ok(())
		})
        .invoke_handler(tauri::generate_handler![save_file, create_file])
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
