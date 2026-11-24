import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#f59e0b" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Panel",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="sunny-outline"
              size={size}
              color={color as string | undefined}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="calculator"
        options={{
          title: "Vypocet",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              size={size}
              color={color as string | undefined}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "Historie",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="time-outline"
              size={size}
              color={color as string | undefined}
            />
          ),
        }}
      />
    </Tabs>
  );
}
