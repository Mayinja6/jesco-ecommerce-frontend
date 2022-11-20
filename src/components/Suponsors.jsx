import { SwiperSlide, Swiper } from "swiper/react";
import { A11y, Autoplay, Navigation, Scrollbar } from "swiper";

// Swiper Styles
import "swiper/css";
import "swiper/css/autoplay";

import { brand1, brand2, brand3, brand4, brand5 } from "../assets/imgs";

const Suponsors = () => {
  const suponsors = [
    { img: brand1, link: "/" },
    { img: brand2, link: "/" },
    { img: brand3, link: "/" },
    { img: brand4, link: "/" },
    { img: brand5, link: "/" },
  ];
  return (
    <div className="pt-2 px-5 pb-5 sm:pt-2 sm:pb-[80px] sm:px-[80px] mb-8">
      <div className="border-t-[1px] border-[#ececec]">
        <div className="pt-10">
          <Swiper
            modules={[Navigation, Scrollbar, A11y, Autoplay]}
            autoplay={{ delay: 3000 }}
            slidesPerView={1}
            spaceBetween={10}
            direction="horizontal"
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 20,
                direction: "horizontal",
              },
              746: {
                slidesPerView: 4,
                spaceBetween: 30,
                direction: "horizontal",
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 40,
                direction: "horizontal",
              },
            }}
          >
            {suponsors.map((s, i) => {
              return (
                <SwiperSlide key={i}>
                  <a href={s.link}>
                    <img
                      src={s.img}
                      alt="Slide_img"
                      className="grayscale opacity-[0.5] hover:opacity-[1] hover:grayscale-0 transition-all m-auto"
                    />
                  </a>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Suponsors;
