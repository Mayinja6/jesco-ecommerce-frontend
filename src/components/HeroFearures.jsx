import { icon1, icon2, icon3 } from "../assets/imgs";

const HeroFearures = ({ otherStyles }) => {
  return (
    <div
      className={`${otherStyles} px-5 sm:px-[80px] flex justify-center sm:justify-evenly flex-wrap items-center`}
      style={{ zIndex: 10000 }}
    >
      <div className="bg-white p-[25px] md:p-[20px] lg:p-[30px] flex flex-row items-center border-[1px] border-[#e8e8e8] mb-5 max-w-full">
        <div className="feature-icon">
          <img
            className="transition-all hover:scale-[0.9] hover:rotate-[3deg]"
            src={icon1}
            alt="icon_img"
          />
        </div>
        <div className="feature-content">
          <h4 className="text-[20px] sm:text-[24px] text-[#2e2e2e] font-semibold mt-0 mx-0 mb-[3px]">
            Free Shipping
          </h4>
          <span className="text-[14px] text-[#848484] font-normal sm:text-[16px]">
            Capped at $39 per order
          </span>
        </div>
      </div>

      <div className="bg-white p-[25px] md:p-[20px] lg:p-[30px] flex flex-row items-center border-[1px] border-[#e8e8e8] mb-5 max-w-full">
        <div className="feature-icon">
          <img
            className="transition-all hover:scale-[0.9] rotate-[3deg]"
            src={icon2}
            alt="icon_img"
          />
        </div>
        <div className="feature-content">
          <h4 className="text-[20px] sm:text-[24px] text-[#2e2e2e] font-semibold mt-0 mx-0 mb-[3px]">
            Card Payments
          </h4>
          <span className="text-[14px] text-[#848484] font-normal sm:text-[16px]">
            12 Months Installments
          </span>
        </div>
      </div>

      <div className="bg-white p-[25px] md:p-[20px] lg:p-[30px] flex flex-row items-center border-[1px] border-[#e8e8e8] mb-5 max-w-full">
        <div className="feature-icon">
          <img
            className="transition-all hover:scale-[0.9] rotate-[3deg]"
            src={icon3}
            alt="icon_img"
          />
        </div>
        <div className="feature-content">
          <h4 className="text-[20px] sm:text-[24px] text-[#2e2e2e] font-semibold mt-0 mx-0 mb-[3px]">
            Easy Returns
          </h4>
          <span className="text-[14px] text-[#848484] font-normal sm:text-[16px]">
            Shop With Confidence
          </span>
        </div>
      </div>
      <style>{`
        .feature-icon {
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
      
        @media only screen and (min-width: 992px) and (max-width: 1199px),
          only screen and (max-width: 479px) {
          .single-feature .feature-icon {
            margin-right: 20px;
          }
        }

        .feature-content {
          width: calc(100% - 100px);
        }

        @media only screen and (min-width: 992px) and (max-width: 1199px),
          only screen and (max-width: 479px) {
          .single-feature .feature-content {
            width: calc(100% - 90px);
          }
        }
      `}</style>
    </div>
  );
};

export default HeroFearures;
