let platform = null;

if (process.platform === 'darwin') {
  platform = 'macos';
} else if (process.platform === 'win32') {
  platform = 'windows';
} else if (process.platform === 'linux') {
  platform = 'linux';
}

module.exports = { platform };