import faker from "@faker-js/faker";

export interface Tweet {
  body: string;
  id: number;
  user_id: number;
  created_at: number;
};

const data = [];

const generateUsers = (n = 25) => {
  const result = [];
  for (let i = 0; i < n; i++) {
    const user = {
      ...faker.helpers.userCard(),
      id: i,
    };
    result.push(user);
  }

  return result;
};

const generateTweets = (n = 25) => {
  const result = [];
  for (let i = 0; i < n; i++) {
    const tweet: Tweet = {
      body: faker.lorem.paragraph(),
      id: i,
      user_id: Math.floor(Math.random() * n),
      created_at: new Date().getUTCMilliseconds(),
    };
    result.push(tweet);
  }

  return result;
};

const users = generateUsers(50);
const tweets = generateTweets(50);

export const getTweets = () => {
  return tweets;
}

export const getUsers = () => {
  return users;
}
