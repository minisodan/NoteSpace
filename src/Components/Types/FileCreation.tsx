import { CreateDirectory, CreateFile } from "../Utils/FileManagement";
import { FocusInput } from "../Widgets/TransientInput";
import { GetDirectory } from "../Utils/Store";
import { sep } from '@tauri-apps/api/path';;

/**
 * A file creation type that defines file operations that can be performed.
 */
export interface FileCreationMode {
	readonly create: ({ path }: { path: string }) => Promise<unknown>
	readonly name: string
}

/**
 * Implementations for different FileCreationModes:
 * File -> Create a File
 * Directory -> Create a Directory
 */
export const FILE_CREATION_MODE = {
	FILE: {
		create: CreateFile,
		name: 'File'
	} as FileCreationMode,
	DIRECTORY: {
		create: CreateDirectory,
		name: 'Directory'
	} as FileCreationMode
}

/**
 * An Input component that on completion, performs the file operation specified on the value inputted.
 * 
 * @param mode FileCreationMode specifier
 * @param onComplete callback that performs arbitrary functions on completion of file operation.
 * @returns file creation input element
 */
export const FileCreation = ({
	fileCreationMode, 
	onComplete
}: {
  fileCreationMode: FileCreationMode
  onComplete?: (path: string) => void 
}) => 
	<FocusInput 
		placeholder={`${fileCreationMode.name} name...`} 
		onComplete={ async (path: string) => {
			const osSeparator = await sep();
			let fullPath = `${await GetDirectory()}${osSeparator}${path}`
			console.log(`HELLO ${fullPath}`)

			path ? fileCreationMode.create({path: fullPath}).then(() => onComplete ? onComplete(fullPath) : {}) : {}
		}
    }/>