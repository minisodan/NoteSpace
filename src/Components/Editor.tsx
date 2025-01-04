import Sidebar from "./Sidebar";

const Editor = () => {
  return (
    <div className="w-full h-screen flex p-0 m-0 bg-stone-900">
      <Sidebar />
      <textarea className="w-full outline-none focus:outline-none overflow-hidden overflow-y-auto text-neutral-300 resize-none bg-stone-900 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-stone-600 p-4 rounded border border-gray-700" />
    </div>
  );
};

export default Editor;
