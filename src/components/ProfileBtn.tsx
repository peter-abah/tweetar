import classNames from "classnames";
import { Link } from "react-router-dom";
import { User } from "../api/users";
import { useAuth } from "../contexts/authContext";

interface Props {
  user: User;
  onFollow: (user: User) => void;
  onUnfollow: (user: User) => void;
  className?: string;
}
const ProfileBtn = ({ user, onFollow, onUnfollow, className }: Props) => {
  const { currentUser } = useAuth();

  const btnClassName = classNames(
    "block w-fit px-4 py-1 ml-auto font-bold",
    "rounded-full bg-primary text-bg",
    className
  );

  if (!currentUser) return <div className="h-12" />;

  if (user.id === currentUser.id) {
    return (
      <Link className={btnClassName} to="edit">
        Edit Profile
      </Link>
    );
  } else if (user.followed_by_user) {
    return (
      <button className={btnClassName} onClick={() => onUnfollow(user)}>
        Unfollow
      </button>
    );
  } else {
    return (
      <button className={btnClassName} onClick={() => onFollow(user)}>
        Follow
      </button>
    );
  }
};

export default ProfileBtn;
