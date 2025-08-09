import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const index = () => {
  const aboutRef = useRef();

  useGSAP(() => {
    // About Me line animations
    gsap.utils.toArray(".line").forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    });
  }, { scope: aboutRef });

  return (
    <div 
      ref={aboutRef}
      className="w-full md:w-1/2 p-8 flex flex-col gap-6 h-auto top-0"
    >
      <div className="space-y-6">
        <h2 className="font-light text-4xl text-gray-900 mb-8 relative after:absolute after:bottom-[-10px] after:left-0 after:w-20 after:h-1 after:bg-blue-500 after:rounded-full">
          About Me
        </h2>
        <div className="space-y-4">
          <p className="text-gray-600 line leading-relaxed">
            Merhaba! Ben Batuhan, kullanıcı deneyimini merkeze alan bir Full
            Stack Web Developer'ım. Yazılım dünyasına olan ilgim, yalnızca
            bir meslekten öte; bir tutku, bir yaşam biçimi.
          </p>
          <p className="text-gray-600 line leading-relaxed">
            Frontend tarafında React.js, Tailwind CSS ve GSAP gibi modern
            teknolojileri kullanarak kullanıcılarla etkileşimde kusursuz
            deneyimler oluşturuyorum. Backend tarafında ise PHP, Node.js ve
            MySQL gibi güçlü altyapılarla sağlam ve güvenilir sistemler
            geliştiriyorum.
          </p>
          <p className="text-gray-600 line leading-relaxed">
            Geliştirdiğim projelerde her zaman şuna dikkat ederim: Bir
            kullanıcı, sayfaya geldiğinde nereye bakmalı, ne hissetmeli ve
            ne kadar kolay etkileşim kurmalı? Bu yüzden kullanıcı arayüzü
            tasarımında sadece güzel görünmesi değil, kullanılabilirliği
            yüksek çözümler üretmeyi önceliklendiriyorum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default index;