import { invoke } from "@tauri-apps/api/core";
import { homeDir } from "@tauri-apps/api/path";
import { join } from "@tauri-apps/api/path";

export const SaveFile = ({
  content,
  path,
}: {
  content: string;
  path: string;
}) => invoke("save_file", { content: content, path: path });

export const CreateFile = ({ path }: { path: string }) =>
  invoke("create_file", { path: path });

export const CreateDirectory = async ({ name }: { name: string }) => {
  // grabs the users base directory, this will need to change at somepoint.
  const baseDir = await homeDir();
  const fullPath = await join(baseDir, name);

  return invoke("create_directory", { path: fullPath });
};
