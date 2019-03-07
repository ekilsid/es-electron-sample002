import React from 'react';
import PropTypes from 'prop-types';

import { getChildDirectories } from '../utils/FileAccess';

class DirectoryTree extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      directoryItem: this.props.directoryItem,
      isExpanded: false
    };

    this.handleExpand = this.handleExpand.bind(this);
  }

  componentDidMount() {
    //console.log('[DirectoryTree#componentDidMount]');

    let children = this.props.onFindChildren(this.props.directoryItem.fullpath);
    //console.dir(children);

    let copy = this.props.directoryItem;
    copy.children = children;

    this.setState({
      directoryItem: copy
    });
  }

  handleExpand() {
    if (this.state.isExpanded === false) {
      this.setState({
        isExpanded: true
      });
    } else {
      this.setState({
        isExpanded: false
      });
    }
  }

  render() {
    let directoryItem = this.state.directoryItem;
    //console.log('[DirectoryTree#render]');
    //console.dir(this.props);

    return (
      <ul style={{ paddingLeft: '5px', listStyle: 'none' }}>
        <li>
          <span
            className={`icon ${
              this.state.isExpanded ? 'icon-minus-squared' : 'icon-plus-squared'
            }`}
            onClick={() => {
              this.handleExpand();
            }}
          />
          <span
            style={{ marginLeft: '5px' }}
            onClick={() => {
              this.props.onSelectChildren(directoryItem.fullpath);
            }}
          >
            {directoryItem.name}
          </span>
        </li>
        <ul style={{ paddingLeft: '5px', listStyle: 'none' }}>
          {this.state.isExpanded &&
            directoryItem.children.map(child => (
              <DirectoryTree
                key={child.fullpath}
                directoryItem={child}
                onFindChildren={getChildDirectories}
                onSelectChildren={path => {
                  this.props.onSelectChildren(path);
                }}
              />
            ))}
        </ul>
      </ul>
    );
  }
}

DirectoryTree.propTypes = {
  directoryItem: PropTypes.object.isRequired,
  onFindChildren: PropTypes.func.isRequired,
  onSelectChildren: PropTypes.func.isRequired
};

export default DirectoryTree;
