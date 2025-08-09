import React, { useState, useEffect } from "react";
import { FaFile } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Button from "./Button";
import { useParams } from "react-router";

const Multiİmage = ({
  setImages,
  images,
  oldImages = [],
  setOImages,
  accept = ["jpg", "jpeg", "png", "gif", "webp"],
  multiple = true,
  label = "Resimler",
  path = "landing",
}) => {
  const [preview, setPreview] = useState([]);
  const { id } = useParams();
  const handleChange = (e) => {
    const files = e.target.files;
    setPreview(Array.from(files));
    setImages(Array.from(files));
  };

  const handleDelete = (index) => {
    const newPreview = preview.filter((_, i) => i !== index);
    setPreview(newPreview);
    setImages(newPreview);
  };

  const ImagePreview = () => {
    return (
      <div
        className={
          preview.length > 0
            ? "w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            : "w-full grid grid-cols-1 gap-4"
        }
      >
        {preview.map((image, index) => (
          <div
            key={index}
            className="relative max-w-40 group overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-lg"
          >
            <img
              src={URL.createObjectURL(image)}
              alt="image"
              className="max-w-40 aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <button
                onClick={() => handleDelete(index)}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110"
              >
                <MdDelete size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const deleteHandler = (image) => {
    if (confirm("Bu resmi silmek istediğinize emin misiniz?")) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("id", id);
      fetch(import.meta.env.VITE_API_URL + "projects/delete-image", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setOImages(oldImages.filter((img) => img !== image));
            setImages(oldImages.filter((img) => img !== image));
          }
        })
        .catch((err) => {
          console.log(err);
        });
      x;
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 items-start mt-4 justify-start">
      <div className="w-full flex items-center justify-end">
        <label
          htmlFor="file"
          className="group flex items-center gap-3 px-6 py-3 bg-white border-2 border-gray-200 rounded-full cursor-pointer transition-all duration-300 hover:border-blue-500 hover:shadow-md"
        >
          <FaFile className="text-gray-500 group-hover:text-blue-500 transition-colors duration-300" />
          <span className="text-gray-700 group-hover:text-blue-500 font-medium transition-colors duration-300">
            Resimleri Seç
          </span>
        </label>
      </div>
      <input
        id="file"
        type="file"
        multiple={multiple}
        accept={accept.join(",")}
        onChange={handleChange}
        className="hidden"
      />

      <div className="w-full bg-gray-50 grid rounded-2xl p-6 border border-gray-200">
        <ImagePreview accept={["jpg", "jpeg", "png", "gif", "webp"]} />
        <div className="w-full h-px bg-gray-200 my-4"></div>
        <div className="w-full flex items-center justify-start">
          <span className="text-gray-500 text-base mb-3 font-bold">
            {label}
          </span>
        </div>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-4">
          {oldImages.map((image, index) => (
            <img
              key={index + image}
              src={
                (import.meta.env.VITE_API_URL + "uploads/" + path + "/" + image).replaceAll("api/", "")
              }
              // onError={(e) => {
              //   e.target.src =
              //     import.meta.env.VITE_API_URL +
              //     "/uploads/" +
              //     path +
              //     "/" +
              //     image;
              // }}
              onClick={() => deleteHandler(image)}
              alt="image"
              className=" max-w-40 rounded-md aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Multiİmage;
