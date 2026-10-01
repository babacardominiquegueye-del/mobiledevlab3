import { StyleSheet, Text, View } from "react-native";

type BubbleProps = {
  text: string;
  mine?: boolean;
};

export function Bubble({ text, mine }: BubbleProps) {
  return (
    <View style={[styles.bubble, mine && styles.bubbleMine]}>
      <Text style={mine && styles.textMine}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 14,
    maxWidth: "75%",
    margin: 8,
    alignSelf: "flex-start",
  },

  bubbleMine: {
    backgroundColor: "#1a5276",
    alignSelf: "flex-end",
  },

  textMine: {
    color: "#fff",
  },
});