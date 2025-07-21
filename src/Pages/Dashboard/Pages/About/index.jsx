import React from "react";
import Container from "../../../../Components/Container";
import InputComp from "../../../../Components/InputComp";
import TextAreaCom from "../../../../Components/TextAreaCom";
import FileInput from "../../../../Components/FileInput";
import { useState } from "react";
import Button from "../../../../Components/Button";
const index = () => {
  const [title, setTitle] = useState();
  const [text, setText] = useState();

  const handleSave = () => {
    console.log(title, text);
  };

  return (
    <Container isPadding={false}>
      <div className="w-full grid grid-cols-1 gap-4">
        
          <InputComp
            label="Title"
            placeholder="Enter your title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextAreaCom
            label="Text"
            placeholder="Enter your text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={handleSave}>save</Button>
        
      </div>
    </Container>
  );
};

export default index;
