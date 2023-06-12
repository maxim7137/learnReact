import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Path } from "./path";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";

const router = createBrowserRouter([
  { path: Path.home, element: <Home /> },
  { path: Path.login, element: <Login /> },
  { path: Path.register, element: <Register /> },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
