import { StripFileNameFromPath } from "./Utils/FileManagement";
import { Button } from "./Widgets/Button";

const Directories = ({ directories }: { directories: string[] }) => {
  return (
    <div className="h-full hide-scrollbar">
      <div className="">
        {directories.length > 0 && (
          <div className="flex flex-col m-2 gap-1">
            {directories.map(dir => (
              <Button>
                <div className="text-left px-2">{StripFileNameFromPath({path: dir})}</div>
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Directories;
