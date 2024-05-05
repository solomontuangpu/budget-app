import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import { addExpense, createBudget, fetchData, wait } from "../helper";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

export const dashboardLoader = () => {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");

  return { userName, budgets, expenses };
};

export const dashboardAction = async ({ request }) => {
  await wait();

  const data = await request.formData();

  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "createAccount") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`);
    } catch (error) {
      throw new Error("There was a problem creating your account!");
    }
  }

  if (_action === "createBudget") {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("New Budget has been created successfully!");
    } catch (error) {
      throw new Error("There was a problem creating your Budget!");
    }
  }

  if (_action === "addExpense") {
    try {
      addExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget
      });
      return toast.success(`${values.newExpense} Expense has been added successfully!`);
    } catch (error) {
      throw new Error("There was a problem creating your Budget!");
    }
  }

};

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();
  return (
    <>
      {userName ? (
        <div className='dashboard'>
          <h1>
            Welcome back, <span className='accent'>{userName}</span>
          </h1>
          <div className='grid-sm'>
            {budgets && budgets.length > 0 ? (
              <div className='grid-lg'>
                <div className='flex-lg'>
                  <AddBudgetForm />
                <AddExpenseForm budgets={budgets} />
                </div>

                <h2>Existing Budgets</h2>
                <div className="budgets">
                   {
                    budgets.map((budget) => (
                      <BudgetItem key={budget.id} budget={budget} />
                    ))
                   }
                </div>

                {
                  expenses && expenses.length > 0 && (
                    <div className="grid-md">
                      <h2>Recent Expenses</h2>
                      <Table expenses = {
                        expenses.sort((a,b) => b.createdAt - a.createdAt)
                      } />
                    </div>
                  )
                }
              </div>
            ) : (
              <div className='grid-sm'>
                <p>Personal budgeting is the secret to financial freedom.</p>
                <p>Create budget to get started!</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
