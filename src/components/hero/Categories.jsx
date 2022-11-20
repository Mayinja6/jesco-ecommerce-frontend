import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  EmptyCart,
  server_down,
  TV,
  Summer_women,
  Gaming_Computer,
} from "../../assets/imgs";
import Spinner from "../Spinner";

function CategoryItem({ img, name, to }) {
  return (
    <div className="categoryItem relative mx-3 my-5">
      <Link to={to}>
        <div className="relative flex w-[250px] h-[250px] max-w-full max-h-full rounded-[50%] p-8 justify-center items-center  mb-[17px] border  border-black overflow-hidden">
          <img src={img} className="max-w-full max-h-full" alt="" />
        </div>
      </Link>

      <div className="flex items-center justify-center">
        <h5 className="flex items-center text-[18px] leading-[20px] font-semibold text-[#222] max-w-[110px] ">
          <Link
            to={to}
            className="text-black transition-colors delay-100 my-0 mx-2 hover:text-[#fb5d5d]"
          >
            {name}
          </Link>
        </h5>
      </div>
      <style>{`
        .categoryItem {
          transition: all 0.3s ease-in-out;
        }
        .categoryItem img{
          filter: grayscale(75%);
        }
        .categoryItem:hover img {
          filter: grayscale(0%);
        }
        .categoryItem:hover div:first-child {
          border: 1px solid #fb5d5d;
        }
      `}</style>
    </div>
  );
}

const Categories = () => {
  const { productsSuccess, productsLoading, productsRejected } = useSelector(
    (state) => state.products
  );
  return (
    <>
      {productsLoading && (
        <>
          <h1 className="text-[24px] sm:text-[48px] text-center font-black">
            Loaging Categories, Please Wait...
          </h1>
          <Spinner />
        </>
      )}
      {productsRejected && (
        <div className="w-full relative flex flex-col items-center justify-evenly p-10">
          <img
            src={server_down}
            className="max-w-full max-h-full sm:w-auto sm:h-[250px]"
            alt="Server Down"
          />

          <h1 className="text-[24px] sm:text-[40px] text-center font-black">
            Check your network and try again
          </h1>
        </div>
      )}
      {productsSuccess && (
        <section className="relative block text-center p-5 sm:p-[80px]">
          <div className="section-title block text-center sm:text-start mb-[50px] md:pl-5">
            <h2 className="title leading-[1]">#Categories</h2>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-evenly">
            <CategoryItem
              img={Gaming_Computer}
              name="Desktop's Collection"
              to={"/products"}
            />
            <CategoryItem img={TV} name="TV's Collection" to={"/products"} />
            <CategoryItem
              img={Summer_women}
              name="Women's Collection"
              to={"/products"}
            />
            <CategoryItem
              img={EmptyCart}
              name="Men's Collection"
              to={"/products"}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default Categories;
