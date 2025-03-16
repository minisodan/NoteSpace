import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Editor from "./Components/Editor/Editor";
import Settings from "./Components/Settings/Settings";
import { InitilizeApplicationAndFiles } from "./Components/Utils/FileManagement";

// ON START
InitilizeApplicationAndFiles().catch();

const App = () => (
  <Router>
    <div>
      <Routes>
        <Route path="/" element={<Editor />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  </Router>
);

export default App;
