import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const mealDatabase = [
  {
    name: "Adobo",
    ingredients: ["chicken", "soy sauce", "vinegar", "garlic", "bay leaves"],
  },
  {
    name: "Sinigang na Baboy",
    ingredients: ["pork belly", "tamarind", "tomato", "onion", "radish"],
  },
  {
    name: "Pancit Canton",
    ingredients: ["noodles", "shrimp", "chicken", "carrot", "soy sauce"],
  },
];

export default function App() {
  const [mealPlan, setMealPlan] = useState({});
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedMealType, setSelectedMealType] = useState("Breakfast");
  const [groceryList, setGroceryList] = useState([]);

  const addMealToPlan = (meal) => {
    setMealPlan((prevPlan) => {
      const updatedPlan = { ...prevPlan };
      if (!updatedPlan[selectedDay]) updatedPlan[selectedDay] = {};
      updatedPlan[selectedDay][selectedMealType] = meal;
      return updatedPlan;
    });
    setGroceryList((prevList) => {
      const updatedList = [...new Set([...prevList, ...meal.ingredients])];
      return updatedList;
    });
  };

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snacks"];

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>🌱 Meal Planner</Text>

        <Text style={styles.sectionTitle}>Select Day:</Text>
        <View style={styles.buttonGroup}>
          {daysOfWeek.map((day) => (
            <Button
              key={day}
              title={day}
              onPress={() => setSelectedDay(day)}
              color={selectedDay === day ? "#66BB6A" : "#98C9A3"}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Choose Meal Type:</Text>
        <View style={styles.buttonGroup}>
          {mealTypes.map((type) => (
            <Button
              key={type}
              title={type}
              onPress={() => setSelectedMealType(type)}
              color={selectedMealType === type ? "#66BB6A" : "#98C9A3"}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Recipe Suggestions:</Text>
        <View style={styles.mealList}>
          {mealDatabase.map((meal) => (
            <View style={styles.mealItem} key={meal.name}>
              <Text style={styles.mealName}>{meal.name}</Text>
              <Button
                title="Add Meal"
                onPress={() => addMealToPlan(meal)}
                color="#4CAF50"
              />
            </View>
          ))}
        </View>

        <Text style={styles.planHeader}>🌾 Meal Plan for {selectedDay}</Text>
        <FlatList
          data={mealTypes}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Text style={styles.text}>
              {item}: {mealPlan[selectedDay]?.[item]?.name || "No meal planned"}
            </Text>
          )}
          ListEmptyComponent={
            <Text style={styles.text}>No meals planned for this day.</Text>
          }
        />

        <Text style={styles.groceryHeader}>🛒 Grocery List:</Text>
        {groceryList.length > 0 ? (
          groceryList.map((item, index) => (
            <Text style={styles.text} key={index}>
              {item}
            </Text>
          ))
        ) : (
          <Text style={styles.text}>No ingredients added.</Text>
        )}

        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#E6F4EA", // light green background
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 25,
    color: "#2E8B57", // sea green
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2E4F34", // deep greenish brown
    marginTop: 15,
    marginBottom: 5,
  },
  buttonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 5,
    marginBottom: 10,
  },
  mealList: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  mealItem: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#c8e6c9",
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "85%",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  mealName: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "600",
    color: "#2E4F34",
  },
  planHeader: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1B5E20",
    marginTop: 20,
    marginBottom: 5,
  },
  groceryHeader: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
    color: "#1B5E20",
  },
  text: {
    fontSize: 15,
    color: "#2E4F34",
    marginVertical: 2,
  },
});
