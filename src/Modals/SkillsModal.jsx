import React, { useEffect } from "react";
import InputComp from "../Components/InputComp";
import TextAreaCom from "../Components/TextAreaCom";
import { useState } from "react";
import Button from "../Components/Button";
import { useSelector, useDispatch } from "react-redux";
import { removeId } from "../Features/Tab/SkillsReducer";
import { Toaster, toast } from "react-hot-toast";
const SkillsModal = ({ editData, setIsOpen, token }) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [skill, setSkill] = useState(editData?.title || "");
  const [text, setText] = useState(editData?.description || "");
  const [type, setType] = useState(editData?.type || "");

  const { id } = useSelector((state) => state.skills);
  useEffect(() => {
    if (editData) {
      setIsEdit(true);
      setSkill(editData?.title);
      setText(editData.description);
      setType(editData.type);
    }
  }, [editData]);

  const [languages, setLanguages] = useState([
    "react",
    "nextjs",
    "tailwind",
    "typescript",
    "javascript",
    "html",
    "css",
    "php",
    "mysql",
    "postgresql",
    "mongodb",
    "redis",
    "docker",
    "kubernetes",
    "aws",
    "linux",
    "bash",
    "git",
    "github",
    "gitlab",
    "bitbucket",
    "jira",
    "c",
    "c++",
    "c#",
    "java",
    "python",
    "ruby",
    "sql",
  ]);

  const handleSave = () => {
    const formData = new FormData();
    if (isEdit) {
      formData.append("id", id);
    }
    formData.append("title", skill);
    formData.append("description", text);
    formData.append("type", type);

    fetch(
      import.meta.env.VITE_API_URL + "skills/" + (isEdit ? "update" : "create"),
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
          dispatch(removeId());
          setIsOpen(false);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <div className="max-w-4xl w-full flex flex-col items-center justify-center gap-4 h-auto bg-white rounded-lg p-4">
      <Toaster />
      <h1 className="text-2xl font-bold w-full text-start">
        {isEdit ? "Düzenle" : "Ekle"}
      </h1>
      <div className="w-full grid grid-cols-1 gap-4">
        <select
          onChange={(e) => setType(e.target.value)}
          value={type}
          className="w-full p-2 rounded-md border border-gray-300"
        >
          <option>Dil Seçiniz</option>
          {languages.map((language, index) => (
            <option key={index} value={language}>
              {language}
            </option>
          ))}
        </select>
        <InputComp
          label={"Title"}
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        ></InputComp>
        <TextAreaCom
          label={"Desc"}
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></TextAreaCom>
      </div>
      <div className="w-full flex items-center justify-end">
        <Button onClick={handleSave}>save</Button>
      </div>
    </div>
  );
};

export default SkillsModal;
