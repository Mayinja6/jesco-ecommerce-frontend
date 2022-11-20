import { ScrollToTop } from "../utils/ScrollToTop";

const PrivacyPolicy = () => {
  return (
    <>
      <ScrollToTop />
      <div className="p-5 sm:p-[80px]">
        <div className="mb-[22px] section_1">
          <h2 className="text-[20px] md:text-[22px] leading-[26px] font-semibold mb-[7px]">
            Who we are
          </h2>
          <p className="text-base mb-[19px]">
            Our website address is:{" "}
            <a
              className="text-[#fb5d5d] "
              href="https://www.github.com/Mayinja6"
            >
              https://www.github.com/Mayinja6
            </a>
          </p>
        </div>
        <div className="mb-[22px] section_2">
          <h2 className="text-[20px] md:text-[22px] leading-[26px] font-semibold mb-[7px]">
            What personal data we collect and why we collect it
          </h2>
          <h3 className="text-[20px] md:text-[22px] leading-[26px] font-semibold mb-[7px]">
            Comments
          </h3>
          <p className="text-base mb-[19px]">
            When visitors leave comments on the site we collect the data shown
            in the comments form, and also the visitor’s IP address and browser
            user agent string to help spam detection.
          </p>
          <p className="text-base mb-[19px]">
            An anonymized string created from your email address (also called a
            hash) may be provided to the Gravatar service to see if you are
            using it. The Gravatar service privacy policy is available here:
            https://automattic.com/privacy/. After approval of your comment,
            your profile picture is visible to the public in the context of your
            comment.
          </p>
          <h3 className="text-[20px] md:text-[22px] leading-[26px] font-semibold mb-[7px]">
            Media
          </h3>
          <p className="text-base mb-[19px]">
            If you upload images to the website, you should avoid uploading
            images with embedded location data (EXIF GPS) included. Visitors to
            the website can download and extract any location data from images
            on the website.
          </p>
          <h3 className="text-[20px] md:text-[22px] leading-[26px] font-semibold mb-[7px]">
            Cookies
          </h3>
          <p className="text-base mb-[19px]">
            If you leave a comment on our site you may opt-in to saving your
            name, email address and website in cookies. These are for your
            convenience so that you do not have to fill in your details again
            when you leave another comment. These cookies will last for one
            year.
          </p>
          <p className="text-base mb-[19px]">
            If you have an account and you log in to this site, we will set a
            temporary cookie to determine if your browser accepts cookies. This
            cookie contains no personal data and is discarded when you close
            your browser.
          </p>
          <p className="text-base mb-[19px]">
            When you log in, we will also set up several cookies to save your
            login information and your screen display choices. Login cookies
            last for two days, and screen options cookies last for a year. If
            you select “Remember Me”, your login will persist for two weeks. If
            you log out of your account, the login cookies will be removed.
          </p>
          <p className="text-base mb-[19px]">
            If you edit or publish an article, an additional cookie will be
            saved in your browser. This cookie includes no personal data and
            simply indicates the post ID of the article you just edited. It
            expires after 1 day.
          </p>
          <h3 className="text-[20px] md:text-[22px] leading-[26px] font-semibold mb-[7px]">
            Embedded content from other websites
          </h3>
          <p className="text-base mb-[19px]">
            Articles on this site may include embedded content (e.g. videos,
            images, articles, etc.). Embedded content from other websites
            behaves in the exact same way as if the visitor has visited the
            other website.
          </p>
          <p className="text-base mb-[19px]">
            These websites may collect data about you, use cookies, embed
            additional third-party tracking, and monitor your interaction with
            that embedded content, including tracking your interaction with the
            embedded content if you have an account and are logged in to that
            website.
          </p>
        </div>
        <div
          className="mb-[22px] section_3"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <h2 className="text-[20px] md:text-[22px] leading-[26px] font-semibold mb-[7px]">
            How long we retain your data
          </h2>
          <p className="text-base mb-[19px]">
            If you leave a comment, the comment and its metadata are retained
            indefinitely. This is so we can recognize and approve any follow-up
            comments automatically instead of holding them in a moderation
            queue.
          </p>
          <p className="text-base mb-[19px]">
            For users that register on our website (if any), we also store the
            personal information they provide in their user profile. All users
            can see, edit, or delete their personal information at any time
            (except they cannot change their username). Website administrators
            can also see and edit that information.
          </p>
        </div>
        <div
          className="mb-[22px] section_3"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <h2 className="text-[20px] md:text-[22px] leading-[26px] font-semibold mb-[7px]">
            What rights you have over your data
          </h2>
          <p className="text-base mb-[19px]">
            If you have an account on this site, or have left comments, you can
            request to receive an exported file of the personal data we hold
            about you, including any data you have provided to us. You can also
            request that we erase any personal data we hold about you. This does
            not include any data we are obliged to keep for administrative,
            legal, or security purposes.
          </p>
        </div>
        <div className="mb-[22px] section_3">
          <h2 className="text-[20px] md:text-[22px] leading-[26px] font-semibold mb-[7px]">
            Where we send your data
          </h2>
          <p className="text-base mb-[19px]">
            Visitor comments may be checked through an automated spam detection
            service.
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
