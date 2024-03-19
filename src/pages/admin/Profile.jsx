import useAuth from "@/hooks/useAuth";
import { FaUserAstronaut } from "react-icons/fa";
import UpdateProfile from "./guide/UpdateProfile";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, userDetails } = useAuth();

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="size-36 flex-shrink-0 overflow-hidden rounded-full bg-gray-300">
        {user?.photoURL ? (
          <img
            className="h-full w-full object-cover object-center"
            src={user.photoURL}
            alt={user.displayName}
          />
        ) : userDetails?.image ? (
          <img
            className="h-full w-full object-cover object-center"
            src={userDetails.image}
            alt={user.displayName}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <FaUserAstronaut size={120} />
          </div>
        )}
      </div>
      <div className="w-full">
        {userDetails?.role === "guide" && (
          <Link
            className="hover:underline"
            target="_blank"
            to={`/guide/${userDetails?._id}`}
          >
            show public profile view
          </Link>
        )}
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <div className="text-xs font-bold">Name</div>
            <div>{user.displayName}</div>
          </div>
          <div>
            <div className="text-xs font-bold">Email</div>
            <div>{user.email}</div>
          </div>
          <div>
            <div className="text-xs font-bold">Email verified</div>
            <div>{user.emailVerified ? "Verified" : "Not verified"}</div>
          </div>
          <div>
            <div className="text-xs font-bold">User role</div>
            <div>{userDetails?.role}</div>
          </div>
          {userDetails?.role === "guide" && <UpdateProfile />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
