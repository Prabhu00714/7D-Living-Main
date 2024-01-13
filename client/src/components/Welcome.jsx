/* eslint-disable no-unused-vars */
import React from "react";
import TopBar from "./HomeComponent/TopBar";

const Welcome = () => {
  return (
    <div>
      <TopBar />
      <img
        className="background-image"
        src={`${process.env.PUBLIC_URL}/images/background.jpg`}
        alt="Background"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "50px",
        }}
      >
        Please Login
      </div>
    </div>
  );
};

export default Welcome;
