import {
  PiFilePlusDuotone,
  PiFolderSimplePlus,
  PiGearLight,
} from "react-icons/pi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Widgets/Button";

const BottomBar = ({ 
  onFileClick, 
  onFolderClick 
}: { 
  onFileClick:  () => void
  onFolderClick: () => void
}) => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const navigate = useNavigate();

  const renderHoverLabel = (label: string, id: string) => (
    <div
      className={`absolute bottom-full mb-2 px-[15%] p-1 bg-neutral-700 text-neutral-300 text-sm rounded-md whitespace-nowrap z-10 ${
        hoveredButton === id ? "opacity-100" : "opacity-0"
      } transition-opacity`}
    >
      {label}
    </div>
  );

  const buttons = [
    {
      id: "file",
      icon: <PiFilePlusDuotone size={18} />,
      label: "New File",
      onClick: onFileClick,
    },
    {
      id: "folder",
      icon: <PiFolderSimplePlus size={18} />,
      label: "New Folder",
      onClick: onFolderClick,
    },
    {
      id: "settings",
      icon: <PiGearLight size={18} />,
      label: "Settings",
      onClick: () => navigate("/settings"),
    }
  ];

  return (
    <div className="relative flex flex-row justify-around m-2 p-2 gap-4 text-white select-none overflow-visible">
      {buttons.map(({ id, icon, label, onClick }) => (
        <div
          key={id}
          className="relative flex flex-col items-center"
          onMouseEnter={() => setHoveredButton(id)}
          onMouseLeave={() => setHoveredButton(null)}
        >
          {renderHoverLabel(label, id)}
          <Button className="p-1" onClick={onClick}>{icon}</Button>
        </div>
      ))}
    </div>
  );
};

export default BottomBar;
