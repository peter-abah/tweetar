import {
  QueryKey,
  useMutation,
  useQueryClient,
  InfiniteData,
} from "react-query";
import { useAuth } from "../contexts/authContext";
import { followUser, unFollowUser, User, UsersResponse } from "../api/users";
import { getUpdatedData } from "../helpers";

const useFollowUser = (queryKey: QueryKey) => {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  const { mutate: follow } = useMutation(
    (user: User) => {
      if (!currentUser) throw new Error("No authenticated");

      return followUser(currentUser, user);
    },
    {
      onMutate: async (user: User) => {
        await queryClient.cancelQueries(queryKey);

        const prevData = queryClient.getQueryData<
          InfiniteData<UsersResponse> | User
        >(queryKey);
        const updatedUser = { ...user, followed_by_user: true };

        if (!prevData) return { prevData };

        if ("pages" in prevData) {
          // check if it is an instance of InfiniteData
          queryClient.setQueryData<InfiniteData<UsersResponse>>(
            queryKey,
            getUpdatedData(prevData, updatedUser)
          );
        }

        if ("username" in prevData) {
          //checks if it is an instance of User
          queryClient.setQueryData<User>(queryKey, updatedUser);
        }

        return { prevData };
      },

      onError: (err, _data, context) => {
        if (context?.prevData) {
          queryClient.setQueryData(queryKey, context.prevData);
        }
        throw err;
      },

      onSettled: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );

  const { mutate: unfollow } = useMutation(
    (user: User) => {
      if (!currentUser) throw new Error("No authenticated");

      return unFollowUser(currentUser, user);
    },
    {
      onMutate: async (user: User) => {
        await queryClient.cancelQueries(queryKey);
        const prevData = queryClient.getQueryData<
          InfiniteData<UsersResponse> | User
        >(queryKey);
        const updatedUser = { ...user, followed_by_user: false };
        if (!prevData) return { prevData };

        if ("pages" in prevData) {
          // check if it is an instance of InfiniteData
          queryClient.setQueryData<InfiniteData<UsersResponse>>(
            queryKey,
            getUpdatedData(prevData, updatedUser)
          );
        }

        if ("username" in prevData) {
          //checks if it is an instance of User
          queryClient.setQueryData<User>(queryKey, updatedUser);
        }

        return { prevData };
      },

      onError: (err, _data, context) => {
        if (context?.prevData) {
          queryClient.setQueryData(queryKey, context.prevData);
        }
        throw err;
      },

      onSettled: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );

  return { follow, unfollow };
};

export default useFollowUser;
