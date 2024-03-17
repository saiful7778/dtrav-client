import useAuth from "@/hooks/useAuth";
import { FaUserAstronaut } from "react-icons/fa";

const Profile = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div className="flex flex-wrap gap-2">
      <div className="size-36 overflow-hidden rounded-full bg-gray-300">
        {user?.photoURL ? (
          <img
            className="h-full w-full object-cover object-center"
            src={user.photoURL}
            alt={user.displayName}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <FaUserAstronaut size={120} />
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
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
      </div>
    </div>
  );
};

export default Profile;
