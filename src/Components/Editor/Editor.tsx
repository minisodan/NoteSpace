import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { platform } from "@tauri-apps/plugin-os";

const Editor = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex p-0 m-0 bg-stone-900">
      <Sidebar navigate={navigate} />
      <textarea
        className={`w-full text-neutral-300 resize-none outline-none bg-stone-900 
        scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full 
        scrollbar-thumb-neutral-500 scrollbar-track-stone-900 hover:scrollbar-thumb-neutral-400 mx-2 ${
          platform() === "macos" ? "p-2" : "p-4"
        }`}
      />
    </div>
  );
};

export default Editor;
