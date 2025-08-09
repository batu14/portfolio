import React, { useEffect, useState } from "react";
import Button from "./Button";
import { MdDelete } from "react-icons/md";

const Chips = ({ setFunction, technologies }) => {
  const [inputValue, setInputValue] = useState("");
  const [chips, setChips] = useState([]);
  useEffect(() => {
    console.log(technologies);

    if (typeof technologies === "string") {
      setChips(technologies.replaceAll('"', "").split(","))
    } else {
      setChips(technologies);
    }
  }, [technologies]);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setChips([...chips, inputValue]);
      setFunction([...chips, inputValue]);
      setInputValue("");
    }
  };

  const handleDelete = (index) => {
    setChips(chips.filter((_, i) => i !== index));
    setFunction(chips.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    setChips([...chips, inputValue]);
    setFunction([...chips, inputValue]);
    setInputValue("");
  };

  return (
    <div className="w-full flex-col gap-4 flex items-start justify-start">
      <div className="w-full flex items-start gap-4  justify-start">
        <input
          type="text"
          placeholder="Teknoloji Ekle"
          className="w-full border-2 border-gray-300 rounded-md p-2"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button variant="primary" className="" onClick={handleAdd}>
          Ekle
        </Button>
      </div>
      <div className="w-full flex flex-col items-start gap-4  justify-start">
        {chips && chips.map((chip, index) => (
          <div
            key={index}
            className="bg-gray-200 w-full flex items-center justify-between rounded-md p-2"
          >
            {chip}
            <Button
              variant="danger"
              className=""
              onClick={() => handleDelete(index)}
            >
              <MdDelete size={20} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chips;
