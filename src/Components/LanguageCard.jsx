import { FaPhp,FaReact  } from "react-icons/fa";
import { DiMysql } from "react-icons/di";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiCplusplus } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { IoLogoJavascript } from "react-icons/io";



const LanguageCard = ({ name, description, Icon }) => {



  const iconHandler = () => {
    switch (String(name).toLowerCase()) {
      case "react":
        return <FaReact className="text-2xl text-gray-600" />;
      case "php":
        return <FaPhp className="text-2xl text-gray-600" />;
      case "mysql":
        return <DiMysql className="text-2xl text-gray-600" />;
      case "tailwind":
        return <RiTailwindCssFill className="text-2xl text-gray-600" />;
      case "c++":
        return <SiCplusplus className="text-2xl text-gray-600" />;
      case "c#":
        return <TbBrandCSharp className="text-2xl text-gray-600" />;
      case "javascript":
        return <IoLogoJavascript className="text-2xl text-gray-600" />;
      default:
    }

  }


  return (
    <div className="bg-white skill hover:ring-blue-500 hover:ring-2 hover:scale-105 shadow-sm rounded-xl p-6 w-full hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-gray-200">
      <div className="flex items-center space-x-4 mb-4">
        {iconHandler(name)}
        <h2 className="text-xl font-medium text-gray-900">{name}</h2>
      </div>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default LanguageCard;
