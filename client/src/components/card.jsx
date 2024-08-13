import { Typography } from "@mui/material";
import Flippy, { FrontSide, BackSide } from "react-flippy";

export default function FlipCard({
  title,
  sourceLanguage,
  targetLanguage,
  containerSx = {},
  typoSx = {},
}) {
  return (
    <Flippy flipOnHover={false} flipOnClick={true} flipDirection="horizontal">
      <FrontSide
        style={{
          backgroundColor: "#0277bd",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          borderRadius: "50px",
          ...containerSx,
        }}
      >
        <Typography style={{ fontSize: "24px", color: "#fff", ...typoSx }}>
          {" "}
          {sourceLanguage}
        </Typography>
      </FrontSide>
      <BackSide
        style={{
          backgroundColor: "#e1f5fe",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          borderRadius: "50px",
          ...containerSx,
        }}
      >
        <Typography style={{ fontSize: "24px", ...typoSx }}>
          {targetLanguage}
        </Typography>
      </BackSide>
    </Flippy>
  );
}
