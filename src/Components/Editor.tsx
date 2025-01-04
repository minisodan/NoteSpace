import Sidebar from "./Sidebar";

const Editor = () => {
  return (
    <div className="w-full h-screen flex p-0 m-0 bg-stone-900">
      <Sidebar />
      <textarea className="w-full text-neutral-300 resize-none p-4 outline-none bg-stone-900 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-neutral-500 scrollbar-track-stone-900 overflow-y-auto pr-2 mr-2 scrollbar" />
    </div>
  );
};

export default Editor;
