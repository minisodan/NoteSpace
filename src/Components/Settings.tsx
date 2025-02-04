const Settings = () => {
  return (
    <div className="flex flex-col items-center w-full h-screen p-10 m-0 bg-stone-900">
      <div className="relative w-full text-neutral-300">
        <div className="text-xl font-semibold uppercase text-center">
          <h1>Settings</h1>
        </div>
        <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div className="text-xl font-semibold text-center mt-8">
          <h1>Plug-ins</h1>
        </div>
        <div>
          <a href="/">return home</a>{" "}
          {/* This will need to change, maybe a back button in the left corner??? */}
        </div>
      </div>
    </div>
  );
};
export default Settings;
