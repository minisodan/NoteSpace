use tauri::{WebviewUrl, WebviewWindowBuilder};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder
        ::default()
        .setup(|app| {

            // Set application window defaults
            let win_builder = WebviewWindowBuilder::new(app, "notepad", WebviewUrl::default())
                .title("Notepad.me")
                .inner_size(800.0, 600.0);

            // Since linux distros tend to handle decorations, we can disable them for linux.
            #[cfg(target_os = "linux")]
            let win_builder = win_builder.decorations(false);

            let _window = win_builder.build().unwrap();

            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
