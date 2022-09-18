import { createdAt } from ".";

interface Author {
  name: string;
  photo: {
    url: string;
  };
  createdAt: createdAt;
  bio: string;
}

export default Author;
