import { Link } from "react-router-dom";
import { User as Iuser } from "../api/users";

import ProfileBtn from "./ProfileBtn";

const User = (props: { user: Iuser }) => {
  const { user } = props;
  return (
    <div className="flex items-start p-4">
      <Link
        className="w-fit h-fit mr-2 shrink-0"
        to={`/profile/${user.username}`}
      >
        <img
          className="w-12 h-12 rounded-full"
          src={user.profile_image_url}
          alt={user.name}
        />
      </Link>

      <Link to={`/profile/${user.username}`} className="flex flex-col">
        <span className="font-bold">{user.name}</span>
        <span className="">@{user.username}</span>
      </Link>

      <ProfileBtn user={user} />
    </div>
  );
};

export default User;
