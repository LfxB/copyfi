import React from 'react';
import MainContainer from 'Components/MainContainer';

import './SomethingWentWrong.css';

export default class SomethingWentWrong extends React.Component {
  render = () => {
    const { message } = this.props;
    return (
      <MainContainer>
        <div className="something-wrong">
          {!message && (
            <div>
              Something went wrong. Please <a href="/">go back</a> and try
              again.
            </div>
          )}
          {message && (
            <React.Fragment>
              <code>
                <pre>{message}</pre>
              </code>
              <div>
                Click <a href="/">here</a> to try again.
              </div>
            </React.Fragment>
          )}
        </div>
      </MainContainer>
    );
  };
}
