import Tab from "../../../Components/Tab";
import Container from "../../../Components/Container";
import { useSelector ,useDispatch} from "react-redux";
import Landing from "./Landing/index";
import Skills from "./Skills/index";
import About from "./About/index";
import Timeline from "./Timeline/index";
import { FaHome, FaNetworkWired } from "react-icons/fa";
import { FaTimeline } from "react-icons/fa6";
import { CiTextAlignLeft } from "react-icons/ci";
import { useEffect } from "react";
import { setActiveTab } from "../../../Features/Tab/TabSlice";

const index = () => {
  const activeTab = useSelector((state) => state.tab.activeTab);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setActiveTab("Landing"));
  }, []);

  const tabs = [
    {
      name: "Landing",
      icon: <FaHome />,
    },
    {
      name: "Skills",
      icon: <FaNetworkWired />,
    },
    {
      name: "About",
      icon: <CiTextAlignLeft />,
    },
    {
      name: "Timeline",
      icon: <FaTimeline />,
    },
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
