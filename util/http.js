import axios from "axios";

export const storeExpense = (expenseData) => {
  axios.post(
    "https://react-native-expense-tra-2aa33-default-rtdb.europe-west1.firebasedatabase.app/expenses.json",
    expenseData
  );
};
