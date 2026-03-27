import nodePath from 'path';
import fs from 'fs-extra';

const tempPath = nodePath.resolve(import.meta.dirname, '../__temp');
const currentPath = process.cwd();

function tempDir(paths) {
  fs.ensureDirSync(tempPath);
  fs.emptyDirSync(tempPath);
  process.chdir(tempPath);

  Object.keys(paths).forEach((key) => ensurePath(key, paths[key]));
}

tempDir.restore = function() {
  fs.emptyDirSync(tempPath);
  fs.removeSync(tempPath);
  process.chdir(currentPath);
}

function ensurePath(path, content) {
  if (typeof content === 'string') {
    fs.ensureFileSync(path);
    fs.writeFileSync(path, content);
  } else {
    fs.ensureDirSync(path);
  }
}

export default tempDir;
