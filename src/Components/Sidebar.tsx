import BottomBar from "./BottomBar";

const Sidebar = () => {
  return (
    <>
      <div className="h-screen w-52 bg-gray-900 text-white flex flex-col">
        {/* 
        Sidebar content will here:
            custom title bar,
            files and directories.       
      */}
        <div className="mt-auto">
          <BottomBar />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
