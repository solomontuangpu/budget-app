// helper
import { formatCurrency, formatDateToLocalString } from '../helper'

const ExpenseItem = ({expense}) => {
  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocalString(expense.createdAt)}</td>
    </>
  );
}

export default ExpenseItem
