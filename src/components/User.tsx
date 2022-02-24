import { Link } from "react-router-dom";
import { User as Iuser } from "../api/users";

import ProfileBtn from "./ProfileBtn";

import fallbackImg from "../assets/defaultAvatar.png";

interface Props {
  user: Iuser;
  onFollow: (user: Iuser) => void;
  onUnfollow: (user: Iuser) => void;
}
const User = (props: Props) => {
  const { user, onFollow, onUnfollow } = props;
  return (
    <div className="flex px-2 py-4 md:p-4 text-sm">
      <Link
        className="w-fit h-fit mr-2 shrink-0"
        to={`/profile/${user.username}`}
      >
        <img
          className="w-12 h-12 rounded-full object-cover"
          src={user.profile_image_url || fallbackImg}
          alt={user.name}
        />
      </Link>

      <div className="grow">
        <div className="flex items-start w-full gap-4">
          <Link to={`/profile/${user.username}`} className="flex flex-col">
            <span className="font-bold">{user.name}</span>
            <span className="">@{user.username}</span>
          </Link>

          <ProfileBtn user={user} onFollow={onFollow} onUnfollow={onUnfollow} />
        </div>
        <p>{user.bio}</p>
      </div>
    </div>
  );
};

export default User;
