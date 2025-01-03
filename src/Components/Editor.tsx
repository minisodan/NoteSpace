import Sidebar from "./Sidebar";

const Editor = () => {
  return (
    <div className="w-full h-screen flex p-0 m-0 bg-stone-900">
      <Sidebar />
      <textarea className="w-full h-full text-neutral-300 resize-none m-4 outline-none bg-stone-900" />
    </div>
  );
};

export default Editor;
