import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Routes,
  Route
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
const App = () => {
  return (
    <div className="w-full p-6">
      <Navbar />
      <Outlet />
    </div>
  );
};
export default App;
