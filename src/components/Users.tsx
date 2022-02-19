import { User as Iuser } from "../api/users";
import User from "./User";

interface Props {
  users: Iuser[];
  onFollow: (user: Iuser) => void;
  onUnfollow: (user: Iuser) => void;
}

const Users = ({ users, onFollow, onUnfollow }: Props) => {
  return (
    <div className="border-neutral h-full">
      {users.map((user) => (
        <User
          key={user.id}
          user={user}
          onFollow={onFollow}
          onUnfollow={onUnfollow}
        />
      ))}
    </div>
  );
};

export default Users;
