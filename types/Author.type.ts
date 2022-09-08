import { createdAt } from ".";

interface Author {
  name: string;
  photo: {
    url: string;
  };
  createdAt: createdAt;
}

export default Author;
