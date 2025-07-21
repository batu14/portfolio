import React, { useEffect } from "react";
import Tab from "../../../Components/Tab";
import Container from "../../../Components/Container";
import { useDispatch, useSelector } from "react-redux";
import Landing from "./Landing/index";
import Skills from "./Skills/index";
import About from "./About/index";
import { setActiveTab } from "../../../Features/Tab/TabSlice";

const index = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.tab.activeTab);
  
  const tabs = [
    {
      name: "Landing",
    },
    {
      name: "Skills",
    },
    {
      name: "About",
    },
  ];
  return (
    <Container pageName={activeTab ? activeTab + " Pages" : "Pages"}>
      <Tab tabs={tabs}></Tab>
      {activeTab === "Landing" && <Landing />}
      {activeTab === "Skills" && <Skills />}
      {activeTab === "About" && <About />}
    </Container>
  );
};

export default index;
