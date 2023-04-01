const { platform } = require('./scripts/system');
const MacOS = require('./src/macos');
const Windows = require('./src/windows');
const { app } = require('electron');

if (platform === 'macos') {
  MacOS(app);
} else if (platform === 'windows') {
  Windows(app);
}