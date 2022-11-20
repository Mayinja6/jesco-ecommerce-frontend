import axios from "axios";
import { useEffect } from "react";

const GetProductListBySearch = ({
  loadingStatus,
  search,
  productsListArray,
  sortOrder,
  categoriesOptns,
}) => {
  useEffect(() => {
    const sortOptions = {
      1: "order",
      2: "order=asc",
      3: "order=desc",
      4: "price=1",
      5: "price=-1",
    };
    async function dbProducts(search) {
      loadingStatus(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/products/?${
          search !== "" ? `s=${search}` : `s`
        }&${sortOptions[sortOrder]}&${
          categoriesOptns.length <= 0
            ? `categories=all`
            : `categories=${categoriesOptns.join(",")}`
        }`
      );
      productsListArray(data.products);
      loadingStatus(false);
    }
    dbProducts(search);
  }, [search, productsListArray, sortOrder, loadingStatus, categoriesOptns]);

  return null;
};

export default GetProductListBySearch;
