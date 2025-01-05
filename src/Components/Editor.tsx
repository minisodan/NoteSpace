import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const Editor = () => {
  // Detect the platform using navigator.userAgent
  const isMac = /Mac|iPhone|iPad/.test(navigator.userAgent);
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex p-0 m-0 bg-stone-900">
      <Sidebar navigate={navigate} />
      <textarea
        className={`w-full text-neutral-300 resize-none outline-none bg-stone-900 
        scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full 
        scrollbar-thumb-neutral-500 scrollbar-track-stone-900 hover:scrollbar-thumb-neutral-400 ${
          isMac ? "p-2" : "p-4"
        }`}
      />
    </div>
  );
};

export default Editor;
