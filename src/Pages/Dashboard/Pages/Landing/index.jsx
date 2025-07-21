import React from "react";
import Container from "../../../../Components/Container";
import InputComp from "../../../../Components/InputComp";
import TextAreaCom from "../../../../Components/TextAreaCom";
import FileInput from "../../../../Components/FileInput";
import { useState } from "react";
import Button from "../../../../Components/Button";
const index = () => {
  const [title, setTitle] = useState();
  const [subtitle, setSubtitle] = useState();
  const [text, setText] = useState();
  const [photo, setPhoto] = useState();


  const handleSave = () => {
    console.log(title, subtitle, text, photo);
  };

  return (
    <Container isPadding={false}>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full grid grid-cols-1 gap-4">
          <InputComp
            label="Title"
            placeholder="Enter your title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <InputComp
            label="Subtitle"
            placeholder="Enter your subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
          <TextAreaCom
            label="Text"
            placeholder="Enter your text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="w-full grid grid-cols-1 gap-4">
          <FileInput
            label="Photo"
            placeholder=""
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
          
        </div>
        <Button onClick={handleSave}>save</Button>
      </div>
    </Container>
  );
};

export default index;
