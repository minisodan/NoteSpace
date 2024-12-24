#[tauri::command]

/// A simple Tauri command that returns the greeting 'Hi!'
///
/// Function will be invoked via the front end.
fn say_hi() {}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder
        ::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![say_hi])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
