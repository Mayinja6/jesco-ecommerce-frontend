import { Link } from "react-router-dom";
import logo from "../assets/imgs/logo-white.png";
import payment from "../assets/imgs/icons/payment.png";

const Footer = () => {
  return (
    <div className="bg-[#333333] text-white px-5 sm:px-10">
      <div className="pt-[50px] px-0 pb-[50px] md:pt-[60px] md:px-0 md:pb-[40px] lg:pt-[80px] lg:px-0 lg:pb-[60px]  grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="single-wedge">
          <div className="mt-0 mx-0 mb-[27px]">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
          <p className="text-base max-w-[454px] leading  md:max-w-[290px]  leading-7 font-light text-[#afafaf]">
            Lorem ipsum dolor sit amet consectet adipisicing elit, sed do
            eiusmod templ incididunt ut labore et dolore magnaol aliqua Ut enim
            ad minim.
          </p>
          <ul className="link-follow mt-3">
            <li>
              <a
                className="m-0"
                title="Twitter"
                href="https://www.twitter.com/jesco"
              >
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a title="Wjatsapp" href="https://w.me/+233708023634">
                <i className="fa fa-whatsapp" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a title="Telegram" href="https://t.me/jesco">
                <i className="fa fa-telegram" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a title="Instagram" href="https://www.instagram.com/jesco">
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>

        <div className="single-wedge">
          <h4 className="text-[20px] capitalize font-semibold mb-[27px] relative text-white">
            Other Page
          </h4>
          <div className="footer-links">
            <div className="footer-row">
              <ul className="align-items-center">
                <li className="social-link">
                  <Link className="single-link" to="/about">
                    About
                  </Link>
                </li>

                <li className="social-link">
                  <Link className="single-link" to="/privacypolicy">
                    Privacy Policy
                  </Link>
                </li>
                <li className="social-link">
                  <Link className="single-link" to="/contact">
                    Contact
                  </Link>
                </li>
                <li className="social-link">
                  <Link className="single-link" to="/account">
                    Account
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="single-wedge">
          <h4 className="text-[20px] capitalize font-semibold mb-[27px] relative text-white">
            Company
          </h4>
          <div className="footer-links">
            <div className="footer-row">
              <ul className="align-items-center">
                <li className="social-link">
                  <Link className="single-link" to="/">
                    Jesco
                  </Link>
                </li>
                <li className="social-link">
                  <Link className="single-link" to="/products">
                    Shop
                  </Link>
                </li>
                <li className="social-link">
                  <Link className="single-link" to="/contact">
                    Contact us
                  </Link>
                </li>
                <li className="social-link">
                  <Link className="single-link" to="/auth">
                    Log in
                  </Link>
                </li>
                {/* <li className="social-link">
                  <Link className="single-link" to="/">
                    Help
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
        </div>

        <div className="single-wedge">
          <h4 className="text-[20px] capitalize font-semibold mb-[27px] relative text-white">
            Store Information.
          </h4>
          <div className="footer-links text-[#afafaf]">
            <p className="address">
              2005 Your Address Goes Here. <br />
              896, Address 10010, HGJ
            </p>
            <p className="mt-[15px]">
              Phone/Fax:
              <a
                className="hover:text-[#fb5d5d] transition-all"
                href="tel:0123456789"
              >
                {" "}
                0123456789
              </a>
            </p>
            <p className="mt-[15px]">
              Email:
              <a
                className="hover:text-[#fb5d5d] transition-all"
                href="mailto:douglasmayinja6@gmail.com"
              >
                {" "}
                douglasmayinja6@gmail.com
              </a>
            </p>
            <img src={payment} alt="" className="mt-[30px]" />
          </div>
        </div>
      </div>
      <style>{`
        .social-link {
          display: block;
          margin: 0;
          line-height: 1;
          border: 0;
          padding-left: 12px;
          font-weight: 400;
          margin-bottom: 8px;
          position: relative;
        }

        .social-link::after {
          position: absolute;
          top: 50%;
          left: 0;
          width: 6px;
          height: 1px;
          background-color: #afafaf;
          content: "";
          margin-top: -0.5px;
        }

        .single-link {
          font-size: 16px;
          line-height: 27px;
          padding: 0;
          display: inline-block;
          text-transform: capitalize;
          color: #afafaf;
          margin-bottom: 0;
          display: inline-block;
          position: relative;
          -webkit-transition: all 300ms linear;
          transition: all 300ms linear;
        }

        .single-link:hover {
          padding-left: 8px;
          color: #fb5d5d;
        }

        .link-follow li {
          list-style: none;
          display: inline-block;
        }

        .link-follow a {
          color: #fffefe;
          margin-left: 7px;
          font-size: 16px;
          line-height: 32px;
          width: 32px;
          height: 32px;
          text-align: center;
          background-color: transparent;
          display: block;
          border-radius: 50%;
        }

        .link-follow a:hover {
          color: #fffefe;
          background-color: #fb5d5d;
        }


      `}</style>
    </div>
  );
};

export default Footer;
