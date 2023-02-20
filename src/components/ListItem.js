import { Text, StyleSheet, Animated } from "react-native";
import React, { useRef, useEffect } from "react";

const ListItem = ({ item }) => {
  const scaling = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaling, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
      tension: 10,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[styles.goalWrapper, { transform: [{ scale: scaling }] }]}
    >
      <Text style={styles.goalText}>{item.text}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  goalWrapper: {
    backgroundColor: "#208AAE",
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    overflow: "hidden",
  },
  goalText: {
    color: "#ffff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ListItem;
