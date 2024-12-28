import { getCurrentWindow } from '@tauri-apps/api/window';

const appWindow = getCurrentWindow();

const App = () => <div data-tauri-drag-region className="titlebar">
  <div className="titlebar-button" id="titlebar-minimize">
    <button onClick={() => appWindow.minimize()}>
      min
    </button>
  </div>
  <div className="titlebar-button" id="titlebar-maximize">
    <button onClick={() => appWindow.toggleMaximize()}>
      max
    </button>
  </div>
  <div className="titlebar-button" id="titlebar-close">
    <button onClick={() => appWindow.close()}>
      close
    </button>
  </div>
</div>;

export default App;
