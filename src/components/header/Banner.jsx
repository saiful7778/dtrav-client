import PropTypes from "prop-types";
import bannerBg1 from "../../assets/img/banner-bg-01.jpg";
import bannerBg2 from "../../assets/img/banner-bg-02.jpg";
import bannerBg3 from "../../assets/img/banner-bg-03.jpg";
import { useState } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const bannerBg = [bannerBg1, bannerBg2, bannerBg3];

  const heroText = [
    {
      _id: "ht1",
      text1: "1 Days in Switzerland",
      text2: "Special",
      des: "Bern, Lucern, Zurich, Zermatt, Metahorn, Jungfrau",
      btnLink: "/",
    },
    {
      _id: "ht2",
      text1: "Find your perfect",
      text2: "vacation",
      des: "Italy, Rome, Venice, Milan",
      btnLink: "/",
    },
    {
      _id: "ht3",
      text1: "open your eyes to",
      text2: "The hidden world",
      des: "Italy, Rome, Venice, Milan",
      btnLink: "/",
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prop) => (prop + 1) % bannerBg.length);
  };
  const handlePrev = () => {
    setCurrentIndex((prop) => (prop <= 0 ? bannerBg.length - 1 : prop - 1));
  };
  return (
    <div className="relative w-full h-[450px] overflow-hidden">
      <div className="absolute top-0 left-0 z-[1] w-full h-full text-white p-2">
        <div className="h-full flex items-center">
          {heroText.map((ele, idx) => (
            <HeroText
              key={ele._id}
              text1={ele.text1}
              text2={ele.text2}
              des={ele.des}
              btnLink={ele.btnLink}
              currentIdx={currentIndex}
              idx={idx}
            />
          ))}
        </div>
      </div>
      <div className="absolute z-40 bottom-0 right-0 flex items-center gap-2 m-6">
        <button
          onClick={handlePrev}
          className="btn-icon-pri text-2xl"
          type="button"
        >
          <BiLeftArrowAlt />
        </button>
        <button
          onClick={handleNext}
          className="btn-icon-pri text-2xl"
          type="button"
        >
          <BiRightArrowAlt />
        </button>
      </div>
      <div className="absolute top-0 left-0 z-0 w-full banner-overlay h-[450px]">
        {bannerBg.map((ele, idx) => (
          <BanngerBg
            key={"bnbg" + idx}
            imgLink={ele}
            altText={`${idx + 1}`}
            currentIdx={currentIndex}
            idx={idx}
          />
        ))}
      </div>
    </div>
  );
};

const HeroText = ({ text1, text2, des, btnLink, currentIdx, idx }) => {
  const isActive = currentIdx === idx;
  return (
    <div
      className={`absolute left-0 duration-700 translate-y-6 p-2 ${
        isActive ? "translate-y-0" : "opacity-0"
      }`}
    >
      <div
        className={`space-y-3 md:ml-12 duration-700 delay-700 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      >
        <h3 className="text-xl md:text-3xl capitalize font-medium">{text1}</h3>
        <h3 className="text-5xl md:text-6xl uppercase font-bold">{text2}</h3>
        <p>{des}</p>
        <Link className="btn-pri" to={btnLink}>
          learn more
        </Link>
      </div>
    </div>
  );
};

HeroText.propTypes = {
  text1: PropTypes.string,
  text2: PropTypes.string,
  des: PropTypes.string,
  btnLink: PropTypes.string,
  currentIdx: PropTypes.number,
  idx: PropTypes.number,
};

const BanngerBg = ({ imgLink, altText, currentIdx, idx }) => {
  const isActive = currentIdx === idx;
  return (
    <img
      className={`object-cover object-center w-full h-full absolute top-0 left-0 duration-1000 ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
      src={imgLink}
      alt={`banner background image ${altText}`}
    />
  );
};

BanngerBg.propTypes = {
  imgLink: PropTypes.string,
  altText: PropTypes.string,
  currentIdx: PropTypes.number,
  idx: PropTypes.number,
};

export default Banner;
