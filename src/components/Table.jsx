// components
import ExpenseItem from "./ExpenseItem";

const Table = ({ expenses, showBudgets = true }) => {
  return (
    <div className='table'>
      <table>
        <thead>
          <tr>
            {["Name", "Amount", "Date", showBudgets ? "Budget" : "", " "].map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <ExpenseItem expense={expense} showBudgets={showBudgets} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
