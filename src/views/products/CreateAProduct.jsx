import { Rating } from "@mui/material";
import { useEffect, useCallback, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";

import { Spinner, ProductCategoriesSelect } from "../../components";
import { create_a_product, product_reset } from "../../redux/slices/Products";
import { ScrollToTopParams } from "../../utils/ScrollToTop";

const CreateAProduct = () => {
  const dispatch = useDispatch();
  const { productsLoading, newCreated } = useSelector(
    (state) => state.products
  );

  const { addToast } = useToasts();
  const [ratingValue, setRatingValue] = useState(3.5);

  const [images, setImages] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const allImagesImfo = [];
      acceptedFiles.map((file) => {
        const oneImg = {
          preview: URL.createObjectURL(file),
          data: file,
        };
        return allImagesImfo.push(oneImg);
      });
      setImages(allImagesImfo);
    },
    [setImages]
  );

  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragActive,
    isDragReject,
  } = useDropzone({ onDrop, accept: { "image/*": [".png", ".jpeg", ".jpg"] } });

  const [productFormData, setProductFormData] = useState({
    title: "",
    description: "",
    price: "",
    stockCount: "",
    rating: ratingValue,
    category: [],
  });

  const handleProductChange = (e) => {
    setProductFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();

    const { title, price, stockCount, description, category, rating } =
      productFormData;

    if (images.length < 4) {
      addToast("A minimum of 4 images is required", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    if (title === "") {
      addToast("A Product must have a title", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    } else if (title.length < 10) {
      addToast("Choose a more sensible title", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    if (description === "") {
      addToast("Provide a better understanding to your customers", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    } else if (description.length < 50) {
      addToast("A minimum of 50 chars is required", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    if (price === "") {
      addToast("What's the cost of ya Product?", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    if (stockCount === "") {
      addToast("What's the quantity of em Products?", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    if (category.length === 0) {
      addToast("Choose atleast on Category for your Product", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    const formValues = new FormData();

    images.map((img) => {
      return formValues.append("product", img.data);
    });

    formValues.append("title", title);
    formValues.append("description", description);
    formValues.append("price", price);
    formValues.append("rating", rating);
    formValues.append("stockCount", stockCount);
    formValues.append("categories", category);

    dispatch(create_a_product(formValues));
    setImages([]);
    setProductFormData({
      title: "",
      description: "",
      price: "",
      stockCount: "",
      rating: ratingValue,
      category: [],
    });
  };

  useEffect(() => {
    if (newCreated) {
      addToast("A new Product has been created.", {
        appearance: "info",
        autoDismiss: true,
      });
      window.scrollTo(0, 0);
    }
    dispatch(product_reset());
  }, [dispatch, addToast, newCreated]);

  return (
    <>
      <ScrollToTopParams />
      <div className="p-5 sm:p-[80px]">
        <h1 className="text-center font-semibold text-[24px]">
          Route For Creating A Product
        </h1>
        {productsLoading ? (
          <Spinner />
        ) : (
          <div className="mt-8 mx-auto w-[85%] sm:w-3/4 md:w-1/2">
            <div className="DROPZONE">
              <div
                {...getRootProps({
                  className: `dropzone rounded-[4px] ${
                    isDragAccept && "dropZoneAccept"
                  } ${isDragReject && "dropZoneReject"}`,
                })}
              >
                <input className="input-zone" {...getInputProps()} />
                {!isDragActive && (
                  <p className="dropzone-content text-center italic text-[#7c7c7c]">
                    Drag n' Drop some files here, orClick to Select
                  </p>
                )}
                {isDragReject && (
                  <p className="dropzone-content text-center italic text-[#7c7c7c]">
                    Some Files Will be Rejected
                  </p>
                )}
                {isDragAccept && (
                  <p className="dropzone-content text-center italic text-[#7c7c7c]">
                    All Files Will be Accepted
                  </p>
                )}
              </div>
              <div className="imagePreview my-5">
                {images.length > 0 &&
                  images.map((imgInfo, i) => {
                    return (
                      <div
                        key={i}
                        className="flex justify-between py-2 border-b last:border-b-0 pl-2"
                      >
                        <img
                          key={i}
                          className="max-w-[50px] max-h-[50px]"
                          src={imgInfo.preview}
                          alt="ImagePreview"
                        />
                        <span>
                          {imgInfo.data.size > 1000000 ? (
                            <>{(imgInfo.data.size / 1000000).toFixed(1)} mbs</>
                          ) : (
                            <>{(imgInfo.data.size / 1000).toFixed(0)} kbs</>
                          )}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
            <form onChange={handleProductChange} onSubmit={handleProductSubmit}>
              <div className="mb-[20px]">
                <label
                  className="font-normal text-[16px] mb-[10px] block"
                  htmlFor="title"
                >
                  Title *
                </label>
                <input
                  className="block w-full px-[20px] outline-none text-[16px] font-normal text-[#474747] rounded-[3px] bg-white border border-[#e2e2e2] py-[10px] italic focus:border-[#fb5d5d] mr-[10px]"
                  type="text"
                  name="title"
                  placeholder="Iphone 6s"
                />
              </div>
              <div className="default-form-box mb-[20px]">
                <label
                  className="font-normal text-[16px] mb-[10px] block"
                  htmlFor="description"
                >
                  Description *
                </label>
                <textarea
                  className="block w-full px-[20px] outline-none text-[16px] font-normal text-[#474747] rounded-[3px] bg-white border border-[#e2e2e2] py-[10px] italic focus:border-[#fb5d5d] mr-[10px] min-h-[130px]"
                  type="text"
                  name="description"
                  placeholder="Current Latest Iphone"
                ></textarea>
              </div>
              <div className="default-form-box mb-[20px]">
                <label
                  className="font-normal text-[16px] mb-[10px] block"
                  htmlFor="price"
                >
                  Price *
                </label>
                <input
                  className="block w-full px-[20px] outline-none text-[16px] font-normal text-black rounded-[3px] bg-white border border-[#e2e2e2] py-[10px] italic focus:border-[#fb5d5d] mr-[10px]"
                  type="number"
                  name="price"
                  step={0.01}
                  placeholder="$99.6"
                />
              </div>
              <div className="default-form-box mb-[20px]">
                <label
                  className="font-normal text-[16px] mb-[10px] block"
                  htmlFor="stockCount"
                >
                  Count In Stock
                </label>
                <input
                  className="block w-full px-[20px] outline-none text-[16px] font-normal text-[#474747] rounded-[3px] bg-white border border-[#e2e2e2] py-[10px] italic focus:border-[#fb5d5d] mr-[10px]"
                  type="number"
                  name="stockCount"
                  placeholder="23"
                />
              </div>
              <div className="border border-[#e2e2e2] my-3 py-2 rounded-[3px] flex items-center flex-col sm:flex-row  justify-between sm:justify-evenly">
                <h2>Product Rating</h2>
                <div className="flex items-center">
                  <Rating
                    precision={0.1}
                    size="large"
                    value={Number(ratingValue)}
                    onChange={(e, newvalue) => {
                      setProductFormData((prev) => ({
                        ...prev,
                        rating: newvalue,
                      }));
                      setRatingValue(newvalue);
                    }}
                  />
                  <span className="ml-2 text-[14px] font-semibold">
                    {ratingValue}
                  </span>
                </div>
              </div>

              <div className="default-form-box mb-[10px]">
                <label
                  className="font-normal text-[16px] mb-[10px] block"
                  htmlFor="categories"
                >
                  Categories *
                </label>
                <ProductCategoriesSelect
                  selectCategories={setProductFormData}
                />
              </div>
              <button
                className="py-[10px] px-[25px] inline-block bg-[#fb5d5d] text-white text-sm font-bold transition-all uppercase hover:bg-black rounded-[25px] mt-3"
                type="submit"
              >
                Create Product
              </button>
            </form>
          </div>
        )}
        <style>
          {`
       .dropzone {
         padding: 70px 0px 20px;
         cursor: pointer;
         border: 2px dashed;
       }
       .dropZoneReject {
         border: 2px dashed red;
       }
       .dropZoneAccept {
         border: 2px dashed green;
       }
     `}
        </style>
      </div>
    </>
  );
};

export default CreateAProduct;
