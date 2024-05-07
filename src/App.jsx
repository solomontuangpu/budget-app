//rrd imports
import { createBrowserRouter, RouterProvider } from "react-router-dom"

//helpers
import { logoutAction } from "./actions/logout"

// library imports
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import components
import Main, { mainLoader } from "./layout/main"
import Error from "./pages/Error"
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard"
import ExpensesPage, { expensesLoader } from "./pages/ExpensesPage"

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
        errorElement: <Error />,
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: expensesLoader,
        errorElement: <Error />,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
 
  return (
    <>
        <RouterProvider router={router} />
        <ToastContainer />
    </>
  )
}

export default App
