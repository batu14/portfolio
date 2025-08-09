import React, { useEffect, useState } from "react";
import FileInput from "../../../../../Components/FileInput";
import Button from "../../../../../Components/Button";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../../../../Features/Tab/TabSlice";
import Multiİmage from "../../../../../Components/Multiİmage";
const Image = ({ initialValues, setInitialValues, nextTab, prevTab }) => {
  const dispatch = useDispatch();
 
  const handleSubmit = () => {
    const formData = new FormData();
    initialValues.images.forEach((image,index) => {
      formData.append("images["+index+"]", image);
    });
    fetch(import.meta.env.VITE_API_URL + "projects/create", {
      method: "POST",
      body: formData,
    });
  };
  return (
    <div className="w-full flex flex-col gap-4 items-start mt-4 justify-start">
      <Multiİmage setImages={(images) => setInitialValues({ ...initialValues, images })} images={initialValues.images} />
      <div className="w-full flex items-center justify-end gap-2">
        <Button variant="primary" onClick={() => dispatch(setActiveTab(prevTab))}>
          Geri
        </Button>
        <Button variant="primary" onClick={() => dispatch(setActiveTab(nextTab))}>
          İleri
        </Button>
        <Button variant="primary" onClick={handleSubmit}>Gönder</Button>
      </div>
    </div>
  );
};

export default Image;
