import { Link } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

const MobileDrawer = ({ setOpenMobileDrawer }) => {
  return (
    <div className="drawer-div w-[300px] md:w-[400px]">
      <div className="relative flex flex-col h-full z-10">
        <div className="flex flex-wrap justify-end w-full p-0 mb-[30px]">
          <span
            className="drawerBtn-close"
            onClick={() => setOpenMobileDrawer(false)}
          ></span>
        </div>
        <ul className="list-none mb-4">
          <li className=" font-semibold text-lg  py-4 pl-3 border-t">
            <Link
              onClick={() => setOpenMobileDrawer(false)}
              className="cursor-pointer hover:text-[#fb5d5d] transition-all"
              to="/"
            >
              Home
            </Link>
          </li>
          <li className=" font-semibold text-lg  py-4 pl-3 border-t">
            <Accordion>
              <AccordionSummary
                id="panel1-header"
                aria-label="panel1-content"
                expandIcon={
                  <i className="fa fa-arrow-down text-black hover:text-[#fb5d5d] transition-all"></i>
                }
              >
                <Link
                  onClick={() => setOpenMobileDrawer(false)}
                  className="cursor-pointer hover:text-[#fb5d5d] transition-all font-semibold"
                  to="/products"
                >
                  Shop
                </Link>
              </AccordionSummary>
              <AccordionDetails>
                <ul className="list-none mb-4">
                  <li className=" font-semibold text-lg  py-4 pl-3 border-t">
                    <Link
                      onClick={() => setOpenMobileDrawer(false)}
                      className="cursor-pointer hover:text-[#fb5d5d] transition-all"
                      to="/cart"
                    >
                      Cart
                    </Link>
                  </li>
                  <li className=" font-semibold text-lg  py-4 pl-3 border-t">
                    <Link
                      onClick={() => setOpenMobileDrawer(false)}
                      className="cursor-pointer hover:text-[#fb5d5d] transition-all"
                      to="/wishlist"
                    >
                      Wishlist
                    </Link>
                  </li>
                  <li className=" font-semibold text-lg  py-4 pl-3 border-t">
                    <Link
                      onClick={() => setOpenMobileDrawer(false)}
                      className="cursor-pointer hover:text-[#fb5d5d] transition-all"
                      to="/checkout"
                    >
                      Checkout
                    </Link>
                  </li>
                </ul>
              </AccordionDetails>
            </Accordion>
          </li>
          <li className=" font-semibold text-lg  py-4 pl-3 border-t">
            <Link
              onClick={() => setOpenMobileDrawer(false)}
              className="cursor-pointer hover:text-[#fb5d5d] transition-all"
              to="/about"
            >
              About Us
            </Link>
          </li>
          <li className=" font-semibold text-lg  py-4 pl-3 border-b border-t">
            <Link
              onClick={() => setOpenMobileDrawer(false)}
              className="cursor-pointer hover:text-[#fb5d5d] transition-all"
              to="/contact"
            >
              Conact Us
            </Link>
          </li>
        </ul>
        <div className=" mt-auto">
          <ul className="flex justify-evenly items-center">
            <li className=" my-0 mr-5px sm:mr-[10px] p-0">
              <a
                className=" relative flex items-center justify-center text-white bg-[#fb5d5d] text-[15px] sm:text-base p-0 w-[35px] sm:w-10 h-10 rounded-[100%] text-center border-none z-10 transition-all hover:bg-black hover:text-white"
                href="/"
              >
                <i className="fa fa-facebook"></i>
              </a>
            </li>
            <li className=" my-0 mr-5px sm:mr-[10px] p-0">
              <a
                className=" relative flex items-center justify-center text-white bg-[#fb5d5d] text-[15px] sm:text-base p-0 w-[35px] sm:w-10 h-10 rounded-[100%] text-center border-none z-10 transition-all hover:bg-black hover:text-white"
                href="/"
              >
                <i className="fa fa-twitter"></i>
              </a>
            </li>
            <li className=" my-0 mr-5px sm:mr-[10px] p-0">
              <a
                className=" relative flex items-center justify-center text-white bg-[#fb5d5d] text-[15px] sm:text-base p-0 w-[35px] sm:w-10 h-10 rounded-[100%] text-center border-none z-10 transition-all hover:bg-black hover:text-white"
                href="/"
              >
                <i className="fa fa-google"></i>
              </a>
            </li>
            <li className=" my-0 mr-5px sm:mr-[10px] p-0">
              <a
                className=" relative flex items-center justify-center text-white bg-[#fb5d5d] text-[15px] sm:text-base p-0 w-[35px] sm:w-10 h-10 rounded-[100%] text-center border-none z-10 transition-all hover:bg-black hover:text-white"
                href="/"
              >
                <i className="fa fa-youtube"></i>
              </a>
            </li>
            <li className=" my-0 mr-5px sm:mr-[10px] p-0">
              <a
                className=" relative flex items-center justify-center text-white bg-[#fb5d5d] text-[15px] sm:text-base p-0 w-[35px] sm:w-10 h-10 rounded-[100%] text-center border-none z-10 transition-all hover:bg-black hover:text-white"
                href="/"
              >
                <i className="fa fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer;
