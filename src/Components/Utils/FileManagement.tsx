import { invoke } from "@tauri-apps/api/core";

export const SaveFile = ({
  content,
  path,
}: {
  content: string;
  path: string;
}) => invoke("save_file", { content: content, path: path });
