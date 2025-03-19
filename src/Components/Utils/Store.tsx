import { load } from "@tauri-apps/plugin-store"
import { FileMetadata } from "../Types/FileMetadata"

/**
 * A reference to the persistent file cache holding open file metadata.
 */
const store = await load('file-cache.json', { autoSave: false})
const OPEN_FILES: string = 'openFiles'
const CURRENT_DIRECTORY: string = 'currentDirectory'

/**
 * Closes all open files.
 */
export const CloseAllFiles = async () => await store.set(OPEN_FILES, {})

/**
 * Closes a file with the given path.
 */
export const CloseFile = async (path: string) => {
	let currentOpenFiles = await ListFiles()
	delete currentOpenFiles[path]

	await store.set(OPEN_FILES, currentOpenFiles)
}

/**
 * Function to delegate to OpenFile or OpenDirectory based on if the pasted in FileType is a directory or not.
 * 
 * @param fileType FileType object that has the path attached
 * @param value optional Metadata
 */
export const Open = async (fileType: FileType, value?: FileMetadata) => {
	fileType.isDirectory ? OpenDirectory(fileType) : OpenFile(fileType, value)
}

/**
 * Opens a open file with the given path.
 */
const OpenFile = async (filetype: FileType, value?: FileMetadata) => {
	let currentOpenFiles = await ListFiles()

	let path = filetype.path;
	let openFile: FileMetadata | undefined = currentOpenFiles[path]

	currentOpenFiles[path] = (value ?? openFile ?? {dirty: false})

	await store.set(OPEN_FILES, currentOpenFiles)
	await store.save()
}

/**
 * Opens a Open Directory with the given path.
 */
const OpenDirectory = async (directory: FileType) => {
	await store.set(CURRENT_DIRECTORY, directory.path);
	await store.save();
}

/**
 * Lists all open files.
 */
export const ListFiles: () => Promise<{[key: string]: FileMetadata}> = async () => await store.get(OPEN_FILES) ?? {}

/**
 * Funtion to fetch the current directory in the cache.
 * 
 * @returns The Current path as a FileType
 */
export const GetDirectory = async () => {
	return await store.get(CURRENT_DIRECTORY) as FileType;
}