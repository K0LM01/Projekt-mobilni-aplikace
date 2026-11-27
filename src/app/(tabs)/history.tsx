import { FlatList, StyleSheet, Text, View } from "react-native";
import { CalculationRecord, useSolar } from "../../../context/SolarContext";

export default function HistoryScreen() {
  const { history } = useSolar();

  const renderItem = ({ item }: { item: CalculationRecord }) => (
    <View style={styles.card}>
      <Text style={styles.date}>{item.createdAt}</Text>
      <Text style={styles.mainResult}>
        {item.panelCount} panelů • {item.totalPowerKw} kWp
      </Text>
      <Text style={styles.details}>
        Střecha: {item.roofHeightM} × {item.roofWidthM} m
      </Text>
      <Text style={styles.details}>
        Panel: {item.panelParams.heightCm} × {item.panelParams.widthCm} cm (
        {item.panelParams.powerWp} Wp)
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Historie výpočtů</Text>

      {history.length === 0 ? (
        <Text style={styles.emptyText}>
          Zatím tu nemáš žádné uložené výpočty. Zadej střechu ve druhém tabu a
          výpočet ulož.
        </Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8fafc",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#0f172a",
  },
  emptyText: {
    fontSize: 15,
    color: "#64748b",
    lineHeight: 22,
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  date: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 4,
  },
  mainResult: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 6,
  },
  details: {
    fontSize: 14,
    color: "#334155",
    marginTop: 2,
  },
});