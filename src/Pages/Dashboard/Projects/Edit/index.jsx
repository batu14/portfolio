import React, { useEffect, useState } from "react";
import Container from "../../../../Components/Container";
import Tab from "../../../../Components/Tab";
import General from "../Add/Tabs/General";
import { useSelector } from "react-redux";
import Image from "../Edit/Tabs/Image";
import Tecs from "../Edit/Tabs/Tecs";
import Links from "../Edit/Tabs/Links";
import { useParams } from "react-router";
const index = () => {
  const token = useSelector((state) => state.token.token);
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

  const { id } = useParams();
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "projects/" + id,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setInitialValues({
            title: data.data.title,
            clientName: data.data.clientName,
            timeline: data.data.timeline,
            description: data.data.description,
            publishYear: data.data.publishYear,
            github: data.data.github,
            demo: data.data.demo,
          });

          setOImages(data.data.images.replace(/[\[\]"]/g, "").split(","));
          setTechnologies(data.data.tecs);
        } else {
          setInitialValues({});
        }
      });
  }, [id]);

  const [initialValues, setInitialValues] = useState({
    title: "",
    clientName: "",
    timeline: "",
    description: "",
    publishYear: "",
    github: "",
    demo: "",
    images: [],
  });
  const [oImages, setOImages] = useState([]);
  const [technologies, setTechnologies] = useState([]);

  return (
    <Container pageName="Projeler Ekle">
      <Tab tabs={tabs}></Tab>
      {activeTab === "Genel Bilgiler" && (
        <General
          nextTab="Resimler"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {activeTab === "Resimler" && (
        <Image
          nextTab="Teknolojiler"
          prevTab="Genel Bilgiler"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
          oImages={oImages}
          setOImages={setOImages}
        />
      )}
      {activeTab === "Teknolojiler" && (
        <Tecs
          nextTab="Linkler"
          prevTab="Resimler"
          technologies={technologies}
          setTechnologies={setTechnologies}
        />
      )}
      {activeTab === "Linkler" && (
        <Links
          technologies={technologies}
          prevTab="Teknolojiler"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
    </Container>
  );
};

export default index;
