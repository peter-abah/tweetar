import { User } from "../api/users";
import { format, parseISO } from "date-fns";
import ProfileBtn from "./ProfileBtn";
import { Link } from "react-router-dom";
import { UseQueryResult } from "react-query";

import Loader from "./Loader";
import ErrorPage from "./Error";
import ProfileImages from "./ProfileImages";

import { MdOutlineLocationOn } from "react-icons/md";
import { FaCalendarDay, FaLink } from "react-icons/fa";

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
    bio,
    website,
    location,
    followers_count,
    followed_users_count,
    created_at,
    cover_image_url,
    profile_image_url,
  } = data;

  const joinedDate = format(parseISO(created_at), "MMMM yyyy");
  return (
    <div className="border-neutral">
      <ProfileImages
        profile_image_url={profile_image_url}
        cover_image_url={cover_image_url}
        user={data}
      />

      <ProfileBtn user={data} onFollow={onFollow} onUnfollow={onUnfollow} />

      <div className="md:mt-4 p-4">
        <h2 className="text-lg md:text-xl font-bold">{name}</h2>
        <small className="text-neutral-700 text-sm">@{username}</small>
        {bio && <p className="my-2">{bio}</p>}

        <div className="flex my-2 flex-wrap">
          {location && (
            <span className="flex mr-3 items-center">
              <MdOutlineLocationOn className="mr-1" /> {location}
            </span>
          )}

          {website && (
            <span className="flex mr-3 items-center">
              <FaLink className="mr-1" /> {website}
            </span>
          )}

          <span className="flex items-center">
            <FaCalendarDay className="mr-1" /> Joined {joinedDate}
          </span>
        </div>

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
