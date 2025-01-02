import { PiFilePlusDuotone } from "react-icons/pi";
import { PiFolderSimplePlus } from "react-icons/pi";
import { PiGearLight } from "react-icons/pi";
import { useState } from "react";

const BottomBar = () => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <div className="flex flex-row justify-around m-2 p-2 gap-4 text-white">
      <div
        className="relative p-1 rounded-md bg-transparent text-white hover:bg-gray-700 hover:text-white cursor-pointer transition duration-300"
        onMouseEnter={() => setHoveredButton("file")}
        onMouseLeave={() => setHoveredButton(null)}
      >
        <PiFilePlusDuotone size={18} />
        {hoveredButton === "file" && (
          <div className="absolute bottom-full mb-2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md whitespace-nowrap">
            New File
          </div>
        )}
      </div>
      <div
        className="relative p-1 rounded-md bg-transparent text-white hover:bg-gray-700 hover:text-white cursor-pointer transition duration-300"
        onMouseEnter={() => setHoveredButton("folder")}
        onMouseLeave={() => setHoveredButton(null)}
      >
        <PiFolderSimplePlus size={18} />
        {hoveredButton === "folder" && (
          <div className="absolute bottom-full mb-2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md whitespace-nowrap">
            New Folder
          </div>
        )}
      </div>
      <div
        className="relative p-1 rounded-md bg-transparent text-white hover:bg-gray-700 hover:text-white cursor-pointer transition duration-300"
        onMouseEnter={() => setHoveredButton("settings")}
        onMouseLeave={() => setHoveredButton(null)}
      >
        <PiGearLight size={18} />
        {hoveredButton === "settings" && (
          <div className="absolute bottom-full mb-2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md whitespace-nowrap">
            Settings
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomBar;
