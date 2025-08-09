import React, { useEffect, useState } from "react";
import Container from "../../../../Components/Container";
import Tab from "../../../../Components/Tab";
import General from "../Add/Tabs/General";
import { useSelector } from "react-redux";
import Image from "../Add/Tabs/Image";
import Tecs from "../Add/Tabs/Tecs";
import Links from "../Add/Tabs/Links";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../../../Features/Tab/TabSlice";
const index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setActiveTab("Genel Bilgiler"));
  }, []);

  const activeTab = useSelector((state) => state.tab.activeTab);
  const tabs = [
    {
      name: "Genel Bilgiler",
    },
    {
      name: "Resimler",
    },
    {
      name: "Teknolojiler",
    },
    {
      name: "Linkler",
    },
  ];

  const [initialValues, setInitialValues] = useState({
    title: "",
    clientName: "",
    timeline: "",
    description: "",
    publish_year: "",
    github: "",
    website: "",
    images: [],
  });

  const [technologies, setTechnologies] = useState([]);
 
  return (
    <Container pageName="Projeler Ekle">
      <Tab tabs={tabs}></Tab>
      {activeTab === "Genel Bilgiler" && (
        <General
          nextTab="Images"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {activeTab === "Resimler" && (
        <Image
          nextTab="Resimler"
          prevTab="Genel Bilgiler"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {activeTab === "Teknolojiler" && (
        <Tecs
          nextTab="Teknolojiler"
          prevTab="Resimler"
          technologies={technologies}
          setTechnologies={setTechnologies}
        />
      )}
      {activeTab === "Linkler" && (
        <Links
          nextTab="Linkler"
          prevTab="Teknolojiler"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
          technologies={technologies}
        />
      )}
    </Container>
  );
};

export default index;
