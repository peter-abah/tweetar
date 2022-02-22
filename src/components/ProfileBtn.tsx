import { Link } from "react-router-dom";
import { User } from "../api/users";
import { useAuth } from "../contexts/authContext";

interface Props {
  user: User;
  onFollow: (user: User) => void;
  onUnfollow: (user: User) => void;
}
const ProfileBtn = ({ user, onFollow, onUnfollow }: Props) => {
  const { currentUser } = useAuth();

  const className =
    "block w-fit mt-4 ml-auto mr-4 px-4 py-1 rounded-full bg-primary text-bg";

  if (!currentUser) return <div className="h-12" />;

  if (user.id === currentUser.id) {
    return (
      <Link className={className} to="/editProfile">
        Edit Profile
      </Link>
    );
  } else if (user.followed_by_user) {
    return (
      <button className={className} onClick={() => onUnfollow(user)}>
        Unfollow
      </button>
    );
  } else {
    return (
      <button className={className} onClick={() => onFollow(user)}>
        Follow
      </button>
    );
  }
};

export default ProfileBtn;
