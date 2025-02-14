import { MdOutlineArrowBackIos } from "react-icons/md";

const Settings = () => {
  const BreakLine = () => {
    return (
      <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
    );
  };

  return (
    <>
      <div className="absolute text-xl text-neutral-300 top-0 left-0 p-4">
        <a href="/">
          <MdOutlineArrowBackIos />
        </a>
      </div>
      <div className="flex flex-col items-center w-full h-screen p-10 m-0 bg-stone-900">
        <div className="relative w-full text-neutral-300">
          <div className="text-xl font-semibold uppercase text-center">
            <h1>Settings</h1>
          </div>
          <BreakLine></BreakLine>
          <div className="text-xl font-semibold text-center mt-8">
            <h1>Plug-ins</h1>
          </div>
          <BreakLine></BreakLine>
        </div>
      </div>
    </>
  );
};
export default Settings;
