import { useAuthContext } from "./hooks/useAuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Box } from "@mui/material";

import Navbar from "./components/Navbar";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import CardLists from "./components/CardLists";
import CardListDetails from "./components/CardListDetails";
import Profile from "./components/Profile";
import PlaySelectTopic from "./components/PlaySelectTopic";
import PlayCards from "./components/PlayCards";
import AboutUs from "./components/AboutUs";

const App = () => {
  const { user } = useAuthContext();

  return (
    <div className="w-full p-6">
      <Router>
        <Box sx={{ m: 2 }}>
          <Navbar />

          <Box sx={{ m: 1 }}>
            <Routes>
              <Route
                path="/"
                element={user ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/" />}
              />
              <Route path="/CardList" element={<CardLists />} />
              <Route path="/CardList/:id" element={<CardListDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/play" element={<PlaySelectTopic />} />
              <Route path="/play/:id" element={<PlayCards />} />
              <Route path="/AboutUs" element={<AboutUs />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </div>
  );
};

export default App;
