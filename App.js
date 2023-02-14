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
  const [visibleTriangle, setVisibleTriangle] = useState(true);
  const [visibleAskMe, setvisibleAskMe] = useState(true);
  const [backgroundColorShake, setbackgroundColorShake] = useState("white");
  const [scaleValue] = useState(new Animated.Value(1));
  const [visibleAnswer, setvisibleAnswer] = useState(false);
  const homeMessage1 = "Ask me anything";
  const homeMessage2 = "Then shake";

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: shake ? 5 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [shake]);

  useEffect(() => {
    Accelerometer.setUpdateInterval(50);
    Accelerometer.addListener(({ x, y, z }) => {
      if (shake) {
        return;
      }

      if (Math.abs(x) + Math.abs(y) + Math.abs(z) > 6) {
        setbackgroundColorShake("black");
        setVisibleTriangle(false);
        setvisibleAnswer(true);
        setShake(true);
        setvisibleAskMe(false);

        setAnswer(answers[Math.floor(Math.random() * answers.length)]);
        setTimeout(() => {
          setShake(false);
          setvisibleAnswer(false);
          setVisibleTriangle(true);
          setbackgroundColorShake("white");
          setvisibleAskMe(true);
        }, 4000);
      }
    });
    return () => {
      Accelerometer.removeAllListeners();
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: backgroundColorShake,
      }}
    >
      {visibleTriangle && (
        <Animated.View
          style={{
            transform: [{ scale: scaleValue }],
          }}
        >
          <Triangle style={{ zindex: 0 }} />
        </Animated.View>
      )}

      {visibleAskMe && (
        <>
          <Text
            style={{
              // fontFamily: "Lexend Deca",
              fontSize: 36,
              fontWeight: "bold",
              marginTop: 50,
              zindex: 1,
            }}
          >
            {homeMessage1}
          </Text>
          <Text
            style={{
              // fontFamily: "Lexend Deca",
              fontSize: 26,
              fontWeight: "light",
              zindex: 1,
            }}
          >
            {homeMessage2}
          </Text>
        </>
      )}
      {visibleAnswer && <Text style={styles.answer}>{answer}</Text>}
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
    marginTop: 20,
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
    zindex: 1,
  },
});
