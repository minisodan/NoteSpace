import {
  FileCreationMode,
  FileCreation,
  FILE_CREATION_MODE,
} from "../../Types/FileCreation";
import Directories from "../../Directories/Directories";
import ConfirmDialog from "./ConfirmDialog/ConfirmDialog";

const FileManager = ({
  deletePath,
  directories,
  fileCreationMode,
  fileCreationKey,
  fetchedData,
  onDelete,
  onConfirm,
  onCancel
}: {
  deletePath?: string;
  directories: string[];
  fileCreationMode?: FileCreationMode;
  fileCreationKey?: number;
  fetchedData: (path: string) => void;
  onDelete?: (path: string) => void;
  onComplete?: (path: string) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}) => {
  return (
    <>
      <div className="m-2">
        {fileCreationMode && (
          <FileCreation
            key={fileCreationKey}
            fileCreationMode={fileCreationMode ?? FILE_CREATION_MODE.FILE}
            onComplete={fetchedData}
          />
        )}
      </div>
      <ConfirmDialog deletePath={deletePath} onConfirm={onConfirm} onCancel={onCancel}/>
      <div className="flex-grow overflow-y-auto">
        <Directories directories={directories} onDelete={onDelete} />
      </div>
    </>
  );
};

export default FileManager;
