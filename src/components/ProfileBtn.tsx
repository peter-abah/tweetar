import { Link } from "react-router-dom";
import { User } from "../api/users";
import { AuthContextInterface, useAuth } from "../contexts/authContext";

interface Props {
  user: User;
  onFollow: () => void;
  onUnfollow: () => void;
}
const ProfileBtn = ({ user, onFollow, onUnfollow }: Props) => {
  const { user: currentUser } = useAuth() as AuthContextInterface;

  if (!currentUser) return null;

  const className =
    "block w-fit mt-4 ml-auto mr-4 px-4 py-1 text-lg rounded-full bg-neutral-700 text-white";

  if (user.id === currentUser.id) {
    return (
      <Link className={className} to="/editProfile">
        Edit Profile
      </Link>
    );
  } else if (user.followed_by_user) {
    return (
      <button className={className} onClick={onUnfollow}>
        Unfollow
      </button>
    );
  } else {
    return (
      <button className={className} onClick={onFollow}>
        Follow
      </button>
    );
  }
};

export default ProfileBtn;
