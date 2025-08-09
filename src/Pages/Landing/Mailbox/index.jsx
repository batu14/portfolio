import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";

const index = () => {
  const [errors, setErrors] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const submitHandler = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("message", message);
    fetch(import.meta.env.VITE_API_URL + "mail/create", {
      method: "POST",
      body: formData,
    }).then((res) => res.json())
    .then((data)=>{
        if (data.status === 200) {
            toast.success("Mesaj gönderildi");
            setName("");
            setEmail("");
            setMessage("");
          } else {
            setErrors(data.message);
            if(typeof data.message !== "string"){
                Object.entries(data.message).forEach(([key,value]) => {
                    toast.error(value + " " + key);
                });
            }else{
                toast.error(data.message);
            }
        }
    });
  };

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-0 md:p-4 lg:p-12 contact-content">
        <Toaster/>
      <div className="w-full space-y-6 md:space-y-8 bg-white p-4 md:p-6 lg:p-8 rounded-lg   border-gray-100">
        <div className="space-y-2 md:space-y-3">
          <h2 className="text-2xl md:text-3xl font-light text-gray-800">
            İletişime Geçin
          </h2>
          <div className="w-12 h-px bg-indigo-500"></div>
        </div>

        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          Projeleriniz, iş birliği teklifleri veya sadece bir merhaba demek için
          benimle iletişime geçebilirsiniz.
        </p>
        
        <div className="space-y-3 md:space-y-4">
          <input
            type="text"
            className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all duration-200 placeholder-gray-400"
            placeholder="Ad Soyad"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all duration-200 placeholder-gray-400"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="email"
            className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all duration-200 placeholder-gray-400"
            placeholder="Konu"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <textarea
            rows={4}
            className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all duration-200 resize-none placeholder-gray-400"
            placeholder="Mesajınız..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={() => {
              submitHandler();
            }}
            className="w-full bg-gray-800 text-white py-2 md:py-2.5 px-4 text-sm md:text-base rounded-md hover:bg-gray-700 transition-colors duration-200 shadow-md"
          >
            Mesaj Gönder
          </button>
        </div>
        <div className="pt-4 md:pt-6 border-t border-gray-200">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a
              href="mailto:batuhan@example.com"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-all duration-300 text-xs md:text-sm group social-link"
            >
              <div className="p-1.5 md:p-2 rounded-full bg-gray-100 group-hover:bg-blue-100 transition-all duration-300">
                <MdEmail
                  size={16}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="group-hover:translate-x-0.5 transition-transform duration-300">
                Email
              </span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-700 transition-all duration-300 text-xs md:text-sm group social-link"
            >
              <div className="p-1.5 md:p-2 rounded-full bg-gray-100 group-hover:bg-blue-100 transition-all duration-300">
                <FaLinkedin
                  size={16}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="group-hover:translate-x-0.5 transition-transform duration-300">
                LinkedIn
              </span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-all duration-300 text-xs md:text-sm group social-link"
            >
              <div className="p-1.5 md:p-2 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-all duration-300">
                <FaGithub
                  size={16}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="group-hover:translate-x-0.5 transition-transform duration-300">
                GitHub
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
