import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Home from "./Home";
import Forgetpass from "./Forgetpass";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Registration />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "home",
      element: <Home />,
    },
    {
      path: "/forget",
      element: <Forgetpass />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
