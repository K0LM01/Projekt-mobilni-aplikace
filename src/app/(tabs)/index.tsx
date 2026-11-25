import { useState } from "react";
import {
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { useSolar } from "../../../context/SolarContext";

export default function PanelScreen() {
  const { panelParams, setPanelParams } = useSolar();

  const [heightText, setHeightText] = useState(String(panelParams.heightCm));
  const [widthText, setWidthText] = useState(String(panelParams.widthCm));
  const [powerText, setPowerText] = useState(String(panelParams.powerWp));

  const handleSave = () => {
    const heightCm = Number(heightText.replace(",", "."));
    const widthCm = Number(widthText.replace(",", "."));
    const powerWp = Number(powerText.replace(",", "."));

    if (
      isNaN(heightCm) ||
      heightCm <= 0 ||
      isNaN(widthCm) ||
      widthCm <= 0 ||
      isNaN(powerWp) ||
      powerWp <= 0
    ) {
      Alert.alert("Neplatné údaje", "Zadejte kladná čísla u všech parametrů.");
      return;
    }

    setPanelParams({ heightCm, widthCm, powerWp });
    Alert.alert("Uloženo", "Parametry panelu byly aktualizovány.");
  };

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <Text style={styles.heading}>Parametry solárního panelu</Text>
      <Text style={styles.label}>Výška panelu (cm)</Text>
      <TextInput
        style={styles.input}
        value={heightText}
        onChangeText={setHeightText}
        keyboardType="numeric"
        placeholder="např. 172"
      />

      <Text style={styles.label}>Šířka panelu (cm)</Text>
      <TextInput
        style={styles.input}
        value={widthText}
        onChangeText={setWidthText}
        keyboardType="numeric"
        placeholder="např. 113"
      />

      <Text style={styles.label}>Výkon jednoho panelu (Wp)</Text>
      <TextInput
        style={styles.input}
        value={powerText}
        onChangeText={setPowerText}
        keyboardType="numeric"
        placeholder="např. 420"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Uložit parametry</Text>
      </TouchableOpacity>
    </Pressable>
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
    marginBottom: 20,
    color: "#0f172a",
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
  button: {
    backgroundColor: "#f59e0b",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
