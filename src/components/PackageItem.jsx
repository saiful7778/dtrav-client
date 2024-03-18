import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Button } from "keep-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PackageItem = ({ inputData }) => {
  const [wishlist, setWishlist] = useState(false);
  const { _id, thumbnail, title, type, price } = inputData || {};
  const navigate = useNavigate();
  const { user, userDetails, token } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleWishlist = async () => {
    if (!user) {
      navigate("/authentication/login");
      return;
    }
    const { data } = await axiosSecure.post(
      `/package/wishlist/${_id}?email=${user.email}`,
      {
        user_id: userDetails?._id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (data.success) {
      setWishlist(true);
    } else {
      setWishlist(false);
    }
  };

  return (
    <div className="space-y-2 rounded p-4 shadow">
      <figure className="relative h-48 w-full overflow-hidden rounded shadow">
        <img
          className="h-full w-full object-cover object-center"
          src={thumbnail}
          alt={title + " image"}
        />
        <div className="absolute bottom-0 right-0 z-50 m-2">
          <Button
            onClick={handleWishlist}
            className="bg-pri hover:bg-pri/80"
            shape="icon"
            size="sm"
          >
            {wishlist ? <FaHeart /> : <FaRegHeart />}
          </Button>
        </div>
      </figure>
      <h5 className="font-bold">{title}</h5>
      <div className="text-sm text-gray-700">
        <span className="font-bold">Type:</span> {type}
      </div>
      <div className="text-sm text-gray-700">
        <span className="font-bold">Price:</span> ${price}
      </div>
      <Button
        onClick={() => navigate(`/package/${_id}`)}
        className="w-full bg-pri hover:bg-pri/80"
        color="primary"
        size="sm"
      >
        View Package
      </Button>
    </div>
  );
};

PackageItem.propTypes = {
  inputData: PropTypes.object,
};

export default PackageItem;
