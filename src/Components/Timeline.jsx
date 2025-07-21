import React, { useRef } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';

const Timeline = ({ data }) => {
  const timelineRef = useRef(null);
  const itemsRef = useRef([]);

  useGSAP(() => {
    const triggers = [];

    // Timeline çizgisi animasyonu
    const lineAnim = gsap.fromTo(
      '.timeline-line',
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
        },
      }
    );
    triggers.push(lineAnim.scrollTrigger);

    // Her bir timeline item için animasyon
    itemsRef.current.forEach((item, index) => {
      if (!item) return;

      const direction = index % 2 === 0 ? -1 : 1;
      
      // Nokta animasyonu
      const dotAnim = gsap.fromTo(
        item.querySelector('.timeline-dot'),
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: item,
            start: 'top center+=100',
            toggleActions: 'play none none reverse',
          },
        }
      );
      triggers.push(dotAnim.scrollTrigger);

      // Kart animasyonu
      const cardAnim = gsap.fromTo(
        item.querySelector('.timeline-card'),
        { x: 30 * direction, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top center+=100',
            toggleActions: 'play none none reverse',
          },
        }
      );
      triggers.push(cardAnim.scrollTrigger);
    });

    return triggers;
  });
  
  return (
    <div ref={timelineRef} className="relative lg:max-w-9xl w-full lg:p-12 p-4">
      {/* Ana timeline çizgisi - Gradient ile */}
      <div className="timeline-line absolute left-1/2 top-0 bottom-0 w-0.5 origin-top" style={{
        background: 'linear-gradient(0deg, rgba(43, 127, 255, 1) 0%, rgba(43, 127, 255, 0) 100%)',
      }} />

      <div className="flex flex-col gap-8">
        {data.map((item, index) => (
          <div
            key={item.id || index}
            ref={(el) => (itemsRef.current[index] = el)}
            className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
          >
            {/* Timeline noktası */}
            <div className="timeline-dot absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-gray-50 bg-white shadow-md flex items-center justify-center z-10">
              <span className="text-gray-400 text-xs font-light">{index + 1}</span>
            </div>

            {/* İçerik kartı */}
            <div 
              className={`timeline-card w-[calc(50%-2rem)] bg-white group aspect-auto flex items-center justify-center rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 p-4 ${
                index % 2 === 0 ? 'mr-auto' : 'ml-auto'
              }`}
            >
              <div className="relative w-full ">
                {/* Başlık ve tarih */}
                <div className="flex items-center  justify-between mb-2">
                  <h3 className="lg:text-base text-wrap text-sm font-light text-gray-900">
                    {item.title}
                  </h3>
                  <span className="lg:text-xs text-[6px]  hidden lg:block text-gray-400 font-light">
                    {item.date}
                  </span>
                </div>

                {/* Şirket ve lokasyon */}
                <div className=" hidden lg:flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <span className="font-light text-gray-400">{item.company}</span>
                  {item.location && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-gray-200" />
                      <span className="text-gray-400 font-light">{item.location}</span>
                    </>
                  )}
                </div>

                {/* Açıklama */}
                <p className="text-sm text-gray-400 font-light leading-relaxed lg:line-clamp-2 line-clamp-6">
                  {item.description}
                </p>

                {/* Dekoratif çizgi - Gradient ile */}
                <div 
                  className={`absolute top-1/2 -translate-y-1/2 w-6 h-0.5 ${
                    index % 2 === 0 ? '-right-6' : '-left-6'
                  }`}
                  style={{
                    background: index % 2 === 0 
                      ? 'linear-gradient(90deg, rgba(156, 163, 175, 0) 0%, rgba(43, 127, 255, 0.5) 100%)'
                      : 'linear-gradient(270deg, rgba(156, 163, 175, 0) 0%, rgba(43, 127, 255, 0.5) 100%)'
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;