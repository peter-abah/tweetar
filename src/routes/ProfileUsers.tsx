import { Link, Routes, Outlet, Route, useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { useAuth } from "../contexts/authContext";
import { getUser } from "../api/users";

import Followers from "../components/Followers";
import Following from "../components/Following";
import ErrorPage from "../components/Error";
import Loader from "../components/Loader";
import Header from "../components/Header";

const ProfileUsers = () => {
  const { currentUser } = useAuth();
  const { username } = useParams() as { username: string };
  const userQueryKey = ["users", "profile", username, currentUser];
  const { data, isLoading, isError } = useQuery(userQueryKey, () =>
    getUser(currentUser, username)
  );

  if (isLoading || !data) return <Loader />;
  if (isError) return <ErrorPage />;

  return (
    <>
      <Header title={data.name} backLink />
      <div>
        <nav className="border-b border-neutral">
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
          <Route index element={<Followers user={data} />} />
          <Route path="/followers" element={<Followers user={data} />} />
          <Route path="/following" element={<Following user={data} />} />
        </Routes>
      </div>
    </>
  );
};

export default ProfileUsers;
