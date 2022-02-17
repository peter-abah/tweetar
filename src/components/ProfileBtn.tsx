import { Link } from "react-router-dom";
import { User } from "../api/users";
import { AuthContextInterface, useAuth } from "../contexts/authContext";
import { UsersContextInterface, useUsers } from "../contexts/usersContext";

interface Props {
  user: User;
}
const ProfileBtn = ({ user }: Props) => {
  const { user: currentUser } = useAuth() as AuthContextInterface;
  const { onFollow, onUnfollow } = useUsers() as UsersContextInterface;

  if (!currentUser) return null;

  const className =
    "block w-fit mt-4 ml-auto mr-4 px-4 py-1 rounded-full bg-primary text-bg";

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
