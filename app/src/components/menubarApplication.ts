import {
  app,
  Tray,
  Menu,
  ipcMain,
  nativeImage,
  BrowserWindow,
  screen,
} from 'electron';

export function initMenubarApp(
  nativefierOptions,
  mainWindow: BrowserWindow,
  appIcon: Tray,
): VoidFunction {
  const options = { ...nativefierOptions };

  if (options.tray) {
    appIcon.setIgnoreDoubleClickEvents(false);

    const getWindowPosition = () => {
      //https://github.com/sfatihk/electron-tray-window/blob/master/src/index.js maybe fit to screen size?
      //check windows https://github.com/KeziahMoselle/tempus/blob/master/packages/electron/app.js
      const windowBounds = mainWindow.getBounds();
      const trayBounds = appIcon.getBounds();
      const x = Math.round(
        trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2,
      );
      const y = Math.round(trayBounds.y + trayBounds.height);
      return { x, y };
    };

    const showWindow = () => {
      const position = getWindowPosition();
      //mainWindow.setAlwaysOnTop(true,"modal-panel", 10000);
      mainWindow.setPosition(position.x, position.y, true);
      mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

      mainWindow.show();
      mainWindow.focus();
      //mainWindow.setVisibleOnAllWorkspaces(false);
    };

    appIcon.setTitle('..');

    //mainWindow.setMaximumSize(1600, 900);
    //appIcon.setContextMenu(contextMenu);
    if (app.dock) {
      app.dock.hide();
      app.on('window-all-closed', () => {
        app.dock.hide();
        // any other logic
      });
    }

    mainWindow.on('blur', () => {
      mainWindow.hide(); // maybe throttle on windows
    });
    //https://github.com/electron/electron/pull/18981
    //we set an empty menu for mac to allow hightlighting the icon when our app is open
    //appIcon.setContextMenu(Menu.buildFromTemplate([]));

    return showWindow;
  }

  return mainWindow.show;
}
