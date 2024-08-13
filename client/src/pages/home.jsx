import map from "../assets/map.png";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <header>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <img
          alt="Top Center"
          style={{ maxWidth: "100%", maxHeight: "250px" }}
          src={map}
        ></img>
      </Box>
    </header>
  );
};

export default Home;
