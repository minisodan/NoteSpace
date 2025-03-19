import {
  FileCreationMode,
  FileCreation,
  FILE_CREATION_MODE,
} from "../../Types/FileCreation";
import FileListings from "../../FileListings/FileListings";
import ConfirmDialog from "./ConfirmDialog/ConfirmDialog";
import { FileType } from "../../Types/FileType";

const FileManager = ({
  deletePath,
  fileListings,
  fileCreationMode,
  fileCreationKey,
  fetchedData,
  onDelete,
  onConfirm,
  onOpen,
  onCancel
}: {
  deletePath?: string;
  fileListings: FileType[];
  fileCreationMode?: FileCreationMode;
  fileCreationKey?: number;
  fetchedData: (path: string) => void;
  onOpen?: (fileType: FileType) => void;
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
        <FileListings fileListings={fileListings} onOpen={onOpen} onDelete={onDelete}/>
      </div>
    </>
  );
};

export default FileManager;
