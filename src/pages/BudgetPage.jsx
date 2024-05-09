// rrd imports
import { useLoaderData } from "react-router-dom";

// helper imports
import { createExpense, deleteItem, getAllMatchingItems } from "../helper";

// library imports
import { toast } from 'react-toastify';

// components imports
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";


export const budgetLoader = ({ params }) => {
  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

   const expenses = getAllMatchingItems({
     category: "expenses",
     key: "budgetId",
     value: params.id
   });

  if (!budget) {
    throw new Error("The budget you're trying to find doesn't exist!");
  }

  return { budget, expenses };
};

export const budgetAction = async ({ request }) => {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "addExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(
        `${values.newExpense} Expense has been added successfully!`
      );
    } catch (error) {
      throw new Error("There was a problem creating your Expense!");
    }
  }


  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted!");
    } catch (error) {
      throw new Error("There was a problem deleting your expense!");
    }
  }
};

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();

  return (
    <div className='grid-lg' style={{
      "--accent" : budget.color
    }}>
      <h1 className='h2'>
        <span className='accent'>{budget.name}</span> Overview
      </h1>

      <div className='flex-lg'>
       <BudgetItem budget={budget} showDelete={true} />
       <AddExpenseForm budgets={[budget]} />
      </div>

      {
        expenses && expenses.length > 0 && (
          <div className="grid-md">
            <h2>
              <span className="accent">{budget.name}</span>
            </h2>
            <Table expenses={expenses} showBudgets={false} />
          </div>
        )
      }
    </div>
  );
};

export default BudgetPage;
