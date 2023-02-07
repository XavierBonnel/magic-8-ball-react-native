import React from "react";
import { View, StyleSheet } from "react-native";

const Triangle = () => {
  return <View style={styles.triangle} />;
};

const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 150,
    borderRightWidth: 150,
    borderBottomWidth: 280,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "black",
  },
});

export default Triangle;
