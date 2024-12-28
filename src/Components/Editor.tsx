import Sidebar from "./Sidebar";

const Editor = () => {
  return (
    <div className="w-full h-screen flex p-0 m-0">
      <Sidebar />
      <textarea className="w-full h-full resize-none" />
    </div>
  );
};

export default Editor;
