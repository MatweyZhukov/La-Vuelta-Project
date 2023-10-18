"use client";

//Global
import { Navigation, Pagination, Autoplay, EffectFlip } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FC } from "react";
import Image from "next/image";

//Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-flip";

const Slider: FC = () => {
  return (
    <Swiper
      effect={"flip"}
      centeredSlides
      flipEffect={{
        slideShadows: false,
      }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      modules={[Navigation, Pagination, Autoplay, EffectFlip]}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      <SwiperSlide>
        <Image src={"/pizza-6.webp"} width={400} height={400} alt="pizza" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={"/pizza-4.webp"} width={400} height={400} alt="pizza" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={"/pizza-7.webp"} width={400} height={400} alt="pizza" />
      </SwiperSlide>
    </Swiper>
  );
};

export { Slider };
