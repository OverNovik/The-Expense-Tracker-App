import { FlatList, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = ({ data }) => {
  return (
    <FlatList
      data={data}
      renderItem={(itemData) => {
        return <ExpenseItem {...itemData.item} />;
      }}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;
