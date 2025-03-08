import { load } from "@tauri-apps/plugin-store"
import { FileMetadata } from "../Types/FileMetadata"

/**
 * A reference to the persistent file cache holding open file metadata.
 */
const store = await load('file-cache.json', { autoSave: false})

{/**
	The issue is when you open a directory in the app, it does not know that you are actually in that directory. 

	create away to functionally use open so that you know which directory you are in.
*/}

/**
 * Closes all open files.
 * 
 * @returns Promise of whether the function completed successfully.
 */
export const CloseAll = async () => await store.clear()

/**
 * Closes a file with the given path.
 * 
 * @returns Promise of whether the function completed successfully.
 */
export const Close = async (path: string) => await store.delete(path)

/**
 * Opens a open file with the given path.
 * 
 * @returns Promise of whether the function completed successfully.
 */
export const Open = async (filetype: FileType, value?: FileMetadata) => {
	let path = filetype.path;
	let openFile: FileMetadata | undefined = await store.get(path)

	await store.set(path, value ?? openFile ?? {dirty: false})
	await store.save()
}

/**
 * Lists all open files.
 * 
 * @returns Promise of all open files.
 */
export const ListOpenFiles = async () => await store.entries()