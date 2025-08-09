import React, { useState, useEffect } from "react";
import Container from "../../../../Components/Container";
import InputComp from "../../../../Components/InputComp";
import TextAreaCom from "../../../../Components/TextAreaCom";
import Multiİmage from "../../../../Components/Multiİmage";
import Button from "../../../../Components/Button";
import Loading from "../../../../Components/Loading";
import Error from "../../../Error";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Toaster, toast } from "react-hot-toast";
const index = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState();
  const [subtitle, setSubtitle] = useState();
  const [text, setText] = useState();
  const [image, setImages] = useState();
  const [oldImage, setOldImage] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const token = useSelector((state) => state.token.token);
  useEffect(() => {
    setLoading(true);
    fetch(import.meta.env.VITE_API_URL + "landing", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.status === 200){
          setLoading(false);
          setTitle(data.data.title);
          setSubtitle(data.data.subtitle);
          setText(data.data.text);
          setOldImage(data.data.image);
          console.log(data.data);
        }else{
          navigate("/no-token");
        }
      });
  }, []);

  const handleSave = () => {
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("subtitle", subtitle);
    formdata.append("text", text);
    if (image && image.length > 0) {
      formdata.append("image", image[0]);
    }

    fetch(import.meta.env.VITE_API_URL + "landing/update", {
      method: "POST",
      body: formdata,
      headers: {
        Authorization: `Bearer ${token}`,

      },
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.status === 200){
          toast.success(data.message);
        }else{
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <Container isPadding={false}>
      <Toaster />
      <div className="w-full mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        <div className="w-full flex flex-col gap-4 items-start justify-start">
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
          <Button onClick={handleSave}>save</Button>
        </div>
        <div className="w-full grid grid-cols-1 gap-4 overflow-y-scroll h-full">
          <Multiİmage
            label="Önceki Resimler"
            multiple={false}
            setImages={setImages}
            oldImages={[oldImage]}
            path="landing"
            accept={["jpg", "jpeg", "png", "gif", "webp"]}
          />
        </div>
      </div>
    </Container>
  );
};

export default index;
