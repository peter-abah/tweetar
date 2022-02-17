import { User } from "../api/users";
import { format, parseISO } from "date-fns";
import ProfileBtn from "./ProfileBtn";
import { Link } from "react-router-dom";

interface Props {
  user: User;
}
const ProfileInfo = (props: Props) => {
  const {
    username,
    name,
    followers_count,
    followed_users_count,
    profile_image_url,
    cover_image_url,
    created_at,
  } = props.user;

  const joinedDate = format(parseISO(created_at), "MMMM yyyy");
  return (
    <div className="border-x border-neutral">
      <div
        className="relative h-32 md:h-48"
        style={{
          backgroundImage: `url(${cover_image_url})`,
          backgroundPosition: "center",
        }}
      >
        <img
          className="absolute border-2 border-bg bg-bg z-10 left-4 md:left-8 bottom-[-3rem] md:bottom-[-4rem] w-24 h-24 md:w-32 md:h-32 rounded-full"
          src={profile_image_url}
          alt={name}
        />
      </div>

      <ProfileBtn
        user={props.user}
      />

      <div className="mt-4 p-4">
        <h2 className="text-xl font-bold">{name}</h2>
        <small className="text-neutral-700">@{username}</small>
        <p className="">Joined {joinedDate}</p>
        <div className="flex gap-4">
          <Link to='users/following'>
            <span className="font-bold">{followed_users_count}</span>
            <span> Following</span>
          </Link>
          <Link to='users/followers'>
            <span className="font-bold">{followers_count}</span>
            <span> Followers</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
