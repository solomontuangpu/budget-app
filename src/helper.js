export const wait = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 2000);
    })
}

const generateRandomColor = () => {  
    const existingBudgetLength = fetchData("budgets")?.length ?? 0;
    return `${existingBudgetLength * 34 } 65% 50%`;
}

export const fetchData = key => {
    return JSON.parse(localStorage.getItem(key));
};

export const createBudget = ({name, amount}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name,
        amount : +amount, 
        color: generateRandomColor(),
        createdAt: Date.now()
    };

    const existingBudgets = fetchData("budgets") ?? [];
    return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]));
}

export const addExpense = ({ name, amount, budgetId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name,
    amount: +amount,
    budgetId: budgetId,
    createdAt: Date.now(),
  };

  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

export const deleteItem = key => {
    return localStorage.removeItem(key);
}

export const calculateSpentByBudget = (budgetId) => {
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense) => {
        if(expense.budgetId !== budgetId) return acc;
        return acc += expense.amount;
    }, 0)

    return budgetSpent;
}

export const formatDateToLocalString = epoch => new Date(epoch).toLocaleDateString();


export const formatPercentage = amount => {
    return amount.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0
    })
}

export const formatCurrency = amount => {
    return amount.toLocaleString(undefined, {
        style: "currency",
        currency: "USD"
    })
}