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
import Home from "./pages/home"


const App = () => {
  const {user} = useAuthContext();
  return (
    <div className="w-full p-6">
      <BrowserRouter>
        <Navbar />
        <h2>Holaa</h2>
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
          </Routes>
        </div>
      </BrowserRouter>
      
    </div>
  );
};
export default App;
