import React from 'react';
import { remote } from 'electron';
const dialog = remote.dialog;
const app = remote.app;

const path = window.require('path');

import DirectoryTree from './DirectoryTree';
import FileList from './FileList';
import {
  createDirectoryItem,
  getChildDirectories,
  getChildFiles
} from '../utils/FileAccess';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePath: app.getPath('home'),
      files: []
    };
  }

  handleOpen() {
    const win = remote.getCurrentWindow();
    const options = {
      properties: ['openDirectory'],
      title: 'Choose folder',
      defaultPath: app.getPath('home')
    };

    const decided = dialog.showOpenDialog(win, options);
    console.dir(decided);

    this.setState({
      activePath: decided[0],
      files: []
    });
  }

  getChildFiles(selectedPath) {
    this.setState({
      files: getChildFiles(selectedPath)
    });
  }

  render() {
    let name = path.basename(this.state.activePath);

    return (
      <div className="window">
        <header className="toolbar toolbar-header">
          <h1 className="title">Folder tree sample</h1>
          <div className="toolbar-actions">
            <button
              className="btn btn-primary"
              onClick={() => this.handleOpen()}
            >
              Choose folder
            </button>
            <span>{this.state.activePath}</span>
          </div>
        </header>
        <div className="window-content">
          <div className="pane-group">
            <div className="pane">
              <DirectoryTree
                key={this.state.activePath}
                directoryItem={createDirectoryItem(name, this.state.activePath)}
                onFindChildren={getChildDirectories}
                onSelectChildren={path => {
                  this.getChildFiles(path);
                }}
              />
            </div>
            <div className="pane">
              <FileList files={this.state.files} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
