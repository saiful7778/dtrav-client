import SiteLogo from "@/components/SiteLogo";
import { Link } from "react-router-dom";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-blue-600 p-8 text-white">
      <div className="flex flex-col gap-4 p-10 md:flex-row">
        <div className="w-full max-w-xs">
          <h6 className="mb-5 font-bold">Need Help ?</h6>
          <p className="text-sm text-blue-300">
            We are Always here for you! Knock us on Messenger anytime or Call
            our Hotline (10AM - 10PM).{" "}
          </p>
        </div>
        <div className="w-full max-w-xs">
          <h6 className="mb-5 font-bold">Contact</h6>
          <div className="text-sm text-blue-300">
            <div>
              <a href="mailto:info@dtrav.com">info@dtrav.com</a>
            </div>
            <div>
              <a href="tel:+8801700000000">+88 01700-000000</a>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Link
                className="rounded-full bg-blue-500 p-2"
                to="https://www.facebook.com/Saiful.Islam.Rafi.89"
                target="_blank"
              >
                <FaFacebook size={20} />
              </Link>
              <Link
                className="rounded-full bg-blue-500 p-2"
                to="https://www.linkedin.com/in/saiful-islam-0471b924b"
                target="_blank"
              >
                <FaLinkedin size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-blue-500 p-4">
        <SiteLogo />
        <p>© Copyright Dtrav.</p>
      </div>
    </footer>
  );
};

export default Footer;
