import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, Animated, Easing } from "react-native";
import { Accelerometer } from "expo-sensors";
import { useFonts } from "expo-font";

import Triangle from "./components/Triangle";

const answers = [
  "Yes",
  "No",
  "Maybe",
  "Ask again later",
  "Definitely",
  "Cannot predict now",
  "Most likely",
  "My sources say no",
];

export default function App() {
  async function loadFonts() {
    await Font.loadAsync({
      "Lexend Deca": require("./fonts/LexendDeca-Regular.ttf"),
    });
  }
  useEffect(() => {
    loadFonts();
  }, []);
  const [answer, setAnswer] = useState("");
  const [shake, setShake] = useState(false);
  const [opacity] = useState(new Animated.Value(1));
  const homeMessage1 = "Ask me anything";
  const homeMessage2 = "Then shake";

  Accelerometer.addListener(({ x, y, z }) => {
    if (shake) {
      return;
    }

    if (Math.abs(x) + Math.abs(y) + Math.abs(z) > 20) {
      setShake(true);
      setAnswer(answers[Math.floor(Math.random() * answers.length)]);
      Animated.timing(opacity, {
        toValue: 0.2,
        duration: 250,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start(() => {
          setShake(false);
        });
      });
    }
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.ball, { opacity }]}>
        <Triangle />
      </Animated.View>
      <Text
        style={{
          fontFamily: "Lexend Deca",
          fontSize: 36,
          fontWeight: "bold",
          marginTop: 50,
        }}
      >
        {homeMessage1}
      </Text>
      <Text
        style={{ fontFamily: "Lexend Deca", fontSize: 26, fontWeight: "light" }}
      >
        {homeMessage2}
      </Text>
      <Text style={styles.answer}>{answer}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ball: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  answer: {
    fontSize: 20,
    marginTop: 20,
  },
});
