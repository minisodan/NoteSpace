import {
  FileCreationMode,
  FileCreation,
  FILE_CREATION_MODE,
} from "../../Types/FileCreation";
import FileListings from "./FileListings/FileListings";
import ConfirmDialog from "./ConfirmDialog/ConfirmDialog";
import { FileType } from "../../Types/FileType";

const FileManager = ({
  deletePath,
  fileCreationMode,
  fileCreationKey,
  onDelete,
  onConfirm,
  onComplete,
  onOpen,
  onCancel
}: {
  deletePath?: string;
  fileCreationMode?: FileCreationMode;
  fileCreationKey?: number;
  onOpen?: (fileType: FileType) => void;
  onDelete?: (path: string) => void;
  onComplete?: (path: string) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}) => (
  <>
    <div className="m-2">
      {fileCreationMode && (
        <FileCreation
          key={fileCreationKey}
          fileCreationMode={fileCreationMode ?? FILE_CREATION_MODE.FILE}
          onComplete={fullPath => onComplete ? onComplete(fullPath) : {}}
        />
      )}
    </div>
    <ConfirmDialog 
      deletePath={deletePath} 
      onConfirm={() => {
        if (onConfirm) onConfirm()
      }} 
      onCancel={onCancel}/>
    <div className="flex-grow overflow-y-auto">
      <FileListings onOpen={onOpen} onDelete={onDelete}/>
    </div>
  </>
);

export default FileManager;
