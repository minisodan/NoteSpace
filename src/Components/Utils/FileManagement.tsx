import { invoke } from "@tauri-apps/api/core";
import { homeDir, join } from "@tauri-apps/api/path";
import { platform } from "@tauri-apps/plugin-os";
import { extname } from "@tauri-apps/api/path";

const GetApplicationPath = async () =>
  await join(await homeDir(), ".notespace");

export const SaveFile = ({
  content,
  path,
}: {
  content: string;
  path: string;
}) => invoke("save_file", { content: content, path: path });

export const CreateFile = async ({ path }: { path: string }) => {
  const fullPath = await join(await GetApplicationPath(), path);

  return invoke("create_file", { path: fullPath });
};

export const CreateDirectory = async ({ path }: { path: string }) => {
  const fullPath = await join(await GetApplicationPath(), path);

  return invoke("create_directory", { path: fullPath });
};

export const CreateApplicationDirectory = async () =>
  invoke("create_directory", { path: await GetApplicationPath() });

export const FetchAllFilesAndDirectories = async () => {
  const baseDir = await homeDir();
  const hiddenBase = await join(baseDir, ".notespace/");

  return invoke("list_files", { path: hiddenBase }) as Promise<string[]>;
};

/**
 * Reads and returns the entire contents of a file.
 *
 * @param path path to the file.
 * @returns file contents.
 */
export const ReadTextFile = async ({ path }: { path: string }) => {
  if (await CheckExtenionFromPath({ path: path })) {
    return invoke("read_file", { path: path });
  } else {
    return Promise.reject("File has incorrect extention");
  }
};

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
 * helper function that validates a file extention against the following allowed extensions:
 *
 * - `.txt`
 * - `.md`
 *
 * @param extention Extention as a string
 * @returns true if valid,otherwise false.
 */
const CheckValidFileExtention = ({ extention }: { extention: string }) =>
  ["txt", "md"].includes(extention);
