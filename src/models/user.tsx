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

export interface UpdateRole {
  username: string;
  password: string;
  email: string;
  fullname: string;
  dob: Date;
  address: string;
  phoneNumber: number;
  role: string | null;
  status: boolean;
  userCreatedAt: string;
  userImage: string;
}
