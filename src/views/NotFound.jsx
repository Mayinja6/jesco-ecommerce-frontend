import { Link } from "react-router-dom";
import { not_found } from "../assets/imgs";

const NotFound = () => {
  return (
    <div className="p-5  sm:p-[80px] flex flex-col items-center">
      <img src={not_found} alt="404" className="max-w-full w-[400px]" />
      <h2 className="text-[18px] text-center sm:text-[24px] mt-5 font-medium">
        The page you are looking for was not found.
      </h2>
      <Link
        className="py-[15px] px-[25px] inline-block bg-[#fb5d5d] text-white text-sm font-bold transition-all uppercase hover:bg-black rounded-[25px] my-10"
        to="/products"
      >
        <i className="fa fa-arrow-left"> </i> Continue shopping
      </Link>
    </div>
  );
};

export default NotFound;
