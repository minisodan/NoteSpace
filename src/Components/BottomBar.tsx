import { PiFilePlusDuotone } from "react-icons/pi";
import { PiFolderSimplePlus } from "react-icons/pi";
import { PiGearLight } from "react-icons/pi";
import { ReactNode, useState } from "react";

interface OutterDivProps {
  children: ReactNode;
}

interface InnerDivProps {
  children: ReactNode;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

interface InnerHoverDivProps {
  children: string;
}

const OutterDiv = ({ children }: OutterDivProps) => {
  return (
    <div className="flex flex-row justify-around m-2 p-2 gap-4 text-white">
      {children}
    </div>
  );
};

const InnerDiv = ({ children, onMouseEnter, onMouseLeave }: InnerDivProps) => {
  return (
    <div
      className="relative p-1 rounded-md bg-transparent text-white hover:bg-gray-700 hover:text-white cursor-pointer transition duration-300"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};

const InnerHoverDiv = ({ children }: InnerHoverDivProps) => {
  return (
    <div className="absolute bottom-full mb-2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md whitespace-nowrap">
      {children}
    </div>
  );
};

const BottomBar = () => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  return (
    <OutterDiv>
      <InnerDiv
        onMouseEnter={() => setHoveredButton("file")}
        onMouseLeave={() => setHoveredButton(null)}
      >
        <PiFilePlusDuotone size={18} />
        {hoveredButton === "file" && <InnerHoverDiv>New File</InnerHoverDiv>}
      </InnerDiv>
      <InnerDiv
        onMouseEnter={() => setHoveredButton("folder")}
        onMouseLeave={() => setHoveredButton(null)}
      >
        <PiFolderSimplePlus size={18} />
        {hoveredButton === "folder" && (
          <InnerHoverDiv>New Folder</InnerHoverDiv>
        )}
      </InnerDiv>
      <InnerDiv
        onMouseEnter={() => setHoveredButton("settings")}
        onMouseLeave={() => setHoveredButton(null)}
      >
        <PiGearLight size={18} />
        {hoveredButton === "settings" && (
          <InnerHoverDiv>Settings</InnerHoverDiv>
        )}
      </InnerDiv>
    </OutterDiv>
  );
};

export default BottomBar;
