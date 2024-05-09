//rrd imports
import { createBrowserRouter, RouterProvider } from "react-router-dom"

//helpers
import { logoutAction } from "./actions/logout"
import { deleteBudget } from "./actions/deleteBudget";

// library imports
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import components
import Main, { mainLoader } from "./layout/main"
import Error from "./pages/Error"
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard"
import ExpensesPage, { expensesAction, expensesLoader } from "./pages/ExpensesPage"
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";

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
        path: "budgets/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetAction,
        errorElement: <Error />,
        children: [
          {
            path: "delete",
            action: deleteBudget
          }
        ]
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expensesAction,
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
