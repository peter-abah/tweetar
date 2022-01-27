import faker from "@faker-js/faker";

export interface User {
  name: string;
  email: string;
  phone: string;
  username: string;
  image: string;
}

export interface Tweet {
  body: string;
  id: number;
  user: User;
  created_at: number;
  commentsNo: number;
  likesNo: number;
  retweetsNo: number;
}

const randomNumber = (n = 100) => Math.floor(Math.random() * n);

const generateUsers = (n = 25) => {
  const result = [];
  for (let i = 0; i < n; i++) {
    const user: User = {
      ...faker.helpers.userCard(),
      image: faker.image.avatar(),
    };
    result.push(user);
  }

  return result;
};

const generateTweets = (users: User[], n = 25) => {
  const result = [];
  for (let i = 0; i < n; i++) {
    const tweet: Tweet = {
      body: faker.lorem.paragraph(),
      id: i,
      user: users[i],
      created_at: new Date().getUTCMilliseconds(),
      commentsNo: randomNumber(),
      likesNo: randomNumber(),
      retweetsNo: randomNumber(),
    };
    result.push(tweet);
  }

  return result;
};

const users = generateUsers(50);
const tweets = generateTweets(users, 50);

export const getTweets = () => {
  return tweets;
};

export const getUsers = () => {
  return users;
};
