import { CreateDirectory, CreateFile } from "./Utils/FileManagement";
import { FocusInput } from "./Widgets/FocusInput";


export interface FileCreationMode {
	readonly create: ({ path }: { path: string }) => Promise<unknown>
	readonly name: string
}

export const FILE: FileCreationMode = {
	create: CreateFile,
	name: 'File'
}

export const DIRECTORY: FileCreationMode = {
	create: CreateDirectory,
	name: 'Directory'
}

export const FileCreation = ({
	mode, 
	onComplete
}: {
  mode: FileCreationMode
  onComplete?: (path: string) => void 
}) => 
	<FocusInput 
		placeholder={`${mode.name} name...`} 
		onComplete={(path: string) => 
      path ? mode.create({path: path})
        .then(() => onComplete ? onComplete(path) : {}) 
        : {}
    }
	/>