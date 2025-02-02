import BottomBar from "./BottomBar";
import Directories from "./Directories";
import { DIRECTORY, FILE, FileCreation, FileCreationMode } from "./FileCreation";
import { FetchFiles } from "./Utils/FileManagement";
import { useState } from "react";

const Sidebar = ({ navigate }: { navigate: (path: string) => void }) => {
  const [directories, setDirectories] = useState<any[]>([]);

  const [fileCreationMode, setFileCreationMode] = useState<FileCreationMode | undefined>(undefined)
  const [fileCreationKey, setFileCreationKey] = useState<number>(0)

  const updateFileCreation = (mode: FileCreationMode) => {
    setFileCreationKey(fileCreationKey + 1)
    setFileCreationMode(mode)
  }

  const fetchedData = async () => {
    const fetchedDirectories = await FetchFiles();
    setDirectories(fetchedDirectories);
  }

  fetchedData();

  return (
    <>
      <div className="h-screen w-52 bg-neutral-800 text-white flex flex-col hide-scrollbar">
        <div className="m-2">
          {fileCreationMode && 
            <FileCreation 
              key={fileCreationKey} 
              mode={fileCreationMode ?? FILE}
              onComplete={fetchedData}
            />
          }
        </div>
        <div className="flex-grow overflow-y-auto">
          <Directories directories={directories} />
        </div>
        <div className="mt-auto">
          <BottomBar 
            navigate={navigate} 
            onFileClick={() => updateFileCreation(FILE)}
            onFolderClick={() => updateFileCreation(DIRECTORY)} 
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
