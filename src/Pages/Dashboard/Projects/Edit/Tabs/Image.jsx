import React, { useEffect, useState } from "react";
import FileInput from "../../../../../Components/FileInput";
import Button from "../../../../../Components/Button";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../../../../Features/Tab/TabSlice";
import Multiİmage from "../../../../../Components/Multiİmage";
const Image = ({ initialValues, setInitialValues, nextTab, prevTab,oImages,setOImages }) => {
  const dispatch = useDispatch();

  return (
    <div className="w-full flex flex-col gap-4 items-start mt-4 justify-start">
      <Multiİmage
        setImages={(images) => setInitialValues({ ...initialValues, images })}
        oldImages={oImages}
        setOImages={setOImages}
        path="projects"
        images={initialValues.images}
      />
      <div className="w-full flex items-center justify-end">
        <Button onClick={() => dispatch(setActiveTab(prevTab))}>Geri</Button>
        <Button onClick={() => dispatch(setActiveTab(nextTab))}>İleri</Button>
      </div>
    </div>
  );
};

export default Image;
