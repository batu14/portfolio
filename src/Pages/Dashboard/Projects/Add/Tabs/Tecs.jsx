import React from "react";
import Chips from "../../../../../Components/Chips";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../../../../Features/Tab/TabSlice";
import Button from "../../../../../Components/Button";
const Tecs = ({ setTechnologies, technologies, nextTab, prevTab }) => {
  const dispatch = useDispatch();

  return (
    <div className="w-full flex flex-col gap-4 items-start mt-4 justify-start">
      <Chips setFunction={setTechnologies} technologies={technologies} />
      <div className="w-full flex items-center justify-end gap-2">
        <Button
          variant="primary"
          onClick={() => dispatch(setActiveTab(prevTab))}
        >
          Geri
        </Button>
        <Button
          variant="primary"
          onClick={() => dispatch(setActiveTab(nextTab))}
        >
          İleri
        </Button>
      </div>
    </div>
  );
};

export default Tecs;
