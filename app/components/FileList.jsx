import React from 'react';
import PropTypes from 'prop-types';

class FileList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //console.log('[FileList#render]');
    //console.dir(this.props);

    const FileNameList = this.props.files.map((file, index) => (
      <li key={index} className="list-group-item">
        <div className="media-body">
          <strong>{file.name}</strong>
        </div>
      </li>
    ));

    return <ul className="list-group">{FileNameList}</ul>;
  }
}

FileList.propTypes = {
  files: PropTypes.array.isRequired
};

export default FileList;
