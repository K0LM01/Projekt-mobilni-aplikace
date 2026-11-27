import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from "react";

// Definování parametrů panelu
export interface PanelParams {
  heightCm: number; // v cm
  widthCm: number; // v cm
  powerWp: number; // v Wp
}

export interface CalculationRecord {
  id: string;
  createdAt: string;
  roofHeight: number;
  roofWidth: number;
  panelCount: number;
  totalPowerWp: number;
  panelParams: PanelParams;
}

interface SolarContextType {
  panelParams: PanelParams;
  setPanelParams: Dispatch<React.SetStateAction<PanelParams>>;
  history: CalculationRecord[];
  addToHistory: (record: CalculationRecord) => Promise<void>;
  deleteFromHistory: (id: string) => Promise<void>;
  clearHistory: () => Promise<void>;
}

const HISTORYY_STORAGE_KEY = "@solar_history_v1";

// Nastavení výchozích hodnot
const DEFAULT_PANEL: PanelParams = {
  heightCm: 172,
  widthCm: 113,
  powerWp: 420,
};

const SolarContext = createContext<SolarContextType | undefined>(undefined);

export function SolarProvider({ children }: { children: React.ReactNode }) {
  const [panelParams, setPanelParams] = useState<PanelParams>(DEFAULT_PANEL);
  const [history, setHistory] = useState<CalculationRecord[]>([]);

  // Načtení historie při startu aplikace
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const saved = await AsyncStorage.getItem(HISTORYY_STORAGE_KEY);
        if (saved) {
          setHistory(JSON.parse(saved));
        }
      } catch (error) {
        console.error("Chyba při načítání historie:", error);
      }
    };
    loadHistory();
  }, []);

  // Uložení nové položky do historie
  const addToHistory = async (record: CalculationRecord) => {
    try {
      const updated = [record, ...history];
      setHistory(updated);
      await AsyncStorage.setItem(HISTORYY_STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Chyba při ukládání historie:", error);
    }
  };

  // Smazání jedné položky z historie
  const deleteFromHistory = async (id: string) => {
    try {
      const updated = history.filter((item) => item.id !== id);
      setHistory(updated);
      await AsyncStorage.setItem(HISTORYY_STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Chyba při mazání položky z historie:", error);
    }
  };

  // Smazání celé historie
  const clearHistory = async () => {
    try {
      setHistory([]);
      await AsyncStorage.removeItem(HISTORYY_STORAGE_KEY);
    } catch (error) {
      console.error("Chyba při mazání historie:", error);
    }
  };

  return (
    <SolarContext.Provider
      value={{
        panelParams,
        setPanelParams,
        history,
        addToHistory,
        deleteFromHistory,
        clearHistory,
      }}
    >
      {children}
    </SolarContext.Provider>
  );
}

export function useSolar() {
  const context = useContext(SolarContext);
  if (!context) {
    throw new Error("useSolar musí být uvnitř SolarProvider");
  }
  return context;
}