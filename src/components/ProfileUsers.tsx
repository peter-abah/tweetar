import { Link, Routes, Outlet, Route } from "react-router-dom";
import { User } from "../api/users";
import Followers from "./Followers";
import Following from "./Following";

const ProfileUsers = ({ user }: { user: User }) => {
  return (
    <div>
      <nav className="border-x border-b border-neutral">
        <ul className="grid grid-cols-2">
          <li>
            <Link className="block text-center p-2" to="followers">
              Followers
            </Link>
          </li>

          <li>
            <Link className="block text-center p-2" to="following">
              Following
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />

      <Routes>
        <Route index element={<Followers user={user} />} />
        <Route path="/followers" element={<Followers user={user} />} />
        <Route path="/following" element={<Following user={user} />} />
      </Routes>
    </div>
  );
};

export default ProfileUsers;
