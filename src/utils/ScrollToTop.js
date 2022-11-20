import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useScrollposition } from "../utils/useScrollPosition";

export function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

export function ScrollToTopParams() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function ScrollToTopBtn() {
  const scrollPosition = useScrollposition();
  const ScrollToTopFunc = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      {scrollPosition > 150 && (
        <button
          onClick={() => ScrollToTopFunc()}
          className="fixed h-10 w-9 bottom-10 right-10 bg-[#fb5d5d] text-white rounded-[50%] z-[10000]"
        >
          <i className="fa fa-arrow-up"></i>
        </button>
      )}
    </>
  );
}
