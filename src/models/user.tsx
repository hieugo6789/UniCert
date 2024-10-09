export interface UserDetail {
  userId: string;
  username: string;
  password: string;
  email: string;
  fullname: string;
  dob: Date;
  address: string;
  phoneNumber: number;
  role: string;
  status: boolean;
  userCreatedAt: string;
  userImage: string;
}
export interface UserAccountDetail {
  data: {
    userId: string;
    username: string;
    password: string;
    email: string;
    fullname: string;
    dob: Date;
    address: string;
    phoneNumber: number;
    role: string;
    status: boolean;
    userCreatedAt: string;
    userImage: string;
  };
}
