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
  userCreatedAt: Date;
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
  userCreatedAt: Date;
  userImage: string;
}
export interface Profile {
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
  userCreatedAt: Date;
  userImage: string;
}
