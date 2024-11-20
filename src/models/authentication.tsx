export interface LoginInput {
  email: string;
  password: string;
}
export interface RegisterInput {
  email: string;
  password: string;
  username: string;
  fullname: string;
  dob: Date;
  address: string;
  phoneNumber: string;
}
export interface CreateEmployeeAccount {
  username: string;
  password: string;
  email: string;
  fullname: string;
  dob: Date;
  address: string;
  phoneNumber: string;
  role: string;
  status: boolean;
  userImage: string;
}

export interface AccountCreated {
  userId: number;
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
  userOffenseCount: number;
}
