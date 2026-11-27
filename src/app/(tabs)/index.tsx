import { useEffect, useState } from "react";
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
import { PanelParams, useSolar } from "../../../context/SolarContext";

interface PanelPreset {
  label: string;
  params: PanelParams;
}

const PRESETS: PanelPreset[] = [
  {
    label: "Běžný panel (420 Wp)",
    params: { heightCm: 172, widthCm: 113, powerWp: 420 },
  },
  {
    label: "Silnější standard (450 Wp)",
    params: { heightCm: 176, widthCm: 113, powerWp: 450 },
  },
  {
    label: "Větší panel (500 Wp)",
    params: { heightCm: 196, widthCm: 113, powerWp: 500 },
  },
];

export default function PanelParamsScreen() {
  const { panelParams, setPanelParams } = useSolar();

  const [heightText, setHeightText] = useState(String(panelParams.heightCm));
  const [widthText, setWidthText] = useState(String(panelParams.widthCm));
  const [powerText, setPowerText] = useState(String(panelParams.powerWp));

  useEffect(() => {
    setHeightText(String(panelParams.heightCm));
    setWidthText(String(panelParams.widthCm));
    setPowerText(String(panelParams.powerWp));
  }, [panelParams]);

  const applyPreset = (preset: PanelPreset) => {
    setPanelParams(preset.params);
    setHeightText(String(preset.params.heightCm));
    setWidthText(String(preset.params.widthCm));
    setPowerText(String(preset.params.powerWp));
    Keyboard.dismiss();
  };

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
      Alert.alert(
        "Neplatné hodnoty",
        "Zadej prosím kladná čísla pro výšku, šířku i výkon panelu.",
      );
      return;
    }

    setPanelParams({ heightCm, widthCm, powerWp });
    Keyboard.dismiss();
    Alert.alert("Uloženo", "Parametry panelu byly aktualizovány.");
  };

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>Parametry solárního panelu</Text>

        <Text style={styles.sectionLabel}>Rychlé předvolby</Text>
        <View style={styles.presetsRow}>
          {PRESETS.map((preset) => (
            <TouchableOpacity
              key={preset.label}
              style={styles.presetButton}
              onPress={() => applyPreset(preset)}
            >
              <Text style={styles.presetButtonText}>{preset.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

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

        <Text style={styles.label}>Výkon panelu (Wp)</Text>
        <TextInput
          style={styles.input}
          value={powerText}
          onChangeText={setPowerText}
          keyboardType="numeric"
          placeholder="např. 420"
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Uložit parametry panelu</Text>
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
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 8,
  },
  presetsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  presetButton: {
    backgroundColor: "#fef3c7",
    borderWidth: 1,
    borderColor: "#f59e0b",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  presetButtonText: {
    color: "#92400e",
    fontWeight: "600",
    fontSize: 13,
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
    marginTop: 4,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});