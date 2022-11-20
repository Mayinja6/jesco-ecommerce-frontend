import { Rating } from "@mui/material";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Navigation } from "swiper";

import { testimonialsList } from "../utils/Data";

const Testimonials = () => {
  return (
    <div className="team-area p-5  sm:p-[80px]">
      <div className="section-title text-center mb-[30px]">
        <h2 className="title leading-[1]">#testimonials</h2>
      </div>
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 3000 }}
        slidesPerView={1}
        spaceBetween={10}
        speed={500}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 30, direction: "horizontal" },
          1024: { slidesPerView: 3, spaceBetween: 40, direction: "horizontal" },
        }}
      >
        {testimonialsList.map((t, i) => {
          return (
            <SwiperSlide key={i}>
              <div className="testi-inner border-[1px] shadow-lg">
                <Rating size="small" readOnly value={t.rating} />
                <div className="testi-content">
                  <p className="text-[16px] my-2 leading-[1.3] text-[#818790] italic">
                    {t.message}
                  </p>
                </div>
                <div className="flex mt-5">
                  <div className="testimonial-img">
                    <img
                      alt="Testimonial"
                      width={"56px"}
                      height={"56px"}
                      src={t.img}
                    />
                  </div>
                  <div className="ml-[25px]">
                    <h4 className="text-[#39393a] text-[18px] mt-0 mx-0 mb-[3px] font-semibold">
                      {t.name}
                    </h4>
                    <span className="text-[#576477] text-[14px] font-semibold">
                      {t.title}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <style>
        {`
        .testi-inner {
          padding: 60px 40px;
          -webkit-box-shadow: 0px 30px 64px 0px rgba(0, 0, 0, 0.05);
          box-shadow: 0px 30px 64px 0px rgba(0, 0, 0, 0.05);
        }
        @media only screen and (min-width: 768px) and (max-width: 991px),
          only screen and (max-width: 479px) {
          .testi-inner {
            padding: 50px 30px;
          }
        }

        .testimonial-img {
          position: relative;
        }

        .testimonial-img::after {
          position: absolute;
          top: -5px;
          left: auto;
          right: -5px;
          height: 13px;
          width: 13px;
          content: "";
          display: flex;
          background-image: url("../src/assets/imgs/quote.png");
          background-repeat: no-repeat;
          background-position: 50%;
          background-size: contain;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #fb5d5d;
          border-radius: 50%;
        }
        `}
      </style>
    </div>
  );
};

export default Testimonials;
