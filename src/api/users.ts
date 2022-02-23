import { Client, Params, headers } from ".";

export interface User {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  username: string;
  bio: string;
  email: string;
  profile_image_url: string;
  cover_image_url: string;
  authentication_token?: string;
  followers_count: number;
  followed_users_count: number;
  created_at: string;
  followed_by_user: boolean;
  following_user: boolean;
}

export interface UsersResponse {
  list: User[];
  current_page: number;
  total_size: number;
  next_page?: number;
  total_pages: number;
  size: number;
}

export const updateUserProfile = async (currentUser: User, formData: FormData) => {
  const { data } = await Client.patch(`/users/${currentUser.id}`, formData, {
    headers: { ...headers(currentUser), "Content-Type": "multipart/form-data" },
  });

  if (data.error) throw data;

  return data as User;
};

export const getUser = async (
  currentUser: User | null,
  idOrUsername: string,
  params: Params = {}
) => {
  const { data } = await Client.get(`/users/${idOrUsername}`, {
    params,
    headers: headers(currentUser),
  });
  if (data.error) throw data;

  return data as User;
};

export const getUsers = async (
  currentUser: User | null,
  params: Params = {}
) => {
  const { data } = await Client.get("/users", {
    params,
    headers: headers(currentUser),
  });
  if (data.error) throw data;

  return data as UsersResponse;
};

export const getFollowers = async (
  currentUser: User | null,
  user: User,
  params: Params = {}
) => {
  const { data } = await Client.get(`/users/${user.id}/followers`, {
    params,
    headers: headers(currentUser),
  });
  if (data.error) throw data;

  return data as UsersResponse;
};

export const getFollowing = async (
  currentUser: User | null,
  user: User,
  params: Params = {}
) => {
  const { data } = await Client.get(`/users/${user.id}/followed_users`, {
    params,
    headers: headers(currentUser),
  });
  if (data.error) throw data;

  return data as UsersResponse;
};

export const followUser = async (currentUser: User, user: User) => {
  const { data } = await Client.post(
    `/users/${user.id}/follow`,
    {},
    {
      headers: headers(currentUser),
    }
  );
  if (data.error) throw data;

  return data as User;
};

export const unFollowUser = async (currentUser: User, user: User) => {
  const { data } = await Client.delete(`/users/${user.id}/follow`, {
    headers: headers(currentUser),
  });
  if (data.error) throw data;

  return data as User;
};
