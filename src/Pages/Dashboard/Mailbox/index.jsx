import React, { useEffect, useState } from "react";
import Container from "../../../Components/Container";
import {
  BiStar,
  BiTrash,
  BiArchive,
  BiEnvelope,
  BiEnvelopeOpen,
  BiArrowBack,
} from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";

const MailBox = () => {
  const token = useSelector((state) => state.token.token);
  const [mails,setMails] = useState([]);

  const getMails = () => {
    fetch(import.meta.env.VITE_API_URL + "mail", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json())
    .then((data) => {
      if(data.status === 200){
        setMails(data.data);
      }
    });
  };

  useEffect(()=>{
    getMails();
  },[]);

  const [selectedMail, setSelectedMail] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [selectedCategory, setSelectedCategory] = useState(0);

  // Ekran boyutu değişikliğini dinle
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowSidebar(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("tr-TR", options);
  };

  const handleMailSelect = (mail) => {
    setSelectedMail(mail);
    if (isMobileView) {
      setShowSidebar(false);
    }
  };

  const changeReadStatus = (id) => {
    const formData = new FormData();
    formData.append("id",id);
    fetch(import.meta.env.VITE_API_URL + "mail/read", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json())
    .then((data) => {
      if(data.status === 200){
        getMails();
      }
    });
  };

  const changeStarStatus = (id) => {
    const formData = new FormData();
    formData.append("id",id);
    fetch(import.meta.env.VITE_API_URL + "mail/star", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json())
    .then((data) => {
      if(data.status === 200){
        getMails();
        setSelectedMail({
          ...selectedMail,
          starred: !selectedMail.starred,
        });
      }
    });
  };
  

  return (
    <Container isPadding={false}>
      <div className="relative flex w-full h-screen">
        <div
          className={`${
            showSidebar ? "translate-x-0" : "-translate-x-[100%]"
          } transition-transform duration-300 fixed md:relative z-40 w-full md:w-1/5 bg-white h-full shadow-md overflow-hidden flex flex-col ${
            isMobileView ? "" : ""
          }`}
        >
          {/* Search Bar */}
          

          {/* Mail Categories */}
          <div className="p-2 border-b hidden md:block mt-16">
            <button
              onClick={() => setSelectedCategory(0)}
              className={`w-full text-left px-3 py-2 rounded-lg text-gray-600 font-medium flex items-center gap-2 ${
                selectedCategory === 0 ? "text-white bg-blue-500" : ""
              }`}
            >
              <BiEnvelope className="text-xl" />
              Inbox
            </button>
            <button
              onClick={() => setSelectedCategory(1)}
              className={`w-full text-left px-3 py-2 rounded-lg text-gray-600 flex items-center gap-2 ${
                selectedCategory === 1 ? "text-white bg-blue-500" : ""
              }`}
            >
              <BiStar className="text-xl" />
              Starred
            </button>
            <button
              onClick={() => setSelectedCategory(2)}
              className={`w-full text-left px-3 py-2 rounded-lg text-gray-600 flex items-center gap-2 ${
                selectedCategory === 2 ? "text-white bg-blue-500" : ""
              }`}
            >
              <BiArchive className="text-xl" />
              Archived
            </button>
            <button
              onClick={() => setSelectedCategory(3)}
              className={`w-full text-left px-3 py-2 rounded-lg text-gray-600 flex items-center gap-2 ${
                selectedCategory === 3 ? "text-white bg-blue-500" : ""
              }`}
            >
              <BiTrash className="text-xl" />
              Trash
            </button>
          </div>

          <div className="w-full flex items-start justify-center  md:hidden p-4">
            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300"
            >
              <option value="0">Select a category</option>
              <option value="0">Genel Kutusu</option>
              <option value="1">Yıldızlı</option>
              <option value="2">Arşiv</option>
              <option value="3">Silinenler</option>
            </select>
          </div>

          {/* Mail List */}
          <div className="overflow-y-auto flex-1">
            {mails
              .filter((mail) => {
                if (parseInt(selectedCategory) === 0) return true;
                if (parseInt(selectedCategory) === 1) return mail.starred;
                if (parseInt(selectedCategory) === 2) return mail.archived;
                if (parseInt(selectedCategory) === 3) return mail.deleted;
              })
              .map((mail) => (
                <div
                  key={mail.id}
                  onClick={() => handleMailSelect(mail)}
                  className={`p-4 cursor-pointer border-b hover:bg-gray-50 transition-all ${
                    !mail.read ? "bg-blue-50/50" : ""
                  } ${selectedMail?.id === mail.id ? "bg-blue-100/50" : ""}`}
                >
                  <div onClick={() => changeReadStatus(mail.id)} className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                        {mail.from.charAt(0)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <p
                          className={`text-sm ${
                            !mail.read ? "font-semibold" : ""
                          }`}
                        >
                          {mail.from}
                        </p>
                        <span className="text-xs text-gray-500 flex-shrink-0">
                          {formatDate(mail.date)}
                        </span>
                      </div>
                      <p
                        className={`text-sm ${
                          !mail.read ? "font-semibold" : ""
                        }`}
                      >
                        {mail.subject}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {mail.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Mail Detail - Right Side */}
        <div
          className={`${
            isMobileView && showSidebar ? "translate-x-full" : "translate-x-0"
          } transition-transform duration-300 absolute md:relative right-0 w-full md:w-4/5 bg-white h-full shadow-md overflow-hidden ${
            isMobileView ? "" : ""
          }`}
        >
          {selectedMail ? (
            <div className="h-full flex flex-col">
              {isMobileView && (
                <div className="p-4 border-b flex items-center w-full justify-end">
                  <button
                    onClick={() => setShowSidebar(true)}
                    className="p-2 hover:bg-gray-100 rounded-full mr-2"
                  >
                    <BiArrowBack className="text-xl" />
                  </button>
                  <h2 className="font-medium">Email Details</h2>
                </div>
              )}
              <div className="p-4 md:p-6 border-b">
                <div className="flex justify-between items-start mb-6">
                  <h1 className="text-xl md:text-2xl font-semibold">
                    {selectedMail.subject}
                  </h1>
                  <div className="flex gap-2">
                    <button
                      onClick={() => changeStarStatus(selectedMail.id)}
                      className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
                    >
                      {selectedMail.starred ? <FaStar color="yellow" className="text-xl" /> : <FaStar className="text-xl" />}                     
                    </button>
                    <button
                      onClick={() => changeTrashStatus(selectedMail.id)}
                      className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
                    >
                      <BiTrash className="text-xl" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium text-lg">
                    {selectedMail.from.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                      <div>
                        <p className="font-medium">{selectedMail.from}</p>
                        <p className="text-sm text-gray-600">
                          {selectedMail.email}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 mt-2 md:mt-0">
                        {formatDate(selectedMail.date)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 md:p-6 flex-1 overflow-y-auto">
                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {selectedMail.message}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <BiEnvelopeOpen className="text-6xl mb-4" />
              <p className="text-lg">Select a mail to view details</p>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default MailBox;
