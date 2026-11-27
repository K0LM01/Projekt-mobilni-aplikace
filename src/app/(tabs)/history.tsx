import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CalculationRecord, useSolar } from "../../../context/SolarContext";

export default function HistoryScreen() {
  const { history, deleteFromHistory, clearHistory } = useSolar();

  const handleDeleteOne = (id: string) => {
    Alert.alert(
      "Smazat záznam",
      "Opravdu chceš tento výpočet odstranit z historie?",
      [
        { text: "Zrušit", style: "cancel" },
        {
          text: "Smazat",
          style: "destructive",
          onPress: () => deleteFromHistory(id),
        },
      ]
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      "Vymazat historii",
      "Opravdu chceš smazat úplně všechny uložené výpočty?",
      [
        { text: "Zrušit", style: "cancel" },
        {
          text: "Vymazat vše",
          style: "destructive",
          onPress: () => clearHistory(),
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: CalculationRecord }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.date}>{item.createdAt}</Text>
        <TouchableOpacity onPress={() => handleDeleteOne(item.id)}>
          <Text style={styles.deleteText}>Smazat</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.mainResult}>
        {item.panelCount} panelů • {item.totalPowerWp} kWp
      </Text>
      <Text style={styles.details}>
        Střecha: {item.roofHeight} × {item.roofWidth} m
      </Text>
      <Text style={styles.details}>
        Panel: {item.panelParams.heightCm} × {item.panelParams.widthCm} cm (
        {item.panelParams.powerWp} Wp)
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.heading}>Historie výpočtů</Text>
        {history.length > 0 && (
          <TouchableOpacity onPress={handleClearAll}>
            <Text style={styles.clearAllText}>Smazat vše</Text>
          </TouchableOpacity>
        )}
      </View>

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
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0f172a",
  },
  clearAllText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#dc2626",
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
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#64748b",
  },
  deleteText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#dc2626",
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