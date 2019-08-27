import React from 'react';
import NavBar from './NavBar';

import './MainContainer.css';

export default class MainContainer extends React.Component {
  render = () => {
    return (
      <div className="main-container">
        <NavBar />
        <div className="children-container">{this.props.children}</div>
      </div>
    );
  };
}
