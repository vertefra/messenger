import {
  Box,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import bgImage from "../assets/bg-img.png";
import bubble from "../assets/bubble.svg";
import Login from "../Login";
import Signup from "../Signup";

const useStyles = makeStyles(({ palette, typography, breakpoints }) => ({
  overlay: {
    minHeight: "100vh",
    backgroungSize: "cover",
    backgroundImage: `linear-gradient(${palette.primary.main},${palette.secondary.main})`,
    opacity: "85%",
  },
  bgImage: {
    minHeight: "100vh",
  },
  hero: typography.hero,
}));

export const AccessPage = () => {
  const [page, setPage] = useState("login");

  const classes = useStyles();

  return (
    <Grid container justifyContent="center">
      <Grid
        container
        item
        alignItems="center"
        justifyContent="center"
        spacing={0}
        wrap="wrap"
        md={12}
        lg={10}
      >
        <Grid item sm={5} xs={12}>
          <CardMedia image={bgImage} className={classes.bgImage}>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              className={classes.overlay}
            >
              <Box classes={classes.hero} justifyContent="center">
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img src={bubble} />
                </div>
                <Typography align="center" className={classes.hero}>
                    Converse with anyone in any language
                </Typography>
              </Box>
            </Grid>
          </CardMedia>
        </Grid>
        <Grid item sm={7} xs={12}>
          {page === "login" && <Login setPage={setPage} />}
          {page === "signup" && <Signup setPage={setPage} />}
        </Grid>
      </Grid>
    </Grid>
  );
};
