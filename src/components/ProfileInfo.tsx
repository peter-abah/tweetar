import { User } from "../api/users";
import { format, parseISO } from "date-fns";
import ProfileBtn from "./ProfileBtn";

interface Props {
  user: User;
  onFollow: () => void;
  onUnfollow: () => void;
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
    <div className="mb-4 border-b border-neutral-300">
      <div
        className="relative h-32 md:h-48"
        style={{
          backgroundImage: `url(${cover_image_url})`,
          backgroundPosition: "center",
        }}
      >
        <img
          className="absolute border-2 border-white bg-white z-10 left-4 md:left-8 bottom-[-3rem] md:bottom-[-4rem] w-24 h-24 md:w-32 md:h-32 rounded-full"
          src={profile_image_url}
          alt={name}
        />
      </div>

      <ProfileBtn
        user={props.user}
        onFollow={props.onFollow}
        onUnfollow={props.onUnfollow}
      />

      <div className="mt-20 p-4">
        <h2 className="text-xl font-bold">{name}</h2>
        <small className="text-neutral-700">@{username}</small>
        <p className="text-neutral-700">Joined {joinedDate}</p>
        <div className="text-neutral-700 flex gap-4">
          <p>
            <span className="font-bold text-black">{followed_users_count}</span>
            <span> Following</span>
          </p>
          <p>
            <span className="font-bold text-black">{followers_count}</span>
            <span> Followers</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
