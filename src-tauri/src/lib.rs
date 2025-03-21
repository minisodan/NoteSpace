use std::fs::{self, File};
use std::io::Write;
use std::path::Path;

/// Struct for representing file types.
#[derive(serde::Serialize)]
#[serde(rename_all = "camelCase")]
struct FileType {
    path: String,
    is_directory: bool
}

/// Saves a file to the system with 'content' at location 'path'.
/// A result type will be returned depending on whether the operation succeded or failed, and why.
#[tauri::command]
fn save_file(content: String, path: String) -> Result<(), String> {
    let path = Path::new(&path);

    // decide which file operation to perform.
    let file_operation = if path.exists() {
        File::open(path)
    } else {
        File::create(path)
    };

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

// deletes a file with the specified path
#[tauri::command]
fn delete_file(path: String) -> Result<(), String> {
    let full_path = Path::new(&path);

    if full_path.is_file() {
        match fs::remove_file(path) {
            Ok(_) => Ok(()),
            Err(err) => Err(err.to_string()),
        }
    } else {
        match fs::remove_dir(path) {
            Ok(_) => Ok(()),
            Err(err) => Err(err.to_string()),
        }
    }
}

#[tauri::command]
fn read_file(path: String) -> Result<String, String> {
    let file_path = Path::new(&path);

    if !file_path.exists() {
        return Err(format!("file '{}' does not exist.", path));
    }

    let content = fs::read_to_string(file_path);

    match content {
        Ok(content) => Ok(content),
        Err(err) => Err(format!(
            "Failed to fetch file contents from path '{}': {}",
            path, err
        )),
    }
}

#[tauri::command]
fn list_files(path: String) -> Result<Vec<FileType>, String> {
    let files = fs::read_dir(path)
        .map_err(|e| e.to_string())?
        .map(|res| {
            res.map(|e| {
                let metadata = e.metadata().map_err(|e| e.to_string())?;
                let path = e.path().to_string_lossy().into_owned();

                Ok(FileType {
                    path: path,
                    is_directory: metadata.is_dir(),
                })
            })
            .map_err(|e| e.to_string())?
        })
        .collect::<Result<Vec<FileType>, String>>()?;

    Ok(files)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            save_file,
            create_file,
            create_directory,
            list_files,
            read_file,
            delete_file
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
