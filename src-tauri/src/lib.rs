use tauri::{WebviewUrl, WebviewWindowBuilder};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder
        ::default()
        .setup(|app| {
            #[cfg(target_os="macos")] {
                use tauri::TitleBarStyle;
                use cocoa::appkit::{ NSColor, NSWindow };
                use cocoa::base::{ id, nil };

                let win_builder = WebviewWindowBuilder::new(app, "main", WebviewUrl:: default())
                    .title("Transparent Titlebar Window")
                    .inner_size(800.0, 600.0);

                let win_builder = win_builder.title_bar_style(TitleBarStyle::Transparent);
                let window = win_builder.build().unwrap();

                let ns_window = window.ns_window().unwrap() as id;
                unsafe {
                    let bg_color = NSColor::colorWithRed_green_blue_alpha_(
                        nil,
                        50.0 / 255.0,
                        158.0 / 255.0,
                        163.5 / 255.0,
                        1.0
                    );
                    ns_window.setBackgroundColor_(bg_color);
                }
            }
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
