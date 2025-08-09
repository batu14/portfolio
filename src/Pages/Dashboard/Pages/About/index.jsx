import React, { useState, useEffect } from "react";
import Container from "../../../../Components/Container";
import InputComp from "../../../../Components/InputComp";
import TextAreaCom from "../../../../Components/TextAreaCom";
import Button from "../../../../Components/Button";
import { toast, Toaster   } from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSelector } from "react-redux";
import Loading from "../../../../Components/Loading";

const index = () => {
  const [title, setTitle] = useState();
  const [text, setText] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.token.token);

  useEffect(() => {
    setIsLoading(true);
    fetch(import.meta.env.VITE_API_URL + "about",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setTitle(data.data.title);
          setText(data.data.text);
        }else{
          setTitle("");
          setText("");
          toast.error(data.message);
        }
        setIsLoading(false);
      });
  }, []);


  const handleSave = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", text);
    fetch(import.meta.env.VITE_API_URL + "about/create", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        setIsLoading(false);
      });
  };

  if(isLoading){
    return <Loading />;
  }

  return (
    <Container isPadding={false}>
      <div className="w-full grid grid-cols-1 gap-4 mt-4">
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
        <Button onClick={handleSave}>
          {isLoading ? <AiOutlineLoading3Quarters className="animate-spin" /> : "save"}
        </Button>
      </div>
      <Toaster />
    </Container>
  );
};

export default index;
