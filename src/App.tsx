import "./index.css";

import type { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";

export const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};
