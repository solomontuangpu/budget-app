// rrd imports
import { Link, useFetcher } from 'react-router-dom';
// helper
import { formatCurrency, formatDateToLocalString, getAllMatchingItems } from '../helper'
import { TrashIcon } from '@heroicons/react/24/solid';



const ExpenseItem = ({expense, showBudgets}) => {

  const fetcher = useFetcher();

  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId
  })[0];

  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocalString(expense.createdAt)}</td>
      <td>
        {showBudgets && (
          <Link
            style={{ "--accent": budget.color }}
            to={`/budgets/${budget.id}`}
          >
            {budget.name}
          </Link>
        )}
      </td>
      <td>
        <fetcher.Form method='post'>
          <input type='hidden' name='_action' value='deleteExpense' />
          <input type='hidden' name='expenseId' value={expense.id} />
          <button
            type='submit'
            className='btn btn--warning'
            aria-label={`Delete ${expense.name} expense`}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
}

export default ExpenseItem
