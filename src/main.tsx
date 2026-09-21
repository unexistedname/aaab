import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/Home.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ImageEditor from "./pages/ImageEditor.tsx";
import ImageProvider from "./provider/ImageProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/edit"
          element={
            <ImageProvider>
              <ImageEditor />
            </ImageProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
