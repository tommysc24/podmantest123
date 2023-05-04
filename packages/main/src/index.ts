/**********************************************************************
 * Copyright (C) 2022 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ***********************************************************************/

import { app, ipcMain, Menu, Tray } from 'electron';
import './security-restrictions';
import { createNewWindow, restoreWindow } from '/@/mainWindow';
import { TrayMenu } from './tray-menu';
import { getCommandLineArgs, isMac, isWindows, stoppedExtensions } from './util';
import { AnimatedTray } from './tray-animate-icon';
import { PluginSystem } from './plugin';
import { StartupInstall } from './system/startup-install';
import type { ExtensionLoader } from './plugin/extension-loader';
import { diagnosticMenuItem } from './diagnostic/diagnostic-menu-item';
import { DiagnosticProcessor } from './diagnostic/diagnostic-processor';
import { Logger } from './logger';
import type { LogLevel } from 'electron-log';

function initializeLoggerInstance(): Logger {
  let desiredLogLevel: LogLevel = app.isPackaged ? 'info' : 'debug';
  const logLevel = getCommandLineArgs(process.argv, '--logLevel=', false);
  if (logLevel) {
    const level = logLevel.split('=')[1];
    if (level) {
      desiredLogLevel = level as LogLevel;
    }
  }

  const customLogPathArg = getCommandLineArgs(process.argv, '--logPath=', false);
  const customLogsFolder = customLogPathArg && customLogPathArg.substring(customLogPathArg.indexOf('=') + 1);

  return new Logger(desiredLogLevel, customLogsFolder);
}

const logger: Logger = initializeLoggerInstance();
export { logger };

let extensionLoader: ExtensionLoader | undefined;
/**
 * Prevent multiple instances
 */
const isSingleInstance = app.requestSingleInstanceLock();
if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}
app.on('second-instance', restoreWindow);

/**
 * Disable Hardware Acceleration for more power-save
 */
app.disableHardwareAcceleration();

/**
 * Shout down background process if all windows was closed
 */
app.on('window-all-closed', () => {
  if (!isMac()) {
    app.quit();
  }
});

app.once('before-quit', async event => {
  if (!extensionLoader) {
    stoppedExtensions.val = true;
    return;
  }
  event.preventDefault();
  await extensionLoader
    ?.stopAllExtensions()
    .then(() => {
      console.log('Stopped all extensions');
    })
    .catch(error => {
      console.log('Error stopping extensions', error);
    })
    .finally(() => {
      stoppedExtensions.val = true;
      app.quit();
    });
});
/**
 *  @see https://www.electronjs.org/docs/latest/api/app#appsetappusermodelidid-windows
 */
if (isWindows()) {
  app.setAppUserModelId(app.name);
}

let tray: Tray | null = null;

app.whenReady().then(
  async () => {
    // We must create the window first before initialization so that we can load the
    // configuration as well as plugins
    // The window is hiddenly created and shown when ready

    // Platforms: Linux, macOS, Windows
    // Create the main window
    createNewWindow();

    // Platforms: macOS
    // Required for macOS to start the app correctly (this is will be shown in the dock)
    // We use 'activate' within whenReady in order to gracefully start on macOS, see this link:
    // https://www.electronjs.org/docs/latest/tutorial/quick-start#open-a-window-if-none-are-open-macos
    app.on('activate', createNewWindow);

    // Setup the default tray icon + menu items
    const animatedTray = new AnimatedTray();
    tray = new Tray(animatedTray.getDefaultImage());
    animatedTray.setTray(tray);
    const trayMenu = new TrayMenu(tray, animatedTray);

    // Start extensions
    const pluginSystem = new PluginSystem(trayMenu);
    extensionLoader = await pluginSystem.initExtensions();

    // Get the configuration registry (saves all our settings)
    const configurationRegistry = extensionLoader.getConfigurationRegistry();

    const diagnosticProviderRegistry = extensionLoader.getDiagnosticProviderRegistry();
    const diagnosticProcessor = new DiagnosticProcessor(diagnosticProviderRegistry);

    // If we've manually set the tray icon color, update the tray icon. This can only be done
    // after configurationRegistry is loaded. Windows or Linux support only for icon color change.
    if (!isMac()) {
      const color = configurationRegistry.getConfiguration('preferences').get('TrayIconColor');
      if (typeof color === 'string') {
        animatedTray.setColor(color);
      }
    }

    const menu = Menu.getApplicationMenu();
    if (menu) {
      Menu.setApplicationMenu(
        Menu.buildFromTemplate(
          menu.items.map(i => {
            if (i.role === 'help' && i.submenu) {
              const newSubMenu = Menu.buildFromTemplate([
                ...i.submenu.items,
                diagnosticMenuItem(diagnosticProcessor, configurationRegistry),
              ]);
              return Object.assign({}, i, { submenu: newSubMenu });
            }
            return i;
          }),
        ),
      );
    }

    // Share configuration registry with renderer process
    ipcMain.emit('configuration-registry', '', configurationRegistry);

    // Configure automatic startup
    const automaticStartup = new StartupInstall(configurationRegistry);
    await automaticStartup.configure();
  },
  e => console.error('Failed to start app:', e),
);
