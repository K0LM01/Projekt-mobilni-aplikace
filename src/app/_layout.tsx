import { Stack } from "expo-router";
import { SolarProvider } from "../../context/SolarContext";

export default function RootLayout() {
  return (
    <SolarProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </SolarProvider>
  );
}
