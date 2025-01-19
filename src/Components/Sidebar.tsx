import BottomBar from "./BottomBar";
import Directories from "./Directories";
import { FetchDirectories, StripFileNameFromPath } from "./Utils/FileManagement";
import { useEffect, useState } from "react";

const Sidebar = ({ navigate }: { navigate: (path: string) => void }) => {
  const [directories, setDirectories] = useState<any[]>([]);

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const fetchedDirectories = await FetchDirectories();
        console.log("Fetched directories:", fetchedDirectories);
        setDirectories(fetchedDirectories);
      } catch (error) {
        console.log(error);
      }
    };

    fetchedData();
  }, []);

  return (
    <>
      <div className="h-screen w-52 bg-neutral-800 text-white flex flex-col hide-scrollbar">
        <div className="flex-grow overflow-y-auto">
          <Directories directories={directories} />
        </div>
        <div className="mt-auto">
          <BottomBar navigate={navigate} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
