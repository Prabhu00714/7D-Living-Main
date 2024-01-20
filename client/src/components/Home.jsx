import React from "react";
import { motion } from "framer-motion";
import TopBar from "./HomeComponent/TopBar";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/test");
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <TopBar />
      <CssBaseline />
      <Container maxWidth="sm" sx={{ mt: 10 }}>
        <Grid container>
          <Grid item xs={12}>
            <Box
              sx={{ bgcolor: "#cfe8fc", height: "70vh", position: "relative" }}
            >
              <img
                className="background-image"
                src={`${process.env.PUBLIC_URL}/images/health.jpg`}
                alt="Background"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "90%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          fontSize: "24px",
          color: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span>Lets Take a Test..</span>
        <Button
          variant="outlined"
          color="primary"
          style={{ marginLeft: "10px" }}
          onClick={handleClick}
        >
          Lets Go
        </Button>
      </div>
    </motion.div>
  );
};

export default Home;
