import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Error from "./pages/Error"
import Main, { mainLoader } from "./layout/main"
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard"
import { logoutAction } from "./actions/logout"

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />
      },
      {
        path: "logout",
        action: logoutAction
      }
    ]
  },
])

function App() {
 
  return (
    <>
        <RouterProvider router={router} />
        <ToastContainer />
    </>
  )
}

export default App
