import SiteLogo from "@/components/SiteLogo";
import cn from "@/lib/cn";
import { navLinks } from "@/staticData";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineMenuFold } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";
import { Button } from "keep-react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

const Navbar = () => {
  const { scrollY } = useScroll();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious();
    if (latest > prev && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const renderNavLinks = navLinks.map((nav) => (
    <NavLink
      key={nav._id}
      className={({ isActive }) =>
        cn(
          "font-medium capitalize opacity-70 duration-200 hover:underline hover:opacity-100",
          isActive && "underline opacity-100",
        )
      }
      to={nav.path}
    >
      {nav.navName}
    </NavLink>
  ));

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed left-0 top-0 z-50 w-full"
      >
        <div className="container flex h-fit w-full items-center justify-between border-b border-gray-300 bg-gray-100 p-2">
          <SiteLogo />
          <div className="flex items-center gap-2">
            <ul className="hidden items-center gap-4 lg:flex">
              {renderNavLinks}
            </ul>
            <Button
              onClick={() => setShowMobileMenu((prop) => !prop)}
              className="bg-pri hover:bg-pri/80 md:hidden"
              shape="icon"
              size="sm"
            >
              <AiOutlineMenuFold size={20} />
            </Button>
            <Authectication />
          </div>
        </div>
      </motion.nav>
      <div
        className={cn(
          "fixed top-0 z-50 h-screen w-full max-w-72 border-l border-gray-400 bg-gray-50/50 p-4 shadow backdrop-blur duration-300",
          showMobileMenu ? "right-0" : "-right-full",
        )}
      >
        <Button
          onClick={() => setShowMobileMenu((prop) => !prop)}
          className="bg-pri hover:bg-pri/80"
          shape="icon"
          size="sm"
        >
          <RxCrossCircled size={20} />
        </Button>
        <ul className="flex flex-col items-center gap-3">{renderNavLinks}</ul>
        <div className="mt-4 flex flex-col items-center gap-4">
          <Authectication />
        </div>
      </div>
    </>
  );
};

const Authectication = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        onClick={() => navigate("/authentication/login")}
        className="bg-pri hover:bg-pri/80"
        size="xs"
        color="primary"
      >
        Login
      </Button>
      <Button
        onClick={() => navigate("/authentication/register")}
        className="text-pri border-pri hover:border-pri/80 hover:bg-pri hover:text-gray-50"
        size="xs"
        color="primary"
        variant="outline"
      >
        Register
      </Button>
    </>
  );
};

export default Navbar;
