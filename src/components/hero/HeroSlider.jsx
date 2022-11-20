import { Link } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Navigation, Thumbs } from "swiper";

import { Gaming_Computer, Summer_women, TV } from "../../assets/imgs";
function SlideContent({ category, title, titleBr, img }) {
  return (
    <>
      <div className="self-center sm-center-view md:w-1/2">
        <div className="relative z-[9] uppercase hero-slide-content-2 slider-animated-1">
          <span className="heroSlider_category">{category}</span>
          <h2 className="font-bold mb-[10px] text-[#3c3c3c] text-[30px] md:text-[42px] lg:text-[60px] text-center md:text-start ">
            {title} <br /> {titleBr}
          </h2>

          <div className="relative flex justify-center md:justify-start items-center">
            <Link
              to="/products"
              className="uppercase cursor-pointer px-5 py-4 transition-all font-semibold bg-[#fb5d5d] text-white max-w-full rounded-[30px]
        hover:shadow-2xl relative"
            >
              Shop Now
              <i className="fa fa-shopping-basket ml-[15px]"></i>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center relative md:w-1/2  mt-[30px] md:mt-0 bg-white p-2 md:p-5 rounded-[15px] h-1/2 sm:h-full">
        <img src={img} alt="HeroSlideImg" className="max-w-full max-h-full" />
      </div>
      <style>
        {`
          .heroSlider_category {
            font-size: 18px;
            font-weight: 600;
            display: block;
            position: relative;
            padding-left: 50px;
            color: #3c3c3c;
            margin-bottom: 15px;
          }
          .heroSlider_category::before {
            position: absolute;
            top: 50%;
            left: 0;
            margin-top: -1.5px;
            background-color: #fb5d5d;
            width: 30px;
            height: 3px;
            content: "";
          }
          @media only screen and (min-width: 768px) and (max-width: 991px) {
            .heroSlider_category {
              font-size: 18px;
            }
          }
          @media only screen and (max-width: 767px) {
            .heroSlider_category {
              font-size: 18px;
            }
          }
        `}
      </style>
    </>
  );
}
const HeroSlider = () => {
  const slideItems = [
    {
      category: "SALE 45% OFF",
      title: "EXCLUSIVE",
      titleBr: "Offer 2023",
      img: Gaming_Computer,
    },
    {
      category: "New Arrival",
      title: "hot lady",
      titleBr: "browse",
      img: Summer_women,
    },
    {
      category: "Must have",
      title: "Samsung",
      titleBr: "4k dispaly",
      img: TV,
    },
  ];
  return (
    <Swiper
      className="hero-slide-item h-[650px]  flex relative w-full max-w-full bg-[#fcf6f6]"
      modules={[Navigation, Autoplay, Thumbs]}
      autoplay={{ delay: 5000 }}
      slidesPerView={1}
      navigation={true}
      direction="horizontal"
      speed={1500}
    >
      {slideItems.map((slide, i) => {
        return (
          <SwiperSlide
            key={i}
            className="p-5 md:p-[80px] flex flex-col justify-evenly md:flex-row"
          >
            <SlideContent
              category={slide.category}
              title={slide.title}
              titleBr={slide.titleBr}
              img={slide.img}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default HeroSlider;
