import * as React from "react";
import * as ReactDOM from "react-dom/client";
// import { useAuthContext } from "./hooks/useAuthContext";

// import {
//   createBrowserRouter,
//   RouterProvider,
//   Navigate
// } from "react-router-dom";
import App from "./App";
// import Record from "./components/Record";
// import RecordList from "./components/RecordList";
import "./index.css";

import { AuthContextProvider } from "./context/AuthContext";


// const {user} = useAuthContext();


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
//         element: <RecordList />,
//       },
//     ],
//   },
//   {
//     path: "/create",
//     element: <App />,
//     children: [
//       {
//         path: "/create",
//         element: <Record />,
//       },
//     ],
//   },
//   {
//     path: "/edit/:id",
//     element: <App />,
//     children: [
//       {
//         path: "/edit/:id",
//         element: <Record />,
//       },
//     ],
//   },{
//     path:"/login",
//     element:<Login />
//   },
//   {
//     path:"/signup",
//     element:<Signup />
//   }
// ]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
     <AuthContextProvider>
      <App />
      <h2>hola</h2>
    </AuthContextProvider> 
   
  </React.StrictMode>
);
