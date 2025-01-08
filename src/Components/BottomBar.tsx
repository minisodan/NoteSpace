import { PiFilePlusDuotone } from "react-icons/pi";
import { PiFolderSimplePlus } from "react-icons/pi";
import { PiGearLight } from "react-icons/pi";
import { ReactNode, useState } from "react";

interface BottomBarContainerProps {
  children: ReactNode;
}

interface BottomBarButtonProps {
  children: ReactNode;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
  isPressed: boolean;
  onClick: () => void;
}

interface BottomBarHoverButtonProps {
  children: string;
}

const BottomBarContainer = ({ children }: BottomBarContainerProps) => {
  return (
    <div className="flex flex-row justify-around m-2 p-2 gap-4 text-white select-none">
      {children}
    </div>
  );
};

const BottomBarButton = ({
  children,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  isPressed,
  onClick,
}: BottomBarButtonProps) => {
  return (
    <div
      className={`relative p-1 rounded-md bg-transparent text-white ${
        isPressed ? "bg-neutral-800" : "hover:bg-neutral-500"
      } cursor-pointer transition duration-150`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const BottomBarHoverButton = ({ children }: BottomBarHoverButtonProps) => {
  return (
    <div className="absolute bottom-full mb-2 px-2 py-1 bg-neutral-700 text-neutral-300 text-sm rounded-md whitespace-nowrap">
      {children}
    </div>
  );
};

const BottomBar = ({ navigate }: { navigate: (path: string) => void }) => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [pressedButton, setPressedButton] = useState<string | null>(null);
  return (
    <BottomBarContainer>
      <BottomBarButton
        onMouseEnter={() => setHoveredButton("file")}
        onMouseLeave={() => setHoveredButton(null)}
        onMouseDown={() => setPressedButton("file")}
        onMouseUp={() => setPressedButton(null)}
        isPressed={pressedButton === "file"}
        onClick={() => ""}
      >
        <PiFilePlusDuotone size={18} />
        {hoveredButton === "file" && (
          <BottomBarHoverButton>New File</BottomBarHoverButton>
        )}
      </BottomBarButton>
      <BottomBarButton
        onMouseEnter={() => setHoveredButton("folder")}
        onMouseLeave={() => setHoveredButton(null)}
        onMouseDown={() => setPressedButton("folder")}
        onMouseUp={() => setPressedButton(null)}
        isPressed={pressedButton === "folder"}
        onClick={() => ""}
      >
        <PiFolderSimplePlus size={18} />
        {hoveredButton === "folder" && (
          <BottomBarHoverButton>New Folder</BottomBarHoverButton>
        )}
      </BottomBarButton>
      <BottomBarButton
        onMouseEnter={() => setHoveredButton("settings")}
        onMouseLeave={() => setHoveredButton(null)}
        onMouseDown={() => setPressedButton("settings")}
        onMouseUp={() => setPressedButton(null)}
        isPressed={pressedButton === "settings"}
        onClick={() => navigate("/settings")}
      >
        <PiGearLight size={18} />
        {hoveredButton === "settings" && (
          <BottomBarHoverButton>Settings</BottomBarHoverButton>
        )}
      </BottomBarButton>
    </BottomBarContainer>
  );
};

export default BottomBar;
