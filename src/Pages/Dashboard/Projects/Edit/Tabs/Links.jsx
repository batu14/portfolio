import React from "react";
import { useParams, useNavigate } from "react-router";
import { Toaster, toast } from "react-hot-toast";
import InputComp from "../../../../../Components/InputComp";
import Button from "../../../../../Components/Button";
import { useSelector } from "react-redux";

const Links = ({ setInitialValues, initialValues, technologies }) => {
  const token = useSelector((state) => state.token.token);
  const { id } = useParams();
  const navigate = useNavigate();
  const submitHandler = () => {
    console.log(initialValues);
    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", initialValues.title);
    formData.append("description", initialValues.description);
    formData.append("clientName", initialValues.clientName);
    formData.append("timeline", initialValues.timeline);
    formData.append("publish_year", initialValues.publishYear);
    formData.append("github", initialValues.github);
    formData.append("demo", initialValues.demo);
    initialValues.images
      ? initialValues.images.map((image, index) => {
          formData.append("images[" + index + "]", image);
        })
      : null;
    if (technologies && technologies.length > 0) {
      const technologiesString = technologies
        .map((technology) => technology)
        .join(",");
      formData.append("technologies", technologiesString);
    }
    fetch(import.meta.env.VITE_API_URL + "projects/update", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => res.json()).then(data => {
      if(data.status === 200){
        toast.success(data.message);
      }else{
        toast.error(data.message);
      }
    });
  };

  return (
    <div className="w-full flex flex-col gap-4 items-start mt-4 justify-start">
      <Toaster />
      <InputComp
        value={initialValues.github}
        onChange={(e) =>
          setInitialValues({ ...initialValues, github: e.target.value })
        }
        label="Github"
        placeholder="Github"
      />
      <InputComp
        value={initialValues.demo}
        onChange={(e) =>
          setInitialValues({ ...initialValues, demo: e.target.value })
        }
        label="Website"
        placeholder="Website"
      />

      <Button
        variant="primary"
        onClick={() => {
          submitHandler();
        }}
      >
        Güncelle
      </Button>
    </div>
  );
};

export default Links;
