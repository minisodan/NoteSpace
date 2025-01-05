import { invoke } from "@tauri-apps/api/core";

export const SaveFile = ({
  content,
  path,
}: {
  content: string;
  path: string;
}) => invoke("save_file", { content: content, path: path });

export const CreateFile = ({ path }: { path: string }) =>
  invoke("create_file", { path: path });
