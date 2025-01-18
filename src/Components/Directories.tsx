const Directories = ({ directories }: { directories: string[] }) => {
  return (
    <div className="h-full hide-scrollbar">
      <div className="text-sm">
        {directories.length > 0 && (
          <ul>
            {directories.map((dir, index) => (
              <li key={index}>{JSON.stringify(dir)}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Directories;
