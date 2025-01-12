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
  // Grab the user's base directory; this will need to change at some point.
  const baseDir = await homeDir();
  const hiddenBase = await join(baseDir, ".notepad");
  const fullPath = await join(hiddenBase, name);

  return invoke("create_directory", { path: fullPath }); // Ensure `name` matches the expected parameter type
};
