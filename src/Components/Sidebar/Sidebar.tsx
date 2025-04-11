import BottomBar from "../BottomBar/BottomBar";
import { FILE_CREATION_MODE, FileCreationMode } from "../Types/FileCreation";
import { deleteFile } from "../Utils/FileManagement";
import { useState } from "react";
import FileManager from "./FileManager/FileManager";
import { useStore } from "../Utils/Store";

const Sidebar = () => {
  const [fileCreationMode, setFileCreationMode] = useState<FileCreationMode | undefined>(undefined);
  const [fileCreationKey, setFileCreationKey] = useState<number>(0);
  const [deletePath, setDeletePath] = useState<string | undefined>(undefined)

  const updateFileCreation = (mode: FileCreationMode) => {
    setFileCreationKey(fileCreationKey + 1);
    setFileCreationMode(mode);
  };

  const setWorkingDirectory = useStore(state => state.setWorkingDirectory)
  const closeAllFiles = useStore(state => state.closeAllFiles)
  const openFile = useStore(state => state.openFile)

  // encapsulate file creation and confirmation pop up and directories into parent componnent.
  return (
    <>
      <div className="h-screen w-52 bg-neutral-800 text-white flex flex-col hide-scrollbar">
        <FileManager
          deletePath={deletePath}
          fileCreationMode={fileCreationMode}
          fileCreationKey={fileCreationKey}
          onDelete={path => setDeletePath(path)}
          onOpen={fileType => {
            console.log(fileType)
            if (fileType.isDirectory) {
              setWorkingDirectory({path: fileType.path})
            } else {
              closeAllFiles()
              openFile({path: fileType.path})
            }
          }}
          onConfirm={() => {
            deletePath && deleteFile({ path: deletePath });
            setDeletePath(undefined);
          }}
          onCancel={() => setDeletePath(undefined)}
        />
        <div className="mt-auto">
          <BottomBar
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
