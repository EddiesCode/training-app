import { SafeAreaView } from "react-native-safe-area-context";
import Navigation from "./navigation";
import ThemeProvider from "./context/themeContext";
import { useEffect } from "react";
import workoutStore from "./store/workoutStore/workoutStore";

// App Navigation Component
export default function App() {
  useEffect(() => {
    return () => {
      workoutStore.stopStore();
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    </SafeAreaView>
  );
}
