"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function Carousel() {
  const slides = [
    {
      img: "/imagens/img1.png",
      title: "Primeira imagem",
      text: "Descrição da primeira imagem",
      size: "w-[500px] h-[500px]", // tamanho customizado
    },
    {
      img: "/imagens/img2.png",
      title: "Segunda imagem",
      text: "Descrição da segunda imagem",
      size: "w-[500px] h-[500px]", // tamanho diferente
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
          <div className="flex flex-col items-center justify-center text-center text-white p-8 h-screen bg-gradient-to-b from-red-700 to-red-900">
            <img
              src={slide.img}
              alt={slide.title}
              className={`${slide.size} object-contain mb-6`}
            />
            <h2 className="text-2xl font-bold mb-2">{slide.title}</h2>
            <p className="text-base text-gray-100">{slide.text}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
