import BottomBar from "../BottomBar/BottomBar";
import { FILE_CREATION_MODE, FileCreationMode } from "../Types/FileCreation";
import { DeleteFileByFullPath, FetchAllFilesAndDirectories } from "../Utils/FileManagement";
import { useState, useEffect } from "react";
import FileManager from "./FileManager/FileManager";
import { CloseAll, Open } from "../Utils/Store";

const Sidebar = ({ navigate }: { navigate: (path: string) => void }) => {
  const [directories, setDirectories] = useState<any[]>([]);
  const [fileCreationMode, setFileCreationMode] = useState<FileCreationMode | undefined>(undefined);
  const [fileCreationKey, setFileCreationKey] = useState<number>(0);
  const [deletePath, setDeletePath] = useState<string | undefined>(undefined)

  const updateFileCreation = (mode: FileCreationMode) => {
    setFileCreationKey(fileCreationKey + 1);
    setFileCreationMode(mode);
  };

  const fetchedData = async () => {
    const fetchedDirectories = await FetchAllFilesAndDirectories();
    setDirectories(fetchedDirectories);
  };

  useEffect(() => {
    fetchedData();
  });

  // encapsulate file creation and confirmation pop up and directories into parent componnent.
  return (
    <>
      <div className="h-screen w-52 bg-neutral-800 text-white flex flex-col hide-scrollbar">
        <FileManager
          deletePath={deletePath}
          directories={directories}
          fileCreationMode={fileCreationMode}
          fileCreationKey={fileCreationKey}
          fetchedData={fetchedData}
          onDelete={path => setDeletePath(path)}
          onOpen={path => {
            CloseAll()
            Open(path)
          }}
          onConfirm={() => {
            deletePath && DeleteFileByFullPath({ path: deletePath });
            fetchedData();
            setDeletePath(undefined);
          }}
          onCancel={() => setDeletePath(undefined)}
        />
        <div className="mt-auto">
          <BottomBar
            navigate={navigate}
            onFileClick={() => 
              updateFileCreation(FILE_CREATION_MODE.FILE)}
            onFolderClick={() =>
              updateFileCreation(FILE_CREATION_MODE.DIRECTORY)
            }
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
