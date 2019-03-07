const fs = window.require('fs');
const path = window.require('path');

export const createDirectoryItem = (name, fullpath, children = []) => {
  return {
    name: name,
    fullpath: fullpath,
    children: children
  };
};

export const getChildDirectories = folderPath => {
  let names = fs.readdirSync(folderPath);
  let children = [];
  names.map(name => {
    let fullpath = path.join(folderPath, name);
    let stat = fs.statSync(fullpath);
    if (stat.isDirectory()) {
      children.push(createDirectoryItem(name, fullpath));
    }
  });
  return children;
};

export const getChildFiles = childPath => {
  let names = fs.readdirSync(childPath);
  let childFiles = [];
  names.map(name => {
    let fullpath = path.join(childPath, name);
    let stat = fs.statSync(fullpath);
    if (!stat.isDirectory()) {
      childFiles.push({
        name: name,
        fullpath: fullpath
      });
    }
  });
  return childFiles;
};
