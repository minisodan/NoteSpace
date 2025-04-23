import { load } from "@tauri-apps/plugin-store"
import { create } from 'zustand'
import { FileMetadata } from "../Types/FileMetadata"
import { deleteObjectKeyValue, safeObjectAccess, setObjectKeyValue } from "./Helpers"
import { APPLICATION_PATH } from "./FileManagement"

// type defintion for the object that stores file data
export type FileList = {[key: string]: FileMetadata}

// Keys used to define different atttributes stored in memory and in primary storage.
const OPEN_FILES = 'openFiles'
const WORKING_DIRECTORY = 'workingDirectory'

// get a reference to the current values saved, and the store itself.
const _store = await load('state-cache.json', { autoSave: false})
const _openFiles = (await _store.get(OPEN_FILES) ?? {}) as FileList
const _workingDirectory = (await _store.get(WORKING_DIRECTORY) ?? APPLICATION_PATH) as string

// definition of in memory state
interface ApplicationState {
  openFiles: FileList
  workingDirectory: string
  openFile: (path: string, metadata?: FileMetadata) => void
  closeFile: (path: string) => void
  closeAllFiles: () => void
  setWorkingDirectory: (path: string) => void
}

/**
 * save a given value to the key persistently.
 *
 * @param key value to use as persistent key
 * @param state value to store to key
 * @returns the state saved
 */
function _saveToPrimaryStorage(key: string, state: any): ApplicationState {
  _store.set(key, state)
  _store.save()
  return state
}

/**
 * Store definition
 * 
 * openFiles - the variable keeping track of the current open files.
 * workingDirectory - the variable keeping track of the current open directory of the user.
 * openFiles - function to open a given file
 * closeFile - function to close a given file
 * closeAllFiles - function to close all open files
 * setWorkingDirectory - function to set the current working directory
 */
export const useStore = create<ApplicationState>(set => ({
	openFiles: _openFiles,
	workingDirectory: _workingDirectory,
	openFile: (path, metadata = {dirty: false}) => set(state => {
    const isFileOpen = !!safeObjectAccess(state.openFiles, path)
    
    if (isFileOpen) return state

    const openFiles = setObjectKeyValue(state.openFiles, path, metadata)
    const updatedState = setObjectKeyValue(
      state, 
      OPEN_FILES, 
      openFiles
    ) 

    _saveToPrimaryStorage(OPEN_FILES, updatedState.openFiles)
    return updatedState
  }),
  closeFile: (path) => set(state => {
    const isFileOpen = !!safeObjectAccess(state.openFiles, path)
    
    if (!isFileOpen) return state

    const openFiles = deleteObjectKeyValue(state.openFiles, path)
    const updatedState = setObjectKeyValue(
      state, 
      OPEN_FILES, 
      openFiles
    ) 

    _saveToPrimaryStorage(OPEN_FILES, updatedState.openFiles)
    return updatedState
  }),
  closeAllFiles: () => set(state => {
    const anyFilesOpen = Object.keys(state?.openFiles ?? {}).length > 0

    if (!anyFilesOpen) return state

    const updatedState = setObjectKeyValue(
      state,
      OPEN_FILES,
      {}
    )
    
    _saveToPrimaryStorage(OPEN_FILES, updatedState.openFiles)
    return updatedState
  }),
  setWorkingDirectory: (workingDirectory) => set(state => {
    const sameWorkingDirectory = workingDirectory === state.workingDirectory
    
    if (sameWorkingDirectory) return state
      
    const updatedState = setObjectKeyValue(
      state,
      WORKING_DIRECTORY,
      workingDirectory 
    )

    _saveToPrimaryStorage(WORKING_DIRECTORY, updatedState.workingDirectory)
    return updatedState
  })
}))