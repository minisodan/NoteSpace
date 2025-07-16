import { invoke } from "@tauri-apps/api/core";
import { homeDir, join } from "@tauri-apps/api/path";
import { platform } from "@tauri-apps/plugin-os";
import { extname } from "@tauri-apps/api/path";
import { FileType } from "../Types/FileType";

/**
 * A reference to the base level directory of the application.
 */
export const APPLICATION_PATH = await join(await homeDir(), ".notespace");

/**
 * Helper function to that creates the base application.
 */
export const createApplicationDirectory = async () => {
  createDirectory({path: APPLICATION_PATH});
}

/**
 * Saves a file with its content.
 * 
 * @param content Content of the file to be saved
 * @param path The path of the given file to be saved
 */
export const saveFile = ({
  content,
  path,
}: {
  content: string;
  path: string;
}) => invoke("save_file", { content: content, path: path });

/**
 * Creates a file with absolute path.
 * 
 * @param path Absolute path to create file. 
 * @returns A promise resolving or rejecting to the backend response.
 */
export const createFile = async ({ path }: { path: string }) => {
  return invoke("create_file", { path: path });
};

/**
 * Creates a file with absolute path.
 * 
 * @param path Absolute path to create file. 
 * @returns A promise resolving or rejecting to the backend response. 
 */
export const createDirectory = async ({ path }: { path: string }) =>
  invoke("create_directory", { path: path });

/**
 * Deletes the file based on the given absolute path
 * 
 * @param path pased in path to be deleted
 * @returns deletes the file based on path
 */
export const deleteFile = async ({ path }: { path: string }) => {
  return invoke("delete_file", { path: path });
}

/**
 * If current path is nullish, function will fetch base directory files and directories. Otherwise will fetch by path.
 * 
 * @param path current path with files and directories.
 * @returns a list files and directories as FileType.
 */
export const fetchAllFilesAndDirectories = async ({ path }: { path: string }) => {
  return invoke("list_files", { path: path ?? APPLICATION_PATH }) as Promise<FileType[]>;
}

/**
 * Reads and returns the entire contents of a file.
 *
 * @param path path to the file.
 * @returns file contents.
 */
export const readTextFile = async ({ path }: { path: string }) => {
  return invoke("read_file", { path: path }) as Promise<string>;
};

/**
 * Strips the name from the path 
 * 
 * @param path the path to be stripped
 * @returns The stripped name from the path 
 */
export const stripFileNameFromPath = ({ path }: { path: string }) => {
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
    fileName.includes(".") && fileName.charAt(0) !== '.' ? fileName.indexOf(".") : fileName.length
  );
};

/**
 * Given a string path, this will return a string that 
 * is one directory backwards.
 * 
 * @param path the path to be backed up
 * @returns the new path
 */
export const StepBackPath = ({ path }: { path: string }) => {
  let indexOfLastSlash = platform() === "windows"
      ? path.lastIndexOf("\\") + 1
      : path.lastIndexOf("/") + 1
  return path.substring(
    0,
    indexOfLastSlash - 1
  );
}
