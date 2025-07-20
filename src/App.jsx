import React from "react";
import Landing from "./Pages/Landing/index";
import { Router, Route, Routes } from "react-router";
import ProjectDetail from "./Pages/Projects/ProjectDetail";
import { AnimatePresence } from "framer-motion";

const App = () => {
  return (
    <AnimatePresence>
      <Routes>
        <Route path="/" element={<Landing></Landing>}></Route>
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
