import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, Animated, Easing } from "react-native";
import { Accelerometer } from "expo-sensors";
// import * as Font from "expo-font";

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
  // async function loadFonts() {
  //   await Font.loadAsync({
  //     "Lexend Deca": require("./fonts/LexendDeca-Regular.ttf"),
  //   });
  // }
  // useEffect(() => {
  //   loadFonts();
  // }, []);
  const [answer, setAnswer] = useState("");
  const [shake, setShake] = useState(false);
  const [visibleHome, setvisibleHome] = useState(true);
  const [backgroundColorShake, setbackgroundColorShake] = useState("white");
  const [opacity] = useState(new Animated.Value(1));
  const homeMessage1 = "Ask me anything";
  const homeMessage2 = "Then shake";

  Accelerometer.addListener(({ x, y, z }) => {
    if (shake) {
      return;
    }

    if (Math.abs(x) + Math.abs(y) + Math.abs(z) > 2.5) {
      console.log("shaken");
      setShake(true);
      setvisibleHome(false);

      setbackgroundColorShake("black");
      setAnswer(answers[Math.floor(Math.random() * answers.length)]);
      setTimeout(() => {
        setShake(false);
        setbackgroundColorShake("white");
        setvisibleHome(true);
      }, 4000);
    }
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: backgroundColorShake,
      }}
    >
      {visibleHome && (
        <>
          <Triangle />
          <Text
            style={{
              // fontFamily: "Lexend Deca",
              fontSize: 36,
              fontWeight: "bold",
              marginTop: 50,
            }}
          >
            {homeMessage1}
          </Text>
          <Text
            style={{
              // fontFamily: "Lexend Deca",
              fontSize: 26,
              fontWeight: "light",
            }}
          >
            {homeMessage2}
          </Text>
        </>
      )}

      <Text style={styles.answer}>{answer}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
    color: "white",
  },
});
