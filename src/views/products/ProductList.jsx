import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GetProductListBySearch, SingleProduct } from "../../components";

import { useToasts } from "react-toast-notifications";
import { server_down } from "../../assets/imgs";
import { Spinner } from "../../components";
import { ScrollToTopParams } from "../../utils/ScrollToTop";

const ProductList = () => {
  const [search, setSearch] = useState("");
  const [loadingStatus, setloadingStatus] = useState(false);
  const [selectedSortOrder, setSelectedSortOrder] = useState(1);
  const [categoriesOptns, setCategoriesOptns] = useState([]);
  const [dbProductList, setDbProductList] = useState([]);
  const { addToast } = useToasts();

  const {
    categories,
    productsLoading,
    productsRejected,
    productsSuccess,
    productsMessage,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (productsRejected) {
      addToast(productsMessage, { appearance: "error", autoDismiss: true });
    }
  }, [addToast, productsRejected, productsMessage, dbProductList]);
  return (
    <>
      <GetProductListBySearch
        categoriesOptns={categoriesOptns}
        loadingStatus={setloadingStatus}
        search={search}
        sortOrder={selectedSortOrder}
        productsListArray={setDbProductList}
      />
      <ScrollToTopParams />
      {productsLoading && (
        <>
          <h1 className="text-[24px] sm:text-[48px] text-center font-black">
            Loading Products Please Wait
          </h1>
          <Spinner />
        </>
      )}
      {productsRejected && (
        <div className="w-full relative h-[85vh]  flex flex-col items-center justify-evenly p-10">
          <img
            src={server_down}
            className="max-w-full w-full sm:w-[75%] md:w-[50%] lg:w-[40%] h-auto"
            alt="Server Down"
          />

          <h1 className="text-[24px] sm:text-[48px] text-center font-black">
            Check your network and try again
          </h1>
        </div>
      )}
      {productsSuccess && dbProductList && (
        <div className="p-4 sm:pb-[50px] sm:px-[50px] sm:pt-[30px]">
          <div className="shop-topbar flex self-center items-center justify-between mb-[30px] md:mb-12 text-base border rounded-[10px] p-3 mt-0 md:p-5">
            {dbProductList.length > 20 ? (
              <p className="mb-0">
                <span className="text-[#fb5d5d]">12</span> Products of{" "}
                <span className="text-[#fb5d5d]">{dbProductList.length}</span>
              </p>
            ) : (
              <p className="mb-0">
                Showing{" "}
                <span className="text-[#fb5d5d]">{dbProductList.length}</span>{" "}
                Products
              </p>
            )}
            <div className="md:flex items-center">
              <div className="">
                <p className="text-center">Sort By:</p>
              </div>
              <div>
                <select
                  className="md:pl-2 outline-none border-none"
                  onChange={(e) => setSelectedSortOrder(Number(e.target.value))}
                >
                  <option value="1">Relevance</option>
                  <option value="2">Name, A to Z</option>
                  <option value="3">Name, Z to A</option>
                  <option value="4">Price, low to high</option>
                  <option value="5">Price, high to low</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col-reverse lg:flex-row ">
            <div className="productList w-full lg:w-3/4">
              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3">
                {loadingStatus && (
                  <>
                    <h1>Loading Products, please wait...</h1>
                    <Spinner />
                  </>
                )}
                {!loadingStatus && dbProductList.length <= 0 && (
                  <h1>No Products found in the Database Contat Admins</h1>
                )}
                {!loadingStatus &&
                  dbProductList.length > 0 &&
                  dbProductList.map((product, index) => {
                    return <SingleProduct key={index} product={product} />;
                  })}
              </div>
            </div>
            <div className="Query_Params w-full lg:w-1/4 px-5 sticky">
              <div className="mb-[40px] relative">
                <div>
                  <input
                    autoFocus
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Snickers"
                    className="border-2 border-[#cfcfcf bg-[#f9f9f9] rounded-[10px] w-full py-3 pl-[15px] pr-[50px] text-[16px] italic text-[#969696] bg-transparent placeholder:text-[#969696] outline-none focus:border-[#fb5d5d] transition-colors"
                  />
                  <button
                    className="bg-transparent border-0 absolute top-[50%] right-0 translate-y-[-50%] text-[18px px-[15px] leading-[1] text-[#cfcfcf] hover:text-[#fb5d5d]"
                    type="submit"
                  >
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
              <div className="hidden lg:block bg-[#fafafa] rounded-[10px] leading-[1] mb-[40px] py-[40px] px-[30px] tag">
                <h4 className="category_title">Categories</h4>
                <div className="sidebar-widget-tag">
                  <ul>
                    {categories.map((category, i) => {
                      return (
                        <li
                          key={i}
                          className="border-b pb-1 capitalize block text-lg leading-[120%] cursor-pointer hover:text-[#fb5d5d] my-3 mx-[1px]"
                        >
                          <input
                            onChange={({ currentTarget: input }) => {
                              if (input.checked) {
                                setCategoriesOptns([
                                  ...categoriesOptns,
                                  input.value,
                                ]);
                              } else {
                                setCategoriesOptns(
                                  categoriesOptns.filter(
                                    (val) => val !== input.value
                                  )
                                );
                              }
                            }}
                            type="checkbox"
                            value={category}
                            className="mr-5"
                          />
                          <span>{category}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <style>{`
      .category_title {
        font-size: 18px;
        display: block;
        text-transform: capitalize;
        position: relative;
        font-weight: 600;
        color: #525252;
        margin: 0 0 20px;
        padding-left: 20px;
      }
      .category_title:before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        width: 11px;
        height: 11px;
        background: transparent;
        border-radius: 50%;
        border: 2px solid #fb5d5d;
        margin-top: -5.5px;
      }
      `}</style>
        </div>
      )}
    </>
  );
};

export default ProductList;
