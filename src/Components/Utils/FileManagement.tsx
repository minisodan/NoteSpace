import { invoke } from "@tauri-apps/api/core";
import { homeDir, join } from "@tauri-apps/api/path";
import { platform } from '@tauri-apps/plugin-os';

const GetApplicationPath = async () => 
  await join(await homeDir(), ".notespace");

export const SaveFile = ({
  content,
  path,
}: {
  content: string;
  path: string;
}) => invoke("save_file", { content: content, path: path });

export const CreateFile = ({ path }: { path: string }) =>
  invoke("create_file", { path: path });

export const CreateDirectory = async ({ path }: { path: string }) => {
  const fullPath = await join(await GetApplicationPath(), path);

  return invoke("create_directory", { path: fullPath });
};

export const CreateApplicationDirectory = async () => 
  invoke("create_directory", {path: await GetApplicationPath()})

export const FetchDirectories = async () => {
  const baseDir = await homeDir();
  const hiddenBase = await join(baseDir, ".notespace/");

  return invoke("list_files", { path: hiddenBase }) as Promise<string[]>;
};

export const StripFileNameFromPath = ({
  path
}: {
  path: string
}) => {
  // for a given path, remove everything other than the final path and extension
  let fileName = path.substring((platform() === "windows" ? path.lastIndexOf("\\") : path.lastIndexOf("/")) + 1, path.length)
  
  // if the fileName has an extension, remove it.
  return fileName.substring(0, fileName.includes(".") ? fileName.indexOf(".") : fileName.length)
}