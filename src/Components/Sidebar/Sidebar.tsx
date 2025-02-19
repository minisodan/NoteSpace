import BottomBar from "../BottomBar/BottomBar";
import Directories from "../Directories/Directories";
import { FILE_CREATION_MODE, FileCreation, FileCreationMode } from "../FileCreation/FileCreation";
import { DeleteFileByFullPath, FetchAllFilesAndDirectories, StripFileNameFromPath } from "../Utils/FileManagement";
import { useState, useEffect } from "react";
import { ConfirmationPopup } from "../Widgets/ConfirmationPopup";

const Sidebar = ({ navigate }: { navigate: (path: string) => void }) => {
  const [directories, setDirectories] = useState<any[]>([]);

  const [fileCreationMode, setFileCreationMode] = useState<
    FileCreationMode | undefined
  >(undefined);
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
  // re arrage file structure
  return (
    <>
      <div className="h-screen w-52 bg-neutral-800 text-white flex flex-col hide-scrollbar">
        <div className="m-2">
          {fileCreationMode && (
            <FileCreation
              key={fileCreationKey}
              fileCreationMode={fileCreationMode ?? FILE_CREATION_MODE.FILE}
              onComplete={fetchedData}
            />
          )}
        </div>
        {deletePath && 
          <ConfirmationPopup 
            bodyText={`Are you sure you want to delete '${StripFileNameFromPath({path: deletePath ?? ""})}'?`}
            onCancel={() => setDeletePath(undefined)}
            onConfirm={() => {
              DeleteFileByFullPath({path: deletePath})
              fetchedData()
              setDeletePath(undefined)
            }}>
          </ConfirmationPopup>
        }
        <div className="flex-grow overflow-y-auto">
          <Directories directories={directories} onDelete={(path) => {setDeletePath(path)}}/>
        </div>
        <div className="mt-auto">
          <BottomBar
            navigate={navigate}
            onFileClick={() => updateFileCreation(FILE_CREATION_MODE.FILE)}
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
