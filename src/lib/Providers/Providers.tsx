"use client"; // Ensures this component is rendered on the client

import { ThemeProvider } from "@mui/material";
import { theme } from "../theme/theme"; // Make sure this is a valid MUI theme
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ReduxProvider>
  );
};

export default Providers;
