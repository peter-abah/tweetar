import User from "./User";
import { UsersContextInterface, useUsers } from "../contexts/usersContext";

const Users = () => {
  const { users } = useUsers() as UsersContextInterface;

  return (
    <div className="border-x border-neutral h-full">
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
};

export default Users;
