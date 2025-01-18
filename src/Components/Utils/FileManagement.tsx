import { invoke } from "@tauri-apps/api/core";
import { homeDir, join } from "@tauri-apps/api/path";

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
  const baseDir = await homeDir();
  const hiddenBase = await join(baseDir, ".notespace");
  const fullPath = await join(hiddenBase, path);

  return invoke("create_directory", { path: fullPath });
};

export const FetchDirectories = async () => {
  const baseDir = await homeDir();
  const hiddenBase = await join(baseDir, ".notespace/");

  return invoke("list_files", { path: hiddenBase }) as Promise<string[]>;
};
