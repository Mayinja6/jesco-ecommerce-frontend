import {
  Categories,
  HeroFearures,
  HeroProducts,
  HeroSlider,
  Suponsors,
} from "../components";

import { ScrollToTop } from "../utils/ScrollToTop";

const Hero = () => {
  return (
    <>
      <ScrollToTop />
      <section className="relative">
        <HeroSlider />
        <HeroFearures otherStyles={"mt-[50px]"} />
        <Categories />
        <HeroProducts />
        <Suponsors />
      </section>
    </>
  );
};

export default Hero;
