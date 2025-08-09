import React, { useEffect } from "react";
import InputComp from "../Components/InputComp";
import TextAreaCom from "../Components/TextAreaCom";
import { useState } from "react";
import Button from "../Components/Button";
import { useSelector, useDispatch } from "react-redux";
import { removeId } from "../Features/Tab/SkillsReducer";
import { toast } from "react-hot-toast";
const TimelineModal = ({ editData, setIsOpen, token }) => {
  console.log(editData);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);

  const [title, setTitle] = useState(editData?.title || "");
  const [startDate, setStartDate] = useState(editData?.start || "");
  const [endDate, setEndDate] = useState(editData?.end || "");
  const [company, setCompany] = useState(editData?.company || "");
  const [location, setLocation] = useState(editData?.location || "");
  const [text, setText] = useState(editData?.text || "");

  const { id } = useSelector((state) => state.skills);
  useEffect(() => {
    if (editData) {
      setIsEdit(true);
    }
  }, [editData]);

  

  const handleSave = () => {
    const formData = new FormData();
    if(isEdit){
      formData.append("id", editData.id);
    }
    formData.append("title", title);
    formData.append("company", company);
    formData.append("start", startDate);
    formData.append("end", endDate);
    formData.append("location", location);
    formData.append("text", text);

    fetch(
      import.meta.env.VITE_API_URL + (isEdit ? "timeline/update" : "timeline/create"),
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setIsOpen(false);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <div className="max-w-4xl w-full flex flex-col items-center justify-center gap-4 h-auto bg-white rounded-lg p-4">
      <h1 className="text-2xl font-bold w-full text-start">
        {isEdit ? "Düzenle" : "Ekle"} 
      </h1>
      <div className="w-full grid grid-cols-1 gap-4">
        <InputComp
          label={"Title"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></InputComp>
        <InputComp
          label={"Company"}
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        ></InputComp>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
          <InputComp
            label={"Start Date"}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          ></InputComp>
          <InputComp
            label={"End Date"}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          ></InputComp>
        </div>
        <InputComp
          label={"Location"}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        ></InputComp>
        <TextAreaCom
          label={"Desc"}
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></TextAreaCom>
      </div>
      <div className="w-full flex items-center justify-end">
        <Button onClick={handleSave}>
          {isEdit ? "Düzenle" : "Ekle"}
        </Button>
      </div>
    </div>
  );
};

export default TimelineModal;
