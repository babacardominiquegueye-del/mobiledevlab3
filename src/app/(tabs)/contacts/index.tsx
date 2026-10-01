import { Link } from "expo-router";
import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { ContactRow } from "@/components/ContactRow";
import { CONTACTS } from "@/data/contacts";

export default function Contacts() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return CONTACTS.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedQuery)
    );
  }, [query]);

  return (
    <View style={styles.screen}>
      <FlatList
        data={filtered}
        keyExtractor={(contact) => contact.id}
        renderItem={({ item }) => (
          <Link
            href={{ pathname: "/contacts/[id]", params: { id: item.id } }}
            asChild
          >
            <Pressable>
              <ContactRow contact={item} />
            </Pressable>
          </Link>
        )}
        ListHeaderComponent={
          <View>
            <View style={styles.headerRow}>
              <Text style={styles.count}>
                {filtered.length} contact{filtered.length === 1 ? "" : "s"}
              </Text>
              <Link href="/new-message" asChild>
                <Pressable>
                  <Text style={styles.action}>New</Text>
                </Pressable>
              </Link>
            </View>
            <TextInput
              style={styles.search}
              placeholder="Search…"
              value={query}
              onChangeText={setQuery}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <Text style={styles.empty}>{`No contact matches “${query}”.`}</Text>
        }
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },

  list: {
    flex: 1,
  },

  listContent: {
    padding: 16,
    paddingBottom: 32,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,
  },

  count: {
    color: "#888",
  },

  action: {
    color: "#1a5276",
    fontWeight: "600",
  },

  search: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 14,
    marginBottom: 12,
  },

  separator: {
    height: 1,
    backgroundColor: "#e5e5e5",
  },

  empty: {
    textAlign: "center",
    color: "#888",
    paddingVertical: 32,
  },
});
