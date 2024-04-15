import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Error from "./pages/Error"
import Main, { mainLoader } from "./layout/main"
import Dashboard, { dashboardLoader } from "./pages/Dashboard"
import { logoutAction } from "./actions/logout"

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
    </>
  )
}

export default App
