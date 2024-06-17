import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18next/i18n.ts";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider theme={darkTheme}>
      <I18nextProvider i18n={i18n} defaultNS={"translations"}>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </AuthProvider>
      </I18nextProvider>
    </ThemeProvider>
  </BrowserRouter>
);
