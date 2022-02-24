import { Link, useLocation } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import { getRecommendedFollows } from "../api/users";
import Users from "../components/Users";
import { useAuth } from "../contexts/authContext";

const PeopleToFollow = () => {
  const { currentUser } = useAuth();
  const { pathname } = useLocation();
  const queryKey = ["users", "recommended_follows", currentUser];

  const userValues = useInfiniteQuery(
    queryKey,
    () =>
      getRecommendedFollows(currentUser, {
        no: 5,
      }),
    {
      getNextPageParam: () => null,
      enabled: !!currentUser,
    }
  );

  const isConnectRoute = () => /^\/connect/.test(pathname);

  if (isConnectRoute()) return <></>;

  return (
    <div className="hidden lg:block sticky scrollbar-hide h-screen overflow-scroll top-0 right-0 bottom-0">
      <h2 className="p-4 text-lg font-bold">People To Follow</h2>
      <Users usersValues={userValues} queryKey={queryKey} />
      <Link className="px-6 py-4 underline hover:no-underline" to="/connect">
        View More
      </Link>
    </div>
  );
};

export default PeopleToFollow;
