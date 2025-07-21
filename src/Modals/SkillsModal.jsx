import React from "react";
import Container from "../Components/Container";
import InputComp from "../Components/InputComp";
import TextAreaCom from "../Components/TextAreaCom";
import FileInput from "../Components/FileInput";
import { useState } from "react";
import Button from "../Components/Button";
const SkillsModal = () => {
  const [skill, setSkill] = useState();
  const [text, setText] = useState();
  const [photo, setPhoto] = useState();

  const handleSave = () => {
    console.log(skill, text, photo);
  };

  return (
    <div className="max-w-4xl w-full flex flex-col items-center justify-center gap-4 h-auto bg-white rounded-lg p-4">
        <div className="w-full grid grid-cols-1 gap-4">
        <InputComp label={'Title'} ></InputComp>
        <TextAreaCom label={'Desc'}></TextAreaCom>
        <FileInput label={'Icon'}></FileInput>
        </div>
        <div className="w-full flex items-center justify-end">
            <Button onClick={handleSave}>save</Button>
        </div>

    </div>
     
  );
};

export default SkillsModal;
