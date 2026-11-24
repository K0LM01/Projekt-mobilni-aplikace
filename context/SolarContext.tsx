import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
    createContext,
    Dispatch,
    useContext,
    useEffect,
    useState
} from "react";

//Definovani paramtru panelu
export interface PanelParams {
  heightCm: number; //v cm
  widthCm: number; //v cm
  powerWp: number; //v Wp
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
}

const HISTORYY_STORAGE_KEY = "@solar_history_v1";

//nastaevení výchozích hodnot
const DEFAULT_PANEL: PanelParams = {
  heightCm: 172,
  widthCm: 113,
  powerWp: 420,
};

const SolarContext = createContext<SolarContextType | undefined>(undefined);

export function SolarProvider({ children }: { children: React.ReactNode }) {
  const [panelParams, setPanelParams] = useState<PanelParams>(DEFAULT_PANEL);
  const [history, setHistory] = useState<CalculationRecord[]>([]);

  //nacteni historie pri startu aplikace
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const saved = await AsyncStorage.getItem(HISTORYY_STORAGE_KEY);
        if (saved) {
          setHistory(JSON.parse(saved));
        }
      } catch (error) {
        console.error("Chyba pri nacitani historie:", error);
      }
    };
    loadHistory();
  }, []);

  //ulozeni nove polozky do historie
  const addToHistory = async (record: CalculationRecord) => {
    try {
      const update = [record, ...history];
      setHistory(update);
      await AsyncStorage.setItem(HISTORYY_STORAGE_KEY, JSON.stringify(update));
    } catch (error) {
      console.error("Chyba pri ukládání historie:", error);
    }
  };
}

export function useSolar() {
  const context = useContext(SolarContext);
  if (!context) {
    throw new Error("useSolar musi byt uvnitr SolarProvider");
  }
  return context;
}
