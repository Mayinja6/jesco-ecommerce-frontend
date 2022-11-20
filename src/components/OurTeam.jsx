import { team } from "../assets/imgs";

const OurTeam = () => {
  return (
    <div className="team-area p-5  sm:p-[80px]">
      <div className="section-title text-center mb-[30px]">
        <h2 className="title leading-[1]">#ourteam</h2>
      </div>

      <div className="flex flex-wrap gap-8 justify-center items-center">
        <div className="mb-[30px]">
          <div className="team-wrapper">
            <div className="team-image overflow-hidden">
              <img
                src={team}
                className="w-full max-w-full transition-all "
                alt="testimonial_img"
              />
            </div>
            <div className="text-center leading-[1]">
              <h6 className="text-lg text-black font-bold mt-[27px] mx-0 mb-0 uppercase">
                Howard Burns
              </h6>
              <span className="text-sm font-normal text-[#656565] uppercase mt-[9px] mx-0 mb-[27px]">
                C.E.O
              </span>
            </div>
            <ul className="border-t border-[#d9d9d9] flex items-center justify-center">
              <li className="ml-[10px]">
                <a href="/ourteam">
                  <i className="fa fa-facebook"></i>
                </a>
              </li>
              <li className="ml-[10px]">
                <a href="/ourteam">
                  <i className="fa fa-twitter"></i>
                </a>
              </li>
              <li className="ml-[10px]">
                <a href="/ourteam">
                  <i className="fa fa-dribbble"></i>
                </a>
              </li>
              <li className="ml-[10px]">
                <a href="/ourteam">
                  <i className="fa fa-pinterest-p"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mb-[30px]">
          <div className="team-wrapper">
            <div className="team-image overflow-hidden">
              <img
                src={team}
                className="w-full max-w-full transition-all "
                alt="testimonial_img"
              />
            </div>
            <div className="text-center leading-[1]">
              <h6 className="text-lg text-black font-bold mt-[27px] mx-0 mb-0 uppercase">
                Lester Houser
              </h6>
              <span className="text-sm font-normal text-[#656565] uppercase mt-[9px] mx-0 mb-[27px]">
                Sectetary
              </span>
            </div>
            <ul className="border-t border-[#d9d9d9] flex items-center justify-center">
              <li className="ml-[10px]">
                <a href="/ourteam">
                  <i className="fa fa-facebook"></i>
                </a>
              </li>
              <li className="ml-[10px]">
                <a href="/ourteam">
                  <i className="fa fa-twitter"></i>
                </a>
              </li>
              <li className="ml-[10px]">
                <a href="/ourteam">
                  <i className="fa fa-dribbble"></i>
                </a>
              </li>
              <li className="ml-[10px]">
                <a href="/ourteam">
                  <i className="fa fa-pinterest-p"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mb-[30px]">
          <div className="team-wrapper">
            <div className="team-image overflow-hidden">
              <img
                src={team}
                className="w-full max-w-full transition-all "
                alt="testimonial_img"
              />
            </div>
            <div className="text-center leading-[1]">
              <h6 className="text-lg text-black font-bold mt-[27px] mx-0 mb-0 uppercase">
                Craig Chaney
              </h6>
              <span className="text-sm font-normal text-[#656565] uppercase mt-[9px] mx-0 mb-[27px]">
                Manager
              </span>
            </div>
            <ul className="border-t border-[#d9d9d9] flex items-center justify-center">
              <li className="ml-[10px]">
                <a href="/ourteam">
                  <i className="fa fa-facebook"></i>
                </a>
              </li>
              <li className="ml-[10px]">
                <a href="/ourteam">
                  <i className="fa fa-twitter"></i>
                </a>
              </li>
              <li className="ml-[10px]">
                <a href="/ourteam">
                  <i className="fa fa-dribbble"></i>
                </a>
              </li>
              <li className="ml-[10px]">
                <a href="/ourteam">
                  <i className="fa fa-pinterest-p"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <style>{`
         .team-area li a {
          width: 42px;
          height: 42px;
          background-color: #2b2b2b;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #fff;
          font-size: 16px;
          position: relative;
          overflow: hidden;
          z-index: 1;
          margin-top: -1px;
        }

        .team-area li a::before {
          position: absolute;
          content: "";
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: linear-gradient(-155deg, #fd3d6b 0%, #fd7863 98%, #f3dfe0 100%);
          z-index: -1;
          -webkit-transition: opacity 0.3s linear;
          transition: opacity 0.3s linear;
          opacity: 0;
        }

        .team-area li a:hover {
          color: #fff;
        }

        .team-area li a:hover::before {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default OurTeam;
