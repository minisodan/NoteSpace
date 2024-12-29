import { getCurrentWindow } from '@tauri-apps/api/window';

const appWindow = getCurrentWindow();

const Titlebar = () => 
  <div data-tauri-drag-region className="bg-gray-800 flex">
    <button onClick={() => appWindow.minimize()}>min</button>
    <button onClick={() => appWindow.toggleMaximize()}>max</button>
    <button onClick={() => appWindow.close()}>close</button>
  </div>;

export default Titlebar;