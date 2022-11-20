import { Link } from "react-router-dom";
import { introLeft, introRight, serviceLeft } from "../assets/imgs";
import { HeroFearures, OurTeam, Suponsors, Testimonials } from "../components";

const About = () => {
  return (
    <section>
      <div className="flex flex-col items-start justify-center h-[400px] sm:h-[450px] md:h-[500px] lg:h-[528px] bg-[#fcf6f6] p-5  sm:p-[80px] mx-auto mb-[80px] lg:mb-0">
        <div className="container relative h-full flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-[55%]">
            <div>
              <h2 className="mx-0 mt-0 mb-[21px] text-[#3c3c3c] font-medium uppercase leading-[1] text-[24px] sm:text-[48px]">
                About Us
              </h2>
              <p className="p-0 md:pr-[10px] text-[#3c3c3c]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eius modjior tem incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniamyl quinol exercitation ullamco laboris nisi
                ut aliquip ex ea commodo consequat. Duisau irure dolor in
                reprehenderit in voluptate velit esse cillum dolore euhti fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim
              </p>
            </div>
            <div>
              <img
                src={introLeft}
                alt="about_intro"
                className="mt-5 max-w-full block"
              />
            </div>
          </div>
          <div className="w-full lg:w-[45%] hidden lg:flex p-0">
            <img src={introRight} alt="about_intro" />
          </div>
        </div>
      </div>
      <div className="bg-[#f0fcfc]  p-5 md:p-[80px]  md:flex">
        <div className="flex justify-center w-full mb-5 md:mb-0 md:w-1/2">
          <div className=" self-center items-center">
            <img
              src={serviceLeft}
              alt="about_intro"
              className="max-w-full block"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 p-5 flex justify-center">
          <div className="leading-[1] mr-[5px] self-center items-center">
            <span className="text-[16px] font-semibold uppercase mt-0 mx-0 mb-[16px] text-black inline-block">
              100% Guaranteed Pure Cotton
            </span>
            <h2 className="text-[24px] md:text-[36px] text-black uppercase  mx-0 mt-0 mb-[15px] leading-[36px]  md:leading-[50px] font-medium">
              Best Products Here Every Day
            </h2>
            <p className="leading-[28px] text-[#5a5a5a] mx-0 mt-0 mb-[[41px]">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eius modjior tem incididunt ut labore et dolore magna aliqua.
            </p>
            <button className="bg-[#fb5d5d] py-3 px-5 text-sm text-white transition-all sm:text-lg hover:translate-y-[-1px] rounded-[28px] hover:shadow-lg mt-3">
              <Link to="/products">
                {" "}
                Shop Now{" "}
                <i
                  className="fa fa-shopping-basket ml-10px"
                  aria-hidden="true"
                ></i>
              </Link>
            </button>
          </div>
        </div>
      </div>
      <OurTeam />
      <HeroFearures otherStyles={"py-5 sm:py-[80px] bg-[#f4f4f4]"} />
      <Testimonials />
      <Suponsors />
    </section>
  );
};

export default About;
