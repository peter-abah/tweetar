import { User } from "../api/users";
import { format, parseISO } from "date-fns";
import ProfileBtn from "./ProfileBtn";
import { Link } from "react-router-dom";
import { UseQueryResult } from "react-query";
import Loader from "./Loader";
import ErrorPage from "./Error";

import fallbackImg from "../assets/defaultAvatar.png";

interface Props {
  userValues: UseQueryResult<User, unknown>;
  onFollow: (user: User) => void;
  onUnfollow: (user: User) => void;
}
const ProfileInfo = ({ userValues, onFollow, onUnfollow }: Props) => {
  const { data, isLoading, isError } = userValues;

  if (isLoading) return <Loader />;
  if (isError) return <ErrorPage />;
  if (!data) return <Loader />;

  const {
    username,
    name,
    followers_count,
    followed_users_count,
    created_at,
    cover_image_url,
    profile_image_url,
  } = data;

  const joinedDate = format(parseISO(created_at), "MMMM yyyy");
  return (
    <div className="border-neutral">
      <div
        className="relative h-32 md:h-48"
        style={{
          backgroundImage: `url(${cover_image_url})`,
          backgroundPosition: "center",
          backgroundColor: "gray",
        }}
      >
        <img
          className="absolute border-2 border-bg bg-bg z-10 left-4 bottom-[-3rem] md:bottom-[-4rem] w-24 h-24 md:w-32 md:h-32 rounded-full"
          src={profile_image_url || fallbackImg}
          alt={name}
        />
      </div>

      <ProfileBtn user={data} onFollow={onFollow} onUnfollow={onUnfollow} />

      <div className="mt-4 p-4">
        <h2 className="text-xl font-bold">{name}</h2>
        <small className="text-neutral-700">@{username}</small>
        <p className="">Joined {joinedDate}</p>
        <div className="flex gap-4">
          {followed_users_count > 0 && (
            <Link to="users/following">
              <span className="font-bold">{followed_users_count}</span>
              <span> Following</span>
            </Link>
          )}
          {followers_count > 0 && (
            <Link to="users/followers">
              <span className="font-bold">{followers_count}</span>
              <span> Followers</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
