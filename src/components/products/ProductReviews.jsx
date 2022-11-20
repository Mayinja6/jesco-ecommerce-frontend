import { Rating, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { product_reset, review_a_product } from "../../redux/slices/Products";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Spinner from "../Spinner";

import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Navigation, Thumbs } from "swiper";

const Review = ({ img, name, rating, message }) => {
  return (
    <div className="border-[1px] shadow-lg p-5">
      <Rating size="small" readOnly value={rating} />
      <div className="testi-content">
        <p className="text-[16px] my-2 leading-[1.3] text-[#818790] italic">
          {message}
        </p>
      </div>
      <div className="flex mt-5">
        <div className="testimonial-img">
          <Avatar
            sx={{ width: "56px", height: "56px" }}
            src={
              img.filename !== ""
                ? `${process.env.REACT_APP_BACKEND_URL}/api/users/avatar/${img.filename}`
                : ""
            }
            alt="Testimonial_img"
          />
        </div>
        <div className="ml-[25px]">
          <h4 className="text-[#39393a] text-[18px] mt-0 mx-0 mb-[3px] font-semibold">
            {name}
          </h4>
          <span className="text-[#576477] text-[14px] font-semibold">
            Happy Customer
          </span>
        </div>
      </div>
    </div>
  );
};

const ProductReviews = ({ reviews, productId }) => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const { user } = useSelector((state) => state.auth);
  const { productsLoading, newReview } = useSelector((state) => state.products);
  const [ratingValue, setRatingValue] = useState();

  const [productReviewData, setProductReviewData] = useState({
    rating: ratingValue,
    comment: "",
  });

  const submitProductReview = (e) => {
    e.preventDefault();
    if (ratingValue === undefined) {
      addToast("Rate your Review.", { appearance: "error", autoDismiss: true });
      return;
    }
    if (productReviewData.comment === "") {
      addToast("Choose a message for your review", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }
    dispatch(
      review_a_product({
        productId,
        body: productReviewData,
      })
    );
  };

  useEffect(() => {
    if (newReview) {
      addToast("Thanks for your Feedback.", {
        appearance: "info",
        autoDismiss: true,
      });
      window.scrollTo(0, 0);
    }
    dispatch(product_reset());
  }, [dispatch, addToast, newReview]);

  return (
    <>
      {productsLoading && (
        <>
          <h1>Reviewing Product Please wait</h1>
          <Spinner />
        </>
      )}
      {!productsLoading && (
        <div className="lg:flex">
          <div className=" lg:w-[55%]">
            <div className="review-wrapper">
              {reviews.length <= 0 && (
                <h1>
                  This product has't been reviewed yet, could you be first to
                  comment on this Product!
                </h1>
              )}
              {reviews.length > 0 && (
                <>
                  <Swiper
                    autoplay={{ delay: 3000 }}
                    loop={true}
                    navigation={true}
                    speed={500}
                    modules={[Navigation, Thumbs, Autoplay]}
                    slidesPerView={1}
                  >
                    {reviews.map((review, i) => {
                      return (
                        <SwiperSlide key={i} className=" p-5 sm:p-[80px]">
                          <Review
                            img={review.avatar}
                            name={review.owner}
                            rating={review.rating}
                            message={review.comment}
                          />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </>
              )}
            </div>
          </div>
          <div className="sm:p-5 lg:w-[45%]">
            <div className="leading-[1]">
              <h3 className="m-0 text-[18px] font-semibold text-[#525252]">
                {user
                  ? reviews.filter((review) => review.owner === user.fullname)
                      .length <= 0
                    ? "Review Product"
                    : "What you said!"
                  : "Review Product"}
              </h3>
              <div className="ratting-form">
                {!user && (
                  <>
                    <h1 className="my-5">Sign in to Review Product</h1>
                    <div className="flex items-center mt-[30px]">
                      <Link to={"/auth"}>
                        <button className="uppercase cursor-pointer px-4 py-3 transition-all bg-[#ebebeb] font-semibold hover:bg-[#fb5d5d] hover:text-white max-w-full">
                          Sign In{" "}
                          <i className="fa fa-arrow-right -rotate-[45deg]"> </i>
                        </button>
                      </Link>
                    </div>
                  </>
                )}
                {user &&
                  reviews.filter((review) => review.owner === user.fullname)
                    .length <= 0 && (
                    <form onSubmit={submitProductReview}>
                      <div className="flex mt-[10px] mx-0 mb-[20px] items-center">
                        <span className="mt-0 mr-[10px] sm:mr-[15px] ml-0 mb-0 text-[#525252] font-semibold">
                          Your rating:
                        </span>
                        <Rating
                          defaultValue={2.5}
                          precision={0.1}
                          value={Number(ratingValue)}
                          onChange={(e, newvalue) => {
                            setProductReviewData((prev) => ({
                              ...prev,
                              rating: newvalue,
                            }));
                            setRatingValue(newvalue);
                          }}
                        />
                        <span className="ml-[15px]">{ratingValue}</span>
                      </div>
                      <div className="row">
                        <div className="w-full lg:flex gap-4">
                          <div className="w-full">
                            <div className="mb-[10px]">
                              <input
                                className="p-[10px] w-full border-[#ebebeb] border-[1px] text-[14px] italic bg-transparent text-[#474747] outline-none transition-colors focus:border-[#fb5d5d] cursor-not-allowed"
                                placeholder="Name"
                                disabled={true}
                                value={user ? user.fullname : "Name"}
                                type="text"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-[10px] form-submit">
                            <textarea
                              className="p-[10px] border-[#ebebeb] border-[1px] text-[14px] italic bg-transparent text-[#474747] outline-none transition-colors focus:border-[#fb5d5d] min-h-[180px] w-full "
                              name="Your Review"
                              placeholder="Message"
                              onChange={(e) => {
                                setProductReviewData((prev) => ({
                                  ...prev,
                                  comment: e.target.value,
                                }));
                              }}
                            ></textarea>
                            <button
                              className="py-4 text-white uppercase px-7 mt-3 rounded-[25px] bg-[#fb5d5d] hover:translate-y-[-1px] hover:shadow-lg transition-all"
                              type="submit"
                              value="Submit"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  )}
                {user &&
                  reviews.filter((review) => review.owner === user.fullname)
                    .length > 0 && (
                    <h1 className="text-[16px] mt-5 font-semibold">
                      {
                        reviews.filter(
                          (review) => review.owner === user.fullname
                        )[0].comment
                      }
                    </h1>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductReviews;
