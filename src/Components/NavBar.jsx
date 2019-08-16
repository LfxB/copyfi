import React from "react";
import { NavLink } from "react-router-dom";

import "./NavBar.css";

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navbarClassName: "main-nav"
    };
  }

  toggleResponsiveMenu = () => {
    const { navbarClassName } = this.state;
    if (navbarClassName === "main-nav") {
      this.setState({
        navbarClassName: "main-nav navbar-mobile"
      });
    } else {
      this.setState({
        navbarClassName: "main-nav"
      });
    }
  };

  render = () => {
    const { navbarClassName } = this.state;
    return (
      <nav className="navbar">
        <span className="navbar-toggle" onClick={this.toggleResponsiveMenu}>
          <i className="material-icons">menu</i>
        </span>
        <NavLink to="/" className="logo">
          copyfi
        </NavLink>
        <ul className={navbarClassName}>
          <li>
            <a
              href="https://open.spotify.com"
              className="nav-links"
              target="_blank"
              rel="noopener noreferrer"
            >
              Go To Spotify
            </a>
          </li>
          <li>
            <a
              href="https://github.com/LfxB/copyfi"
              className="nav-links"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source
            </a>
          </li>
        </ul>
      </nav>
    );
  };
}
