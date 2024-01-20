/* eslint-disable no-unused-vars */
import React from "react";
import TopBar from "./HomeComponent/TopBar";
import FooterComponent from "./Footer/FooterComponent";
import useMediaQuery from "@mui/material/useMediaQuery";

const Welcome = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <TopBar />
      <img
        className="background-image"
        src={
          isMobile
            ? `${process.env.PUBLIC_URL}/images/BackgroundImageMobile.png`
            : `${process.env.PUBLIC_URL}/images/BackgroundImagePC.png`
        }
        alt="Background"
        style={{
          position: "fixed",
          top: 50,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "fill",
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
          color: "white", // add color or other styles as needed
          zIndex: 1, // Place the text on top of the image
        }}
      >
        Please Login
      </div>
      <FooterComponent />
    </div>
  );
};

export default Welcome;
