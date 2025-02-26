import { load } from "@tauri-apps/plugin-store"
import { FileMetadata } from "../Types/FileMetadata"

/**
 * A reference to the store holding open file metadata.
 */
const store = await load('file-cache.json', { autoSave: false})

/**
 * Closes all open files.
 * @returns Promise of whether the function completed successfully.
 */
export const CloseAll = async () => await store.clear()

/**
 * Closes a file with the given path.
 * @returns Promise of whether the function completed successfully.
 */
export const Close = async (path: string) => await store.delete(path)

/**
 * Opens a open file with the given path.
 * @returns Promise of whether the function completed successfully.
 */
export const Open = async (path: string, value?: FileMetadata) => {
	let openFile: FileMetadata | undefined = await store.get(path)

	await store.set(path, value ?? openFile ?? {dirty: false})
	await store.save()
}

/**
 * Lists all open files.
 * @returns Promise of all open files.
 */
export const ListOpenFiles = async () => await store.entries()