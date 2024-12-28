use tauri::{WebviewUrl, WebviewWindowBuilder};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder
        ::default()
        .setup(|app| {
            // let win_builder = WebviewWindowBuilder::new(app, "main", WebviewUrl:: default())
            //     .title("Transparent Titlebar Window")
            //     .inner_size(800.0, 600.0);

            // // only set transparancy for macos
            // #[cfg(target_os = "macos")]
            // let win_builder = win_builder.title_bar_style(TitleBarStyle::Transparent);

            // let window = win_builder.build().unwrap();
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
