import { load } from "@tauri-apps/plugin-store"
import { create } from 'zustand'
import { FileMetadata } from "../Types/FileMetadata"

const OPEN_FILES: string = 'openFiles'
const WORKING_DIRECTORY: string = 'workingDirectory'

const _store = await load('state-cache.json', { autoSave: false})
const _openFiles = await _store.get(OPEN_FILES) as {[key: string]: FileMetadata}
const _workingDirectory = await _store.get(WORKING_DIRECTORY) as string

interface ApplicationState {
  openFiles: { [key: string]: FileMetadata }
  workingDirectory: string
  openFile: ({
    path, 
    metadata
  }: {
    path: string 
    metadata?: FileMetadata
  }) => void
  closeFile: ({ path }: { path: string }) => void
  closeAllFiles: () => void
  setWorkingDirectory: ({ path }: {path: string }) => void
}

const executeAndSave = (key: string, state: any) => (
  _store.set(key, state),
  _store.save(),
  state
)

export const useStore = create<ApplicationState>(set => ({
	openFiles: _openFiles,
	workingDirectory: _workingDirectory,
	openFile: ({ path, metadata = {dirty: false} }) => set(state => (
    !state.openFiles[path] && (
      state.openFiles[path] = metadata, 
      executeAndSave(OPEN_FILES, state.openFiles)
    ), state
  )),
  closeFile: ({ path }) => set(state => (
    delete state.openFiles[path], 
    executeAndSave(OPEN_FILES, state.openFiles)
  )),
  closeAllFiles: () => set(state => (
    state.openFiles = {},
    executeAndSave(OPEN_FILES, state.openFiles)
  )),
  setWorkingDirectory: ({ path }) => set(state => (
    state.workingDirectory = path,
    executeAndSave(WORKING_DIRECTORY, state.workingDirectory)
  )) 
}))