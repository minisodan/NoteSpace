import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { platform } from "@tauri-apps/plugin-os";
import { useStore } from "../Utils/Store";
import { readTextFile } from "../Utils/FileManagement";


const Editor = () => {
  const [content, setContent] = useState('')
  const openFiles = useStore(state => state.openFiles)
  
  useEffect(() => {
    async function fetchFileContent() {
      const openFile = Object.keys(openFiles)[0]
      setContent(await readTextFile({path: openFile}))
    }
    fetchFileContent()
  }, [openFiles])

  return (
    <div className="w-full h-screen flex p-0 m-0 bg-stone-900">
      <Sidebar/>
      <textarea
        className={`w-full text-neutral-300 resize-none outline-none bg-stone-900 
        scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full 
        scrollbar-thumb-neutral-500 scrollbar-track-stone-900 hover:scrollbar-thumb-neutral-400 mx-2 ${
          platform() === "macos" ? "p-2" : "p-4"
        }`}
        value={content}
        onChange={e => setContent(e.target.value)}
      />
    </div>
  );
};

export default Editor;
