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

export const CreateDirectory = async ({ path }: { path: string }) => {
  // Grab the user's base directory; this will need to change at some point.
  const baseDir = await homeDir();
  const hiddenBase = await join(baseDir, ".notespace");
  const fullPath = await join(hiddenBase, path);

  return invoke("create_directory", { path: fullPath }); // Ensure `name` matches the expected parameter type
};
