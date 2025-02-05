import BottomBar from "./BottomBar";
import Directories from "./Directories";
import {
  FILE_CREATION_MODE,
  FileCreation,
  FileCreationMode,
} from "./FileCreation";
import { FetchAllFilesAndDirectories } from "./Utils/FileManagement";
import { useState, useEffect } from "react";

const Sidebar = ({ navigate }: { navigate: (path: string) => void }) => {
  const [directories, setDirectories] = useState<any[]>([]);

  const [fileCreationMode, setFileCreationMode] = useState<
    FileCreationMode | undefined
  >(undefined);
  const [fileCreationKey, setFileCreationKey] = useState<number>(0);

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
        <div className="flex-grow overflow-y-auto">
          <Directories directories={directories} />
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
