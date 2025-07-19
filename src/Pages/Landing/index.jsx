import React, { useRef } from 'react'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { CiCircleChevDown } from "react-icons/ci";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CiLaptop } from "react-icons/ci";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Index = () => {
    const textContainer = useRef();
    const imageContainer = useRef();
    const backgroundArea = useRef();

    const images = [0, 1, 2, 3];
    const laptoplContainer = useRef()
    // Text animations
    useGSAP(() => {
        const texts = gsap.utils.toArray('.text');
        const timeline = gsap.timeline();

        texts.forEach((text, index) => {
            timeline.fromTo(
                text,
                { opacity: 0, y: -30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                },
                index === 0 ? '+=1' : '>'
            );
        });
    }, { scope: textContainer });

    // Image fade in animation
    useGSAP(() => {
        gsap.fromTo('.hero-image',
            { opacity: 0 },
            { opacity: 1, delay: 2, duration: 1 }
        );
    });

    // Down arrow animation
    useGSAP(() => {
        gsap.fromTo('.down',
            { opacity: 0, y: -30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                delay: 3
            }
        );
    });

    // Scroll-triggered animations
    useGSAP(() => {
        const items = gsap.utils.toArray('.scroll-image');

        // Background area başlangıç durumu
        gsap.set(backgroundArea.current, { opacity: 0, y: 50 });

        let triggeredItems = new Set();

        items.forEach((item, index) => {
            const isEven = index % 2 === 0;

            gsap.to(item, {
                rotate: isEven ? 60 : -60,
                scale: 0.5,
                x: isEven ? -400 : 400,
                ease: 'power1.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'bottom bottom',
                    end: 'top 20%',
                    scrub: 1,
                    onUpdate: (self) => {
                        if (self.progress >= 0.4) {
                            triggeredItems.add(index);
                            if (triggeredItems.size === items.length) {
                                gsap.to(backgroundArea.current, {
                                    opacity: self.progress,
                                    y: 0,
                                    duration: 1.5,
                                    ease: 'power2.out',
                                    scrub:1
                                });
                            }

                            gsap.fromTo('.laptop',
                                { zIndex: -1, opacity: 0, x: -500 },
                                { zIndex: 1, opacity: self.progress, duration: 2, x: self.progress }
                            )

                        }
                    }
                }
            });
        });
    }, { scope: imageContainer });


    return (
        <div className='w-full flex items-start justify-start h-auto flex-col bg-slate-50'>
            {/* Hero Section */}
            <div className='w-full relative p-4 gap-4 px-12 flex items-start justify-center min-h-screen'>
                <div ref={textContainer} className='w-1/2 flex items-start gap-5 min-h-screen justify-center flex-col'>
                    <h1 className='text-7xl tracking-wide font-extralight text'>Batuhan ÇİFTÇİ</h1>
                    <h2 className='text-5xl font-extralight text'>Deneme</h2>
                    <p className='text-base line-clamp-3 tracking-wider text'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>
                <div className='flex-1 flex items-center min-h-screen justify-center'>
                    <div className='w-56 hero-image aspect-square rounded-full bg-black'></div>
                </div>

                <div className='down flex items-center text-center justify-center gap-2 flex-col absolute left-1/2 -translate-x-1/2 bottom-20 opacity-0'>
                    <CiCircleChevDown size={52} className='w-12 h-12' />
                    <p>Read More</p>
                </div>
            </div>

            {/* Scroll Animation Section */}
            <section ref={imageContainer} className='w-full p-12 min-h-screen h-auto relative grid grid-cols-2 gap-4 place-items-center'>
                <div
                    ref={backgroundArea}
                    className='absolute backgroundArea flex items-center p-12 flex-col justify-end w-full h-screen top-0 left-0  opacity-0'
                >
                    <div className='w-96 aspect-square rounded-full bg-black'></div>
                    <p className='w-1/2 p-4 text-center text-black'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                    </p>
                </div>
                {images.map((item, index) => (
                    <div
                        key={item}
                        className='bg-slate-200   scroll-image flex items-center justify-center w-full h-full rounded-md'
                    >
                        {item}
                    </div>
                ))}
            </section>

            <section ref={laptoplContainer} className='w-full flex items-center justify-start p-12 h-screen '>
                <CiLaptop size={450} className='   rounded-full  laptop ml-24 '></CiLaptop>
                <div className='laptop flex w-full flex-col gap-4 h-full px-32 py-16'>
                    <h1 className='text-7xl laptop font-bold uppercase tracking-widest w-full text-right'>Tıtle</h1>
                    <p className='laptop'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore iste saepe sint facilis, est vel id quasi eveniet similique ullam esse qui totam alias numquam amet quas, quae aut perspiciatis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, porro excepturi! Magnam deserunt dignissimos aut at temporibus eveniet nostrum corrupti, praesentium nam, atque obcaecati. Sit modi maxime perspiciatis qui consequuntur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis possimus velit voluptatibus, optio iste odit veritatis delectus suscipit ut voluptates laborum temporibus molestias et consequatur eum beatae perspiciatis corrupti?</p>
                </div>
            </section>
            <section ref={laptoplContainer} className='w-full flex flex-row-reverse items-center justify-start p-12 h-screen '>
                <CiLaptop size={450} className='   rounded-full  laptop ml-24 '></CiLaptop>
                <div className='laptop flex w-full flex-col gap-4 h-full px-32 py-16'>
                    <h1 className='text-7xl laptop font-bold uppercase tracking-widest w-full text-left'>Tıtle</h1>
                    <p className='laptop'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore iste saepe sint facilis, est vel id quasi eveniet similique ullam esse qui totam alias numquam amet quas, quae aut perspiciatis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, porro excepturi! Magnam deserunt dignissimos aut at temporibus eveniet nostrum corrupti, praesentium nam, atque obcaecati. Sit modi maxime perspiciatis qui consequuntur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis possimus velit voluptatibus, optio iste odit veritatis delectus suscipit ut voluptates laborum temporibus molestias et consequatur eum beatae perspiciatis corrupti?</p>
                </div>
            </section>
        </div>
    );
};

export default Index;