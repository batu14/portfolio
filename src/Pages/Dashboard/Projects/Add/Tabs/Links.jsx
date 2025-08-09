import React from "react";
import InputComp from "../../../../../Components/InputComp";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../../../../Features/Tab/TabSlice";
import Button from "../../../../../Components/Button";
import { useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
const Links = ({
  setInitialValues,
  initialValues,
  prevTab,
  technologies,
}) => {
  const token = useSelector((state) => state.token.token);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("title", initialValues.title);
    formData.append("description", initialValues.description);
    formData.append("clientName", initialValues.clientName);
    formData.append("timeline", initialValues.timeline);
    formData.append("publish_year", initialValues.publish_year);
    formData.append("github", initialValues.github);
    formData.append("website", initialValues.website);
    initialValues.images.forEach((image, index) => {
      formData.append("images[" + index + "]", image);
    });
    if(technologies && technologies.length > 0){
      const technologiesString = technologies.map((technology) => technology).join(",");
      formData.append("technologies", technologiesString);
      console.log(technologiesString);
    }
    fetch(import.meta.env.VITE_API_URL + "projects/create", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if(res.status === 200){
        toast.success("Proje başarıyla oluşturuldu");
      }else{
        toast.error("Proje oluşturulamadı");
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
        value={initialValues.website}
        onChange={(e) =>
          setInitialValues({ ...initialValues, website: e.target.value })
        }
        label="Website"
        placeholder="Website"
      />
      <div className="w-full flex items-center justify-end gap-2">
        <Button
          variant="primary"
          onClick={() => dispatch(setActiveTab(prevTab))}
        >
          Geri
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            handleSubmit();
          }}
        >
          Gönder
        </Button>
      </div>
    </div>
  );
};

export default Links;
