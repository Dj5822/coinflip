import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import theme from "./theme.ts";
import Homepage from "./pages/Homepage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
