import BottomBar from "./BottomBar";

const Sidebar = ({ navigate }: { navigate: (path: string) => void }) => {
  return (
    <>
      <div className="h-screen w-52 bg-neutral-800 text-white flex flex-col">
        <div className="mt-auto">
          <BottomBar navigate={navigate} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
