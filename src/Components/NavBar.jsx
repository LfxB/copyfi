import React from 'react';
import { Link } from 'react-router-dom'

import './NavBar.css'

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navbarClassName: "navbar-ul"
        }
    }

    toggleResponsiveMenu = () => {
        const { navbarClassName } = this.state;
        if (navbarClassName === "navbar-ul") {
            this.setState({
                navbarClassName: "navbar-ul responsive"
            })
        } else {
            this.setState({
                navbarClassName: "navbar-ul"
            })
        }
    }

    render = () => {
        const { navbarClassName } = this.state;
        return (
            <React.Fragment>
                <ul className={navbarClassName}>
                    <li>
                        <Link className="navbar-active" to="/">
                            <i className="material-icons navbar-icon">book</i>
                            COPIFY
                        </Link>
                    </li>
                    <li>
                        <a href="https://open.spotify.com/browse">
                            <i className="material-icons navbar-icon">swap_horiz</i>
                            Go to Spotify
                        </a>
                    </li>
                    <li className="navbar-menu-button">
                        <button onClick={this.toggleResponsiveMenu}>
                            <i className="material-icons navbar-icon">menu</i>
                        </button>
                    </li>
                </ul>
            </React.Fragment>
        )
    }
}