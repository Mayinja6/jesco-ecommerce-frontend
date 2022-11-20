import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";

const ProductCategoriesSelect = ({ selectCategories }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function fetchAllCategories() {
      let arr = [];
      let { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/products/allcategories`
      );
      data.map((category) => {
        return arr.push({ value: category, label: category });
      });
      setCategories(arr);
    }
    fetchAllCategories();
  }, []);
  return (
    <Select
      onChange={(e) => {
        selectCategories((prev) => ({
          ...prev,
          category: [e.map((ev) => ev.value)],
        }));
      }}
      placeholder={"Choose A Category"}
      options={categories}
      isMulti
      noOptionsMessage={() => "Category Not Found"}
    />
  );
};

export default ProductCategoriesSelect;
