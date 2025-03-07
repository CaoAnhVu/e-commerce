import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { store } from "./store";
import { theme } from "./theme";
import "./App.css";
import AppRoutes from "./routes";
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
