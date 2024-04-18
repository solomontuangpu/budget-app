const generateRandomColor = () => {
    
    const existingBudgetLength = fetchData("budgets")?.length ?? 0;
    return `${existingBudgetLength * 34 } 65% 50%`;
}

export const fetchData = key => {
    return JSON.parse(localStorage.getItem(key));
};

export const createBudget = ({name, amount}) => {
    const newItem = {
        id: crypto.randomUUID,
        name,
        amount,
        color: generateRandomColor(),
        createdAt: Date.now()
    };

    const existingBudgets = fetchData("budgets") ?? [];
    return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]));
}

export const deleteItem = key => {
    return localStorage.removeItem(key);
}