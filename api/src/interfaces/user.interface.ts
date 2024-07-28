interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  avatar: string | null;
  createdAt: Date;
}

export default User;
