import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { heroText } from "@/staticData";
import { Button } from "keep-react";
import cn from "@/lib/cn";

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timmer = setInterval(() => {
      setCurrentIndex((prop) => (prop + 1) % heroText.length);
    }, 5000);

    return () => {
      clearInterval(timmer);
    };
  }, []);

  const handleNext = () => {
    setCurrentIndex((prop) => (prop + 1) % heroText.length);
  };
  const handlePrev = () => {
    setCurrentIndex((prop) => (prop <= 0 ? heroText.length - 1 : prop - 1));
  };

  return (
    <div className="relative mt-16 h-[550px] w-full overflow-hidden">
      <div className="absolute inset-0 z-10 flex h-full w-full  items-center p-2 text-white">
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
      <div className="absolute bottom-0 right-0 z-10 m-6 flex items-center gap-2">
        <Button
          className="bg-pri hover:bg-pri/80"
          onClick={handlePrev}
          shape="icon"
          size="sm"
          color="secondary"
        >
          <BiLeftArrowAlt size={20} />
        </Button>
        <Button
          className="bg-pri hover:bg-pri/80"
          onClick={handleNext}
          shape="icon"
          size="sm"
          color="secondary"
        >
          <BiRightArrowAlt size={20} />
        </Button>
      </div>
      <div className="banner-overlay absolute inset-0 z-0 h-full w-full">
        {heroText.map((ele, idx) => (
          <BanngerBg
            key={"bnbg" + idx}
            imgLink={ele.image}
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

  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "absolute left-0 w-full p-2 duration-700",
        isActive
          ? "visible translate-y-0 opacity-100"
          : "invisible translate-y-6 opacity-0",
      )}
    >
      <div
        className={cn(
          "space-y-3 delay-700 duration-700 md:ml-12",
          isActive ? "opacity-100" : "opacity-0",
        )}
      >
        <h3 className="text-xl font-medium capitalize md:text-3xl">{text1}</h3>
        <h3 className="text-5xl font-bold uppercase md:text-6xl">{text2}</h3>
        <p>{des}</p>
        <Button
          onClick={() => navigate(btnLink)}
          className="bg-pri hover:bg-pri/80"
          size="sm"
          color="primary"
        >
          Learn more
        </Button>
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
      className={cn(
        "absolute inset-0 h-full w-full object-cover object-center duration-1000",
        isActive ? "opacity-100" : "opacity-0",
      )}
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
