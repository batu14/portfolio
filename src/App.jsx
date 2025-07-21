import React from "react";
import Landing from "./Pages/Landing/index";
import { Router, Route, Routes } from "react-router";
import ProjectDetail from "./Pages/Projects/ProjectDetail";
import { AnimatePresence } from "framer-motion";
import Login from "./Pages/Admin/Login";
import Dashboard from "./Pages/Dashboard/index";
import ErrorPage from "./Pages/ErrorPage";
import Pages from "./Pages/Dashboard/Pages";
import { Provider } from "react-redux";
import { store } from "./store";
const App = () => {
  return (
    <Provider store={store}>
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<Landing></Landing>}></Route>
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />}>
            <Route path="pages" element={<Pages />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AnimatePresence>
    </Provider>
  );
};

export default App;
