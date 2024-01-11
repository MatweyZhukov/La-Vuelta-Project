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
  const swiperOptions = {
    effect: "flip",
    centeredSlides: true,
    flipEffect: {
      slideShadows: false,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    modules: [Navigation, Pagination, Autoplay, EffectFlip],
    slidesPerView: 1,
    navigation: true,
    pagination: { clickable: true },
  };

  return (
    <Swiper {...swiperOptions}>
      <SwiperSlide>
        <Image src={"/pizza-16.webp"} width={400} height={400} alt="pizza" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={"/pizza-10.webp"} width={400} height={400} alt="pizza" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={"/pizza-12.webp"} width={400} height={400} alt="pizza" />
      </SwiperSlide>
    </Swiper>
  );
};

export { Slider };
