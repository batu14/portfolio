import Tab from "../../../Components/Tab";
import Container from "../../../Components/Container";
import { useSelector } from "react-redux";
import Landing from "./Landing/index";
import Skills from "./Skills/index";
import About from "./About/index";
import Timeline from "./Timeline/index"
import { CiAlarmOn } from "react-icons/ci";

const index = () => {

  const activeTab = useSelector((state) => state.tab.activeTab);

  const tabs = [
    {
      name: "Landing",
      icon: <CiAlarmOn></CiAlarmOn>
    },
    {
      name: "Skills",
    },
    {
      name: "About",
    },
    {
      name: "Timeline"
    }
  ];
  return (
    <Container pageName={activeTab ? activeTab + " Pages" : "Pages"}>
      <Tab tabs={tabs}></Tab>
      {activeTab === "Landing" && <Landing />}
      {activeTab === "Skills" && <Skills />}
      {activeTab === "About" && <About />}
      {activeTab === "Timeline" && <Timeline />}
    </Container>
  );
};

export default index;
