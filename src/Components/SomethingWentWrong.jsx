import React from 'react';
import MainContainer from 'Components/MainContainer'

export default class SomethingWentWrong extends React.Component {
    render = () => {
        return (
            <MainContainer>
                <div>Something went wrong. Please <a href="/">go back</a> and try again</div>
            </MainContainer>
        )
    }
}