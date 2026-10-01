import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bubble } from "@/components/Bubble";

const START_MESSAGES = [
  { id: "1", text: "Hi!", mine: false },
  { id: "2", text: "Hello 👋", mine: true },
  { id: "3", text: "Ready for the lab?", mine: false },
];

export default function Chat() {
  const { name } = useLocalSearchParams<{ name?: string }>();
  const [messages, setMessages] = useState(START_MESSAGES);
  const [draft, setDraft] = useState("");

  function send() {
    if (draft.trim() === "") return;

    const next = {
      id: String(Date.now()),
      text: draft.trim(),
      mine: true,
    };

    setMessages([...messages, next]);
    setDraft("");
  }

  return (
    <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <Image source="https://i.pravatar.cc/100" style={styles.avatar} />

        <Text style={styles.name}>{name ?? "Conversation"}</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(m) => m.id}
        renderItem={({ item }) => <Bubble text={item.text} mine={item.mine} />}
        ListHeaderComponent={<Text style={styles.dateLabel}>Today</Text>}
        ListEmptyComponent={
          <Text style={styles.empty}>No messages yet. Say hello.</Text>
        }
        style={styles.messages}
        contentContainerStyle={styles.messagesContent}
        keyboardShouldPersistTaps="handled"
      />

      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          placeholder="Write a message…"
          value={draft}
          onChangeText={setDraft}
        />

        <Pressable style={styles.send} onPress={send}>
          <Text style={styles.sendLabel}>➤</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  name: {
    fontSize: 17,
    fontWeight: "bold",
  },

  empty: {
    textAlign: "center",
    color: "#888",
    paddingVertical: 32,
  },

  dateLabel: {
    textAlign: "center",
    color: "#888",
    fontSize: 12,
    paddingBottom: 8,
  },

  messages: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },

  messagesContent: {
    paddingVertical: 8,
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 14,
    height: 40,
  },

  send: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1a5276",
    justifyContent: "center",
    alignItems: "center",
  },

  sendLabel: {
    color: "#fff",
    fontSize: 16,
  },
});