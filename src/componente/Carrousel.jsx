"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function Carousel() {
  const slides = [
    {
      img: "/imagens/img1.png",
      size: "w-[500px] h-[500px]"
    },
    {
      img: "/imagens/img2.png",
      size: "w-[500px] h-[500px]"
    },
  ];

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop
      className="w-full h-full"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="relative flex flex-col items-center justify-center text-center text-white p-8 h-screen bg-gradient-to-b from-red-700 to-red-900">
            
            {/* imagem principal clicável */}
            <a href={slide.link} target="_blank" rel="noopener noreferrer">
              <img
                src={slide.img}
                alt={slide.title}
                className={`${slide.size} object-contain mb-6 cursor-pointer`}
              />
            </a>

            <h2 className="text-2xl font-bold mb-2">{slide.title}</h2>
            <p className="text-base text-gray-100">{slide.text}</p>

            {/* Rodapé com ícone + link */}
            <div className="absolute bottom-20 left-20 flex items-center space-x-1">
              <a href="https://instagram.com/jotanunesconstrutora" target="_blank" rel="noopener noreferrer">
                <img
                  src="/imagens/img_insta.png"
                  alt="Instagram"
                  className="w-9 h-9 cursor-pointer"
                />
              </a>
            </div>

            {/* Rodapé 2 com ícone + link */}
            <div className="absolute bottom-20 center flex items-center space-x-1">
              <a href="https://www.jotanunes.com" target="_blank" rel="noopener noreferrer">
                <img
                  src="/imagens/img_net.png"
                  alt="Website"
                  className="w-8 h-8 cursor-pointer"
                />
              </a>
            </div>
            
            {/* Rodapé 3 com ícone + link */}
            <div className="absolute bottom-20 right-20 flex items-center space-x-1">
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <img
                  src="/imagens/img_linkedln.png"
                  alt="LinkedIn"
                  className="w-9 h-9 cursor-pointer"
                />
              </a>
            </div>

            
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}