import nodePath from 'path';
import fs from 'fs-extra';

const baseTempPath = nodePath.resolve(import.meta.dirname, '../__temp');

const state = {
  tempPath: baseTempPath,
  currentPath: process.cwd(),
};

function tempDir(testId, paths) {
  state.tempPath = nodePath.resolve(baseTempPath, testId);
  fs.ensureDirSync(state.tempPath);
  fs.emptyDirSync(state.tempPath);
  process.chdir(state.tempPath);

  Object.keys(paths).forEach((key) => ensurePath(key, paths[key]));
}

tempDir.restore = function() {
  fs.emptyDirSync(state.tempPath);
  fs.removeSync(state.tempPath);
  process.chdir(state.currentPath);
};

function ensurePath(path, content) {
  if (typeof content === 'string') {
    fs.ensureFileSync(path);
    fs.writeFileSync(path, content);
  } else {
    fs.ensureDirSync(path);
  }
}

export default tempDir;
