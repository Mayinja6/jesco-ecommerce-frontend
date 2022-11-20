import { icon4, icon5, icon6 } from "../assets/imgs";
import { useToasts } from "react-toast-notifications";
import { useState } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const { addToast } = useToasts();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleContactformSubmit = (e) => {
    e.preventDefault();

    if (name === "") {
      addToast("Name is required", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    if (email === "") {
      addToast("Email Address Field is Empty", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    if (message === "") {
      addToast("Message is Blank", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }
  };

  return (
    <section>
      <div className="w-full relative px-5 mb-5 sm:p-[50px] md:p-[100px] lg:px-[150px] lg:py-[10px] flex flex-col lg:flex-row items-center justify-center lg:justify-between border-b">
        <div className="w-full lg:w-[40%] relative contact-info">
          <div className="w-full flex flex-row justify-start items-center py-[25px] sm:py-[30px] px-[35px] lg:px-[28px] border-[1px] mt-[30px] bg-white">
            <div className="icon-box">
              <img src={icon4} alt="icon4" />
            </div>
            <div className="info-box">
              <h5 className="text-[#2e2e2e] font-semibold mt-0 mx-0 mb-[3px]  text-[20px] sm:text-[24px]">
                Phone:
              </h5>
              <p className="text-base text-[#848484] font-normal">
                <a
                  className="text=[#848484] hover:text-[#fb5d5d] font-medium"
                  href="tel:0123456789"
                >
                  012 345 67 89
                </a>
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-start items-center py-[25px] sm:py-[30px] px-[35px] lg:px-[28px] border-[1px] mt-[30px] bg-white">
            <div className="icon-box">
              <img src={icon5} alt="icon5" />
            </div>
            <div className="info-box">
              <h5 className="text-[#2e2e2e] font-semibold mt-0 mx-0 mb-[3px]  text-[20px] sm:text-[24px]">
                Email:
              </h5>
              <p className="text-base text-[#848484] font-normal">
                <a
                  className="text=[#848484] hover:text-[#fb5d5d] font-medium"
                  href="mailto:sales@jesco.com"
                >
                  sales@jesco.com
                </a>
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-start items-center py-[25px] sm:py-[30px] px-[35px] lg:px-[28px] border-[1px] mt-[30px] bg-white">
            <div className="icon-box">
              <img src={icon6} alt="icon6" />
            </div>
            <div className="info-box">
              <h5 className="title">Address:</h5>
              <p>Your address goes here</p>
            </div>
          </div>
        </div>

        <div className="w-full mt-8 lg:mt-0 lg:w-[60%] lg:pl-[30px] mb-6 relative">
          <div className="mb-[31px]">
            <h2 className="text-[30px] text-[#222121] font-bold mb-[14px] mt-0 mx-0">
              Leave a Message
            </h2>
            <p className="text-[#404040] leading-[27px]">
              There are many variations of passages of Lorem Ipsum available but
              the suffered alteration in some form.
            </p>
          </div>
          <form
            onSubmit={handleContactformSubmit}
            className="w-full relative"
            id="contact-form"
          >
            <div className="row">
              <input
                className="w-full max-w-full p-3 bg-transparent mb-[30px] text-[#474747] text-sm border-[#c1c1c1] border-[1px] placeholder:italic placeholder:text-[#999999] outline-none focus:border-[#fb5d5d]"
                name="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="Name*"
                type="text"
              />

              <input
                className="w-full max-w-full p-3 bg-transparent mb-[30px] text-[#474747] text-sm border-[#c1c1c1] border-[1px] placeholder:italic placeholder:text-[#999999] outline-none focus:border-[#fb5d5d]"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email*"
                type="email"
              />
              <textarea
                className="w-full max-w-full p-3 bg-transparent mb-0 text-[#474747] text-sm border-[#c1c1c1] border-[1px] placeholder:italic placeholder:text-[#999999] outline-none focus:border-[#fb5d5d]  h-[150px]"
                name="message"
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your Message*"
              ></textarea>
              <button
                className="block mt-4 text-sm font-semibold leading-[1px] py-2 px-4 rounded-[20px] bg-[#fb5d5d] text-white hover:translate-y-[-2px] transition-all hover:shadow-2xl"
                type="submit"
              >
                Send Feedback{" "}
                <i className="fa fa-arrow-right text-base ml-[10px]"></i>
              </button>
            </div>
          </form>
        </div>
        <style>{`
        .icon-box {
          width: 70px;
          height: 70px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(-155deg, #fd3d6b 0%, #fd7863 98%, #f3dfe0 100%);
          border-radius: 50%;
          margin-right: 30px;
        }

        @media only screen and (max-width: 479px) {
          .icon-box {
            width: 60px;
            height: 60px;
            margin-right: 20px;
          }
        }

        .info-box {
          width: calc(100% - 80px);
        }
      `}</style>
      </div>
      <div className="flex items-center justify-center my-[30px]">
        <Link to={"/products"}>
          <button className="uppercase cursor-pointer px-4 py-3 transition-all bg-[#ebebeb] font-semibold hover:bg-[#fb5d5d] hover:text-white max-w-full">
            <i className="fa fa-arrow-left rotate-[40deg]"> </i> Continue
            shopping
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Contact;
