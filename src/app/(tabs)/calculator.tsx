import { useState } from "react";
import {
  Alert,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CalculationRecord, useSolar } from "../../../context/SolarContext";

export default function CalculatorScreen() {
  const { panelParams, addToHistory } = useSolar();

  const [titleText, setTitleText] = useState("");
  const [roofHeightText, setRoofHeightText] = useState("6");
  const [roofWidthText, setRoofWidthText] = useState("10");

  const roofHeightM = Number(roofHeightText.replace(",", "."));
  const roofWidthM = Number(roofWidthText.replace(",", "."));

  const panelHeightM = panelParams.heightCm / 100;
  const panelWidthM = panelParams.widthCm / 100;

  const validInputs =
    !isNaN(roofHeightM) &&
    roofHeightM > 0 &&
    !isNaN(roofWidthM) &&
    roofWidthM > 0 &&
    panelHeightM > 0 &&
    panelWidthM > 0;

  const rows = validInputs ? Math.floor(roofHeightM / panelHeightM) : 0;
  const cols = validInputs ? Math.floor(roofWidthM / panelWidthM) : 0;
  const panelCount = rows * cols;

  const totalPowerKw = Number(
    ((panelCount * panelParams.powerWp) / 1000).toFixed(2),
  );
  const totalPowerWp = panelCount * panelParams.powerWp;

  const handleSaveToHistory = async () => {
    if (!validInputs) {
      Alert.alert(
        "Neplatné rozměry",
        "Zadej prosím kladnou výšku a šířku střechy v metrech.",
      );
      return;
    }

    const trimmedTitle = titleText.trim();

    const record: CalculationRecord = {
      id: String(Date.now()),
      title: trimmedTitle.length > 0 ? trimmedTitle : "Výpočet střechy",
      createdAt: new Date().toLocaleString("cs-CZ"),
      roofHeight: roofHeightM,
      roofWidth: roofWidthM,
      panelCount,
      totalPowerWp,
      panelParams: { ...panelParams },
    };

    await addToHistory(record);
    Keyboard.dismiss();
    Alert.alert(
      "Uloženo do historie",
      `Výpočet „${record.title}“ byl přidán do historie.`,
    );
  };

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>Výpočet pro střechu</Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Aktuální panel (z Panel):</Text>
          <Text style={styles.infoText}>
            {panelParams.heightCm} × {panelParams.widthCm} cm |{" "}
            {panelParams.powerWp} Wp
          </Text>
        </View>

        <Text style={styles.label}>Název výpočtu (nepovinné)</Text>
        <TextInput
          style={styles.input}
          value={titleText}
          onChangeText={setTitleText}
          placeholder="např. Jižní střecha nebo Garáž"
        />

        <Text style={styles.label}>Výška střechy (m)</Text>
        <TextInput
          style={styles.input}
          value={roofHeightText}
          onChangeText={setRoofHeightText}
          keyboardType="numeric"
          placeholder="např. 6"
        />

        <Text style={styles.label}>Šířka střechy (m)</Text>
        <TextInput
          style={styles.input}
          value={roofWidthText}
          onChangeText={setRoofWidthText}
          keyboardType="numeric"
          placeholder="např. 10"
        />

        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>Vejde se panelů:</Text>
          <Text style={styles.resultValue}>
            {panelCount} ks ({rows} řad × {cols} sloupců)
          </Text>

          <Text style={[styles.resultLabel, { marginTop: 12 }]}>
            Celkový výkon:
          </Text>
          <Text style={styles.resultValue}>{totalPowerKw} kWp</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSaveToHistory}>
          <Text style={styles.buttonText}>Uložit výpočet do historie</Text>
        </TouchableOpacity>
      </ScrollView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f8fafc",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#0f172a",
  },
  infoBox: {
    backgroundColor: "#fef3c7",
    borderRadius: 8,
    padding: 12,
    marginBottom: 18,
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#92400e",
  },
  infoText: {
    fontSize: 15,
    color: "#78350f",
    marginTop: 2,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6,
    color: "#334155",
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  resultBox: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    padding: 16,
    marginTop: 4,
    marginBottom: 16,
  },
  resultLabel: {
    fontSize: 14,
    color: "#64748b",
  },
  resultValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f172a",
    marginTop: 2,
  },
  button: {
    backgroundColor: "#f59e0b",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});