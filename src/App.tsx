import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Editor from "./Components/Editor/Editor";
import Settings from "./Components/Settings/Settings";
import { CreateApplicationDirectory } from "./Components/Utils/FileManagement";
import { load } from '@tauri-apps/plugin-store'


// const store = await load('store.json', { autoSave: false})
// const val = await store.get<{ value: number }>('test-key');
// console.log(val); // { value: 5 }
// await store.set('test-key', {value: val.value + 1})

// await store.save()

// ON START
CreateApplicationDirectory();

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
