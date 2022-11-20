import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { useDropzone } from "react-dropzone";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import { update_a_product } from "../../redux/slices/Products";
import { Spinner, ProductCategoriesSelect } from "../../components";
import { ScrollToTopParams } from "../../utils/ScrollToTop";

const UpdateProduct = () => {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const { pathname } = useLocation();
  const { productId } = useParams();
  const [updateProductForm, setUpdateProductForm] = useState({
    title: "",
    description: "",
    stockCount: "",
    price: "",
    categories: [],
    badges: "",
  });

  const { productsSuccess, productsLoading, productUpdated } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (productUpdated) {
      window.location.assign("/products");
    }
  }, [productUpdated]);

  const product = useSelector(
    (state) =>
      state.products.products.filter((product) => product._id === productId)[0]
  );

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

  const handleUpdateProductChange = (e) => {
    setUpdateProductForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdateProductSubmit = (e) => {
    e.preventDefault();

    const { title, description, price, stockCount, categories, badges } =
      updateProductForm;

    if (title !== "") {
      if (title.length < 10) {
        addToast("Choose a more sensible title", {
          appearance: "error",
          autoDismiss: true,
        });
        return;
      }
    }
    if (description !== "") {
      if (description.length < 50) {
        addToast("A minimum of 50 chars is required", {
          appearance: "error",
          autoDismiss: true,
        });
        return;
      }
    }

    let updateFormData = {};
    if (title !== "") updateFormData.title = title;
    if (description !== "") updateFormData.description = description;
    if (price !== "") updateFormData.price = price;
    if (stockCount !== "") updateFormData.stockCount = stockCount;
    if (categories.length >= 1) updateFormData.categories = String(categories);
    if (badges !== "") updateFormData.badges = badges;

    dispatch(
      update_a_product({
        productId: product._id,
        productData: updateFormData,
      })
    );
  };

  const handleUpdateImages = () => {
    const updateImages = new FormData();

    images.map((img) => {
      return updateImages.append("product", img.data);
    });

    dispatch(
      update_a_product({
        productId: product._id,
        productData: updateImages,
      })
    );
  };

  return (
    <>
      <ScrollToTopParams />
      <div className="p-5  sm:p-[80px]">
        {productsLoading && (
          <>
            <Spinner />
            <h1>Updating Product Please Wait </h1>
          </>
        )}
        {!productsLoading && productsSuccess && (
          <div className="w-full md:flex md:gap-8">
            <ul className="md:sticky md:top-[300px] mb-[25px] md:mb-0 md:flex-auto w-full md:w-1/4 flex flex-col">
              <li className="mb-[10px]">
                <Link
                  to={`/products/update/${productId}`}
                  className={`font-semibold py-3 px-4 ${
                    pathname === `/products/update/${productId}`
                      ? "bg-[#fb5d5d]"
                      : "bg-black"
                  }  hover:bg-[#fb5d5d] text-white transition-colors delay-150 uppercase block`}
                >
                  Product Details
                </Link>
              </li>
              <li className="mb-[10px]">
                <Link
                  to={`/products/update/${productId}/images`}
                  className={`font-semibold py-3 px-4 ${
                    pathname === `/products/update/${productId}/images`
                      ? "bg-[#fb5d5d]"
                      : "bg-black"
                  }  hover:bg-[#fb5d5d] text-white transition-colors delay-150 uppercase block`}
                >
                  Product Images
                </Link>
              </li>
            </ul>
            <div className="md:flex-auto w-full md:w-3/4">
              <Routes>
                <Route
                  path="/"
                  element={
                    <div className="block w-full">
                      <h3 className="text-[18px] sm:text-[24px] capitalize mb-[15px] font-semibold">
                        Product details
                      </h3>
                      <Link
                        to={`/products/update/${productId}/edit`}
                        className="text-blue-600 hover:text-[#fb5d5d]"
                      >
                        Edit
                      </Link>
                      <div>
                        <span className="mb-1 d-inline-block">
                          <strong>Title:</strong>
                          {product.title}
                        </span>
                        ,
                        <br />
                        <span className="mb-2 d-inline-block">
                          <strong>Description:</strong>{" "}
                          <span className="italic text-[15px]">
                            {product.description}{" "}
                          </span>
                        </span>
                        ,
                        <br />
                        <span className="mb-1 d-inline-block">
                          <strong>Price:</strong>
                          <span className="italic text-[17px]">
                            ${product.price}
                          </span>
                        </span>
                        ,
                        <br />
                        <span className="mb-1 d-inline-block">
                          <strong>Stock Count:</strong>{" "}
                          <span className="italic text-[17px]">
                            <b>{product.stockCount}</b>{" "}
                            {product.stockCount > 1 && "items"}
                            {product.stockCount === 1 && "item"}
                          </span>
                        </span>
                        ,
                        <br />
                        {product.badges.length > 0 && (
                          <>
                            <span className="mb-1 d-inline-block">
                              <strong>Discount:</strong>
                              <span className="italic text-[17px]">
                                You have Some Badges on the Product
                              </span>
                            </span>
                            ,
                            <br />
                          </>
                        )}
                        <span className="mb-1 d-inline-block">
                          <strong>Rating: </strong>{" "}
                          <span>
                            <i className="fa fa-star text-[yellow]"></i>{" "}
                            <b>{product.rating}</b>.
                          </span>
                        </span>
                        <div className="flex">
                          <span className="font-bold inline-block mr-[5px]">
                            Categories:{" "}
                          </span>
                          <ul className="flex">
                            {product.categories &&
                              product.categories.map((c, i) => {
                                return (
                                  <li key={i} className="det_category">
                                    {c}
                                  </li>
                                );
                              })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  }
                />
                <Route
                  path="/images"
                  element={
                    <>
                      <div>
                        <h1 className="text-center text-[16px] sm:text-[18px] lg:text-[24px] font-bold">
                          The Product Images
                        </h1>
                        {product.images.length > 0 ? (
                          <div>
                            <div className="flex w-full items-center my-5 sm:my-[80px] justify-center sm:justify-evenly flex-wrap">
                              {product.images.map((img, i) => {
                                return (
                                  <img
                                    className="max-w-full h-[150px]"
                                    key={i}
                                    src={`${process.env.REACT_APP_BACKEND_URL}/api/products/view/${img.filename}`}
                                    alt="Product_img"
                                  />
                                );
                              })}
                            </div>
                            <div className="flex items-center justify-center">
                              <Link
                                to={`/products/update/${productId}/images/edit`}
                              >
                                <button className="py-[10px] px-[20px] inline-block bg-[#fb5d5d] text-white text-sm font-bold transition-all uppercase hover:bg-black">
                                  Edit Images
                                </button>
                              </Link>
                            </div>
                          </div>
                        ) : (
                          <h1>The product has No Images</h1>
                        )}
                      </div>
                    </>
                  }
                />
                <Route
                  path="/edit"
                  element={
                    <div className="block w-full">
                      <h3 className="text-[18px] sm:text-[24px] capitalize mb-[15px] font-semibold">
                        Product details.
                      </h3>
                      <p className="text-[14px] italic mb-2">
                        Only Change Fields you wanna Udate, if field is left
                        blank, it wont be Updated.
                      </p>
                      <form
                        onChange={handleUpdateProductChange}
                        onSubmit={handleUpdateProductSubmit}
                      >
                        <div className="mb-[20px]">
                          <label
                            className="font-normal text-[16px] mb-[10px] block"
                            htmlFor="title"
                          >
                            Title
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
                            Description
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
                            Price
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
                        <div className="default-form-box mb-[10px]">
                          <label
                            className="font-normal text-[16px] mb-[10px] block"
                            htmlFor="categories"
                          >
                            Categories
                          </label>
                          <ProductCategoriesSelect
                            selectCategories={setUpdateProductForm}
                          />
                        </div>
                        <div className="default-form-box mb-[10px]">
                          <label
                            className="font-normal text-[16px] mb-[10px] block"
                            htmlFor="badges"
                          >
                            Discount Percentage
                          </label>
                          <input
                            className="block w-full px-[20px] outline-none text-[16px] font-normal text-[#474747] rounded-[3px] bg-white border border-[#e2e2e2] py-[10px] italic focus:border-[#fb5d5d] mr-[10px]"
                            type="text"
                            name="badges"
                            placeholder="-10%"
                          />
                        </div>
                        <button
                          className="py-[10px] px-[25px] inline-block bg-[#fb5d5d] text-white text-sm font-bold transition-all uppercase hover:bg-black rounded-[25px] mt-3"
                          type="submit"
                        >
                          Update Product
                        </button>
                      </form>
                    </div>
                  }
                />
                <Route
                  path="/images/edit"
                  element={
                    <>
                      <h3 className="text-[18px] sm:text-[24px] capitalize mb-[15px] font-semibold">
                        Update Product Images
                      </h3>
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
                                      <>
                                        {(imgInfo.data.size / 1000000).toFixed(
                                          1
                                        )}{" "}
                                        mbs
                                      </>
                                    ) : (
                                      <>
                                        {(imgInfo.data.size / 1000).toFixed(0)}{" "}
                                        kbs
                                      </>
                                    )}
                                  </span>
                                </div>
                              );
                            })}
                        </div>
                        {images.length > 0 && (
                          <>
                            <div className="text-center justify-center items-center">
                              <button
                                className="py-[10px] px-[20px] inline-block bg-[#fb5d5d] text-white text-sm font-bold transition-all uppercase hover:bg-black"
                                onClick={() => handleUpdateImages()}
                              >
                                Update Images
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </>
                  }
                />
              </Routes>
            </div>
          </div>
        )}
        <style>{`
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

      .det_category:not(:last-child)::after {
        margin-right: 5px;
        content: ","
      }
      `}</style>
      </div>
    </>
  );
};

export default UpdateProduct;
