import React from "react";
import MainContainer from "Components/MainContainer";

import "./SomethingWentWrong.css";

export default class SomethingWentWrong extends React.Component {
  render = () => {
    return (
      <MainContainer>
        <div className="something-wrong">
          Something went wrong. Please <a href="/">go back</a> and try again.
        </div>
      </MainContainer>
    );
  };
}
