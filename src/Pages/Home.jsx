import React from 'react';
import MainContainer from 'Components/MainContainer'
import { authLink } from 'Helpers/spotify'

import './Home.css'

export default class Home extends React.Component {
    render = () => {
        return (
            <MainContainer>
                <div className="home-container">
                    <a className="btn-link" href={authLink}>GET STARTED</a>
                </div>
            </MainContainer>
        )
    }
}