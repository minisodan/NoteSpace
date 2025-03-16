import { invoke } from "@tauri-apps/api/core";
import { homeDir, join } from "@tauri-apps/api/path";
import { platform } from "@tauri-apps/plugin-os";
import { extname } from "@tauri-apps/api/path";
import { Open } from "../Utils/Store";

/**
 * Saves a file with its content.
 * 
 * @param content Content of the file to be saved
 * @param path The path of the given file to be saved
 */
export const SaveFile = ({
  content,
  path,
}: {
  content: string;
  path: string;
}) => invoke("save_file", { content: content, path: path });

/**
 * Creates the inital directory and sets the cache to the application directory
 */
export const InitilizeApplicationAndFiles = async () => {
  const fileType = {
    path: await GetApplicationPath(),
    isDirectory: true
  } as FileType;

  CreateApplicationDirectory()
  Open(fileType)
}

/**
 * Creates a file with absolute path.
 * 
 * @param path Absolute path to create file. 
 * @returns A promise resolving or rejecting to the backend response. 
 */
export const CreateFile = async ({ path }: { path: string }) => {
  return invoke("create_file", { path: path });
};

/**
 * Creates a file with absolute path.
 * 
 * @param path Absolute path to create file. 
 * @returns A promise resolving or rejecting to the backend response. 
 */
export const CreateDirectory = async ({ path }: { path: string }) =>
  invoke("create_directory", { path: path });

/**
 * Deletes the file based on the given absolute path
 * 
 * @param path pased in path to be deleted
 * @returns deletes the file based on path
 */
export const DeleteFileByFullPath = async ({ path }: { path: string }) => {
  return invoke("delete_file", { path: path });
}

/**
 * If current path is nullish, function will fetch base directory files and directories. Otherwise will fetch by path.
 * 
 * @param path current path with files and directories.
 * @returns a list files and directories as FileType.
 */
export const FetchAllFilesAndDirectories = async ({ path }: { path: string }) => {
  return invoke("list_files", { path: path ?? await GetApplicationPath() }) as Promise<FileType[]>;
}

/**
 * Reads and returns the entire contents of a file.
 *
 * @param path path to the file.
 * @returns file contents.
 */
export const ReadTextFileByFullPath = async ({ path }: { path: string }) => {
  if (await CheckExtenionFromPath({ path: path })) {
    return invoke("read_file", { path: path });
  } else {
    return Promise.reject("File has incorrect extention");
  }
};

/**
 * Helper function to create the base level application path as a string.
 * 
 * @returns returns a joined string that is the applications path
 */
const GetApplicationPath = async () =>
  await join(await homeDir(), ".notespace");

/**
 * Helper function to that creates the base application.
 */
const CreateApplicationDirectory = async () => {
  invoke("create_directory", { path: await GetApplicationPath() });
}

/**
 * Strips the name from the path 
 * 
 * @param path the path to be stripped
 * @returns The stripped name from the path 
 */
export const StripFileNameFromPath = ({ path }: { path: string }) => {
  // for a given path, remove everything other than the final path and extension
  let fileName = path.substring(
    (platform() === "windows"
      ? path.lastIndexOf("\\")
      : path.lastIndexOf("/")) + 1,
    path.length
  );

  // if the fileName has an extension, remove it.
  return fileName.substring(
    0,
    fileName.includes(".") ? fileName.indexOf(".") : fileName.length
  );
};

/**
 * Fucntion fetch extention from path and pass to a validator
 *
 * @param path path of file to fetch content from
 * @returns true if the file extention is valid, false otherwise.
 */
export const CheckExtenionFromPath = async ({
  path,
}: {
  path: string;
}): Promise<boolean> => {
  const pathExtention = await extname(path);

  if (pathExtention) {
    return CheckValidFileExtention({ extention: pathExtention });
  }
  return false;
};

/**
 * Helper function that validates a file extention against the following allowed extensions:
 *
 * - `.txt`
 * - `.md`
 *
 * @param extention Extention as a string
 * @returns true if valid,otherwise false.
 */
const CheckValidFileExtention = ({ extention }: { extention: string }) =>
  ["txt", "md"].includes(extention);