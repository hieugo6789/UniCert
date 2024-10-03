export interface UserDetail {
  userId: string;
  username: string;
  password: string;
  email: string;
  fullname: string;
  dob: string | null;
  address: string;
  phoneNumber: number;
  role: string;
  status: boolean;
  userCreatedAt: string;
  userImage: string;
}
