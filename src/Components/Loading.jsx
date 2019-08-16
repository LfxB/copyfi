import React from "react";

import MainContainer from "Components/MainContainer";
import Spinner from "Assets/green-spinner-200px.svg";

import "./Loading.css";

export default function Loading() {
  return (
    <MainContainer>
      <div className="loading-container">
        <img className="green-spinner" src={Spinner} alt={"Loading..."} />
      </div>
    </MainContainer>
  );
}
