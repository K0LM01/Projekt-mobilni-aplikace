import { StyleSheet, Text, View } from "react-native";

export default function CalculatorScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Střecha a výpočet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold" },
});
