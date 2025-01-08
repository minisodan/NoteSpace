import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Editor from "./Components/Editor";
import Settings from "./Components/Settings";

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
