import { useAuthContext } from './hooks/useAuthContext'
import Navbar from "./components/Navbar";
import {
  // createBrowserRouter,
  // RouterProvider,
  Navigate,
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";

import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import CardLists from './components/CardLists';
import CardListDetails from './components/CardListDetails';
import { Box } from '@mui/material';
import Profile from './components/Profile';


const App = () => {
  const {user} = useAuthContext();
  return (
    <div className="w-full p-6">
      <BrowserRouter>
      <Box>
        <Navbar />

        <div>
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
            <Route 
              path="/CardList" 
              element={<CardLists />} 
            />
            <Route 
              path="/CardList/:id" 
              element={<CardListDetails/>}
              />
            <Route 
              path="/profile"
              element={<Profile />}
              />
          </Routes>
        </div>

      </Box>
        
      </BrowserRouter>
      
    </div>
  );
};
export default App;
