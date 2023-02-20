import { useCallback, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
} from "react-native";
import {
  useSafeAreaInsets,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import ListItem from "./src/components/ListItem";

const Component = () => {
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    containerApp: {
      flex: 1,
      paddingHorizontal: 10,
      paddingTop: insets.top + 20,
    },
    containerInput: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: "#cccc",
      paddingBottom: 40,
      marginBottom: 20,
    },
    inputText: {
      flex: 1,
      marginRight: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: "#cccc",
      borderRadius: 5,
    },
    containerGoals: {
      flex: 5,
    },
    goalsTextTitle: {
      fontSize: 20,
      fontWeight: "500",
      color: "#0D2149",
      marginBottom: 10,
    },
    buttonCustom: {
      paddingVertical: 15,
      borderRadius: 10,
      paddingHorizontal: 10,
    },
    buttonActive: {
      backgroundColor: "#208AAE",
    },
    buttonDisabled: {
      backgroundColor: "#ccc",
    },
    textButton: {
      color: "#fff",
      fontWeight: "500",
    },
  });

  const [todoGoals, setTodoGoals] = useState([]);
  const [todoGoal, setTodoGoal] = useState("");

  const handleChangeTextGoal = (value) => {
    setTodoGoal(value);
  };

  const handleSubmitGoal = () => {
    if (todoGoal) {
      setTodoGoals((prev) => [
        ...prev,
        { id: (Math.random() + 1).toString(36).substring(7), text: todoGoal },
      ]);
      setTodoGoal("");
    }
  };

  const renderItem = useCallback(({ item }) => <ListItem item={item} />, []);
  const keyExtractor = useCallback((item) => item?.id, []);

  return (
    <View style={styles.containerApp}>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.inputText}
          placeholder="Enter your todo"
          onChangeText={handleChangeTextGoal}
          value={todoGoal}
        />
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.buttonCustom,
            todoGoal ? styles.buttonActive : styles.buttonDisabled,
          ]}
          onPress={handleSubmitGoal}
          disabled={todoGoal ? false : true}
        >
          <Text style={styles.textButton}>Add Todo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerGoals}>
        <Text style={styles.goalsTextTitle}>Your todo here...</Text>

        <FlatList
          data={todoGoals}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          maxToRenderPerBatch={5}
        />
      </View>
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <Component />
    </SafeAreaProvider>
  );
}
